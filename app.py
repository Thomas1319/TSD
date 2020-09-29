import os

from flask_cors import CORS

import sys
from datetime import datetime
from flask import Flask, jsonify
from flask import current_app
from flask import json
from flask import render_template
from flask import request
from flask import redirect
from flask import session
from flask import send_file
from .models import User
from .models import Question
from .models import Survey
from .models import Vote
from .models import db
from datetime import datetime, timedelta
import flask_excel as excel
from werkzeug.security import generate_password_hash, check_password_hash

import jwt

from flask_seeder import FlaskSeeder

from sqlalchemy import event
from sqlalchemy import func
from sqlalchemy.engine import Engine
from sqlite3 import Connection as SQLite3Connection

# TO OVERWRITE DEFAULT SQLITE BEHAVIOUR WHEN INSERTING FOREIGN KEY
# BASICALLY IF THE FOREIGN KEY INSERTED IS WRONG IT WILL GIVE YOU AN ERROR
# BY DEFAULt IT DOESN'T SAY ANYTHING(SURPRINSINGLY)


@event.listens_for(Engine, "connect")
def _set_sqlite_pragma(dbapi_connection, connection_record):
    if isinstance(dbapi_connection, SQLite3Connection):
        cursor = dbapi_connection.cursor()
        cursor.execute("PRAGMA foreign_keys=ON;")
        cursor.close()

# --------------------------------------------------------------------------
# this part sets up the project path and initializez the app and the db in the context of the app
# the db is stored locally, it's the YCS.db file


project_dir = os.path.dirname(os.path.abspath(__file__))
database_file = "sqlite:///{}".format(os.path.join(project_dir, "YCS.db"))
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config.from_object(__name__)
excel.init_excel(app)

app.config['SQLALCHEMY_DATABASE_URI'] = database_file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = b'_5#y2L"F4Q8z\n\xec]/'#You can change the secret key if you  want ><

db.init_app(app)
seeder = FlaskSeeder()
seeder.init_app(app, db)
# ---------------------------------------------------------------------------

# CRUD functions for the User table, they contain no integrity check(data format and stuff)
# the only think to be careful for is the DATE format when you input it, it should be dd-mm-yyyy(eg 13-02-1999) otherwise it crashes
# i will either add it later to the backed or we can check it on the frontend before sending the data

#here we define the headers for cors(cross origin ressources sharing (to change data between vuejs and flask)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response
  
@app.route('/add_user', methods=["GET", "POST"]) # routing is a pretty common concept, a form sends data by post to the function, the function does stuff
def add_user(): # and then redirects to another route
    response_object = {'status': 'success'}#first we define a object
    if request.method == 'POST':#if post request
        post_data = request.get_json()#we retrieve the data which are in json format
        #date = datetime.strptime(request.form.get("birthdate"), '%d-%m-%Y') # formating the string into a date, that's why the string need that specific format
        newUser = User(
                       userName=post_data.get('userName'),
                       firstName=post_data.get('firstName'),
                       lastName=post_data.get('lastName'),
                       birthdate=post_data.get('birthdate'),
                       gender=post_data.get('gender'),
                       phone=post_data.get('phone'),
                       email=post_data.get('email'),
                       right=1)
        response_object['username'] = newUser.userName
        newUser.set_password(post_data.get('password'))#here we ash the password
        db.session.add(newUser)
        try:
            db.session.commit()
            response_object['commitCheck'] = 'Success'
        except:
            print('Error')
    return jsonify(response_object)#here we send the object with status success in json format


@app.route("/delete_user", methods=["POST"]) # deletes the user by idU, keep in mind that all tables have Cascade Delete, basically all children(lower FKs) are deleted
def delete_user(): # meaning that, for example,  if you delete a survey that has 2 questions and each question has 3 votes each, everything will be deleted
    post_data = request.get_json()
    idU = post_data.get("idU") # i found it logical like that but if we need to modify anything it's just a line of code so no worries
    user = User.query.filter_by(idU=idU).first()
    db.session.delete(user)
    db.session.commit()
    return redirect("/")


@app.route("/update_user", methods=["POST"]) # User is the only one that ahs Update so far(because of laziness reasons to be honest)
def update_user(): # basically it updates the fields with the new values inputed there while the old values are there as placeholders
    response_object = {'status': 'success'}
    post_data = request.get_json()
    id = post_data.get('idU') # still be there unchanged(there is lots of room for improvement but i needed to see that i works)
    user = User.query.filter_by(idU = id).first() # also still no data integrity and format check so be careful when trying it out
    user.firstName = post_data.get('firstName')
    user.lastName = post_data.get('lastName')
    user.birthdate = post_data.get('birthdate')
    user.gender = post_data.get('gender')
    user.phone = post_data.get('phone')
    user.email = post_data.get('email')
    db.session.commit()
    return jsonify(response_object)

@app.route('/get_user', methods=["GET"])
def get_user(): # basically it queries the whole User table, creates an array of serilize user objects(see serialize property in "models.User")
    response_object = {'status': 'success'} 
    users = User.query.all() # and then creates a json array out of it with json.dumps
    asJson = []
    for usr in users:
        asJson.append(usr.serialize)
        json.dumps(asJson)
    response_object['users'] = asJson
    return jsonify(response_object)


# Survey CRD methods, they work the same way as the other ones with the exception of the data that flows through them

@app.route('/add_survey', methods=["GET", "POST"])
def add_survey():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        newSurvey = Survey(
                       title=post_data.get('title'),
                       category=post_data.get('category'),
                       nbOfQuestions=int(post_data.get('nbOfQuestions')),
                       idU=int(post_data.get('idU')))
        db.session.add(newSurvey)
        try:
            db.session.commit()
            response_object["checkCommit"] = "Success"
        except:
            response_object["checkCommit"] = "Fail"
        Surv = db.session.query(func.max(Survey.idS).label("idS")).first()
        idS2 = Surv.idS
    response_object['message'] = 'Survey added!'
    response_object['idS'] = idS2
    return jsonify(response_object)


@app.route("/delete_survey", methods=["POST"])
def delete_survey():
    post_data = request.get_json()
    idS = post_data.get("idS")
    survey = Survey.query.filter_by(idS=idS).first()
    db.session.delete(survey)
    db.session.commit()
    return redirect("/")


# Question CRD methods, they work the same way as the other ones with the exception of the data that flows through them

@app.route('/add_question', methods=["GET", "POST"])
def add_question():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        newQuestion = Question(
                       statement=post_data.get('statement'),
                       number=post_data.get('number'),
                       answer1=post_data.get('answer1'),
                       answer2=post_data.get('answer2'),
                       answer3=post_data.get('answer3'),
                       answer4=post_data.get('answer4'),
                       answer5=post_data.get('answer5'),
                       answerType=post_data.get('answerType'),
                       idS=post_data.get('idS'))
        db.session.add(newQuestion)
        status = post_data.get('status')
        if status is not None:
            idS=post_data.get('idS')
            survey = Survey.query.filter_by(idS=idS).first()
            nbOfQuestions = survey.nbOfQuestions + 1
            survey.nbOfQuestions = nbOfQuestions
        try:
            db.session.commit()
            response_object["checkCommit"] = "Success"
        except:
            response_object["checkCommit"] = "Fail"
    return jsonify(response_object)
    
@app.route("/update_question", methods=["POST"]) 
def update_question(): 
    response_object = {'status': 'success'}
    post_data = request.get_json()
    id = post_data.get('idQ')
    question = Question.query.filter_by(idQ = id).first() 
    question.statement = post_data.get('statement')
    question.answer1 = post_data.get('answer1')
    question.answer2 = post_data.get('answer2')
    question.answer3 = post_data.get('answer3')
    question.answer4 = post_data.get('answer4')
    question.answer5 = post_data.get('answer5')
    db.session.commit()
    return jsonify(response_object)


@app.route("/delete_question", methods=["POST"])
def delete_question():
    response_object = {'status': 'success'}
    post_data = request.get_json()
    idQ = post_data.get("idQ")
    question = Question.query.filter_by(idQ=idQ).first()
    idS = question.idS
    survey = Survey.query.filter_by(idS=idS).first()
    nbOfQuestions = survey.nbOfQuestions - 1
    survey.nbOfQuestions = nbOfQuestions
    questions = Question.query.filter_by(idS=survey.idS)
    for qus in questions:
        if qus.number > question.number:
            qus.number = qus.number - 1
    db.session.delete(question)
    db.session.commit()
    return jsonify(response_object)

@app.route("/get_question", methods=["GET", "POST"])
def getQuestionsAsJson():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        asJson = []
        id = post_data.get("idS")
        if id is not None:
            questions = Question.query.filter_by(idS = id).order_by(Question.number.asc())
            for qus in questions:
                asJson.append(qus.serialize)
        else:
            id = post_data.get("idQ")
            questions = Question.query.filter_by(idQ = id).first()
            asJson. append(questions.serialize)
        json.dumps(asJson)
        response_object['questions'] = asJson
    else:
        questions = Question.query.all()
        asJson = []
        for qus in questions:
            asJson.append(qus.serialize)
        json.dumps(asJson)
        response_object['questions'] = asJson
    return jsonify(response_object)#to send the json data - without this function, we cannot send json

# Vote CRD methods, they work the same way as the other ones with the exception of the data that flows through them


@app.route('/add_vote', methods=["GET", "POST"])
def add_vote():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        newVote = Vote(
                       answer=post_data.get('answer'),
                       idU=post_data.get('idU'),
                       idQ=post_data.get('idQ'))
        db.session.add(newVote)
        try:
            db.session.commit()
            response_object["checkCommit"] = "Success"
        except:
            response_object["checkCommit"] = "Fail"
    return jsonify(response_object)

@app.route("/delete_vote", methods=["POST"])
def delete_vote():
    idV = request.form.get("idV")
    vote = Vote.query.filter_by(idV=idV).first()
    db.session.delete(vote)
    db.session.commit()
    return redirect("/")

@app.route("/vote", methods=["GET","POST"])
def getVotesAsJson():
    response_object = {'status': 'success'}
    if request.method == 'POST':
        post_data = request.get_json()
        print(post_data)
        id = post_data.get("idS")
        questions = Question.query.filter_by(idS = id)
        asJson = []
        for qus in questions:
            votes = Vote.query.filter_by(idQ = qus.idQ)
            for v in votes:
                asJson.append(v.serialize)
        json.dumps(asJson)
        response_object['votes'] = asJson
    return jsonify(response_object)
    

#login  
@app.route("/login", methods=["GET", "POST"])
def login():
    response_object = {'status': 'success'}
    response_object["NoFound"] = None
    if request.method == 'POST':
        post_data = request.get_json()
        username = post_data.get("userName")
        userN = db.session.query(User.userName).filter_by(userName = username).first()
        asJson = []
        if userN is not None :
            user = User.query.filter_by(userName = username).first()
            if user.check_password(post_data.get("password")):
                session['username'] = userN
                token = jwt.encode({
                    'sub': userN,
                    'iat':datetime.utcnow(),
                    'exp': datetime.utcnow() + timedelta(minutes=30)},
                    current_app.config['SECRET_KEY'])
                asJson.append(user.serialize)
                json.dumps(asJson)
                response_object['user'] = asJson
                response_object['token'] = token.decode('UTF-8')
            else :
                response_object['NoFound'] = "The password is wrong"
        else :
            response_object['NoFound'] = "The username is wrong"
    return jsonify(response_object)


# the main route aka index of the app, here it will manage the data about survey tables 

@app.route('/', methods=["GET", "POST"])
def getSurveysAsJson():
    response_object = {'status': 'success'}
    asJson = []
    if request.method == 'POST':
        post_data = request.get_json()
        id = post_data.get("idU")
        if id is not None:
            surveys = Survey.query.filter_by(idU = id)
        else:
            id = post_data.get("idS")
            surveys = Survey.query.filter_by(idS = id)
    else :
        surveys = Survey.query.all()
    for sur in surveys:
        asJson.append(sur.serialize)
    json.dumps(asJson)
    response_object['surveys'] = asJson
    return jsonify(response_object)#to send the json data - without this function, we cannot send json

@app.route('/download_survey', methods=["POST"])
def download_survey():
    post_data = request.get_json()
    idS = post_data.get("idS")
   # print(idS)
    survey = Survey.query.filter_by(idS = idS).first()
    questions = Question.query.filter_by(idS = idS).all()
    myDict = []
    for q in questions:
        qVotes = Vote.query.filter_by(idQ = q.idQ).all()
        for v in qVotes:
            myV = {}
            myV['surveyName'] = survey.title
            myV['category'] = survey.category
            myV['statement'] = q.statement
            myV['answer'] = v.answer
            myDict.append(myV)
            print(myV)

  #  print(myDict)
    output = excel.make_response_from_records(myDict, "xls")
    output.headers["Content-type"] = "application/vnd.ms-excel"
    return output


if __name__ == '__main__':
    excel.init_excel(app)
    app.run(debug=True)
