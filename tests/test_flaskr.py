import pytest

from app import app
from app import db
from flask import json
import pytest_flask
from models import User, Survey, Question


def checkIfJson(data):
    if(json.loads(data)):
        return True
    return False


def test_client():
    testing = app.test_client()
    ctx = app.app_context()
    ctx.push()
    assert testing
    ctx.pop()


def test_database():
    ctx = app.app_context()
    ctx.push()
    db.init_app(app)
    newUser = User(userName='testUsr',
                       firstName='test',
                       lastName='test',
                       birthdate='13-02-1999',
                       gender='m',
                       phone='test',
                       email='test',
                       right=1)

    newUser.set_password('test')
    db.session.add(newUser)
    db.session.commit()
    usr = User.query.filter_by(userName = newUser.userName).first()
    assert  usr.idU is not None

    usr.userName = 'newTestUsr'
    db.session.commit()
    assert  User.query.filter_by(userName = 'newTestUsr').first() is not None

    db.session.delete(usr)
    db.session.commit()
    assert  User.query.filter_by(idU = usr.idU).first() is None

    ctx.pop()


def test_index():
    response = app.test_client().get('/')
    assert response.status_code == 200, "status code failed"
    assert response.data is not None, "data is null"
    assert response.json['surveys'] is not None, "json is null"


def test_add_user():
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    data = {
        'userName' : 'testUsr',
        'firstName':'test',
        'lastName':'test',
        'birthdate':'13-02-1999',
        'gender':'m',
        'phone':'test',
        'email':'test',
        'password':'testtest',
        'right':1
    }
    url = '/add_user'
    response = app.test_client().post(url, data=json.dumps(data), headers=headers)
    assert response.content_type == mimetype
    assert response.json['username'] == 'testUsr'
    assert response.json['commitCheck'] == 'Success'


def test_login():
    ctx = app.app_context()
    ctx.push()
    username = 'test'
    password = 'test'
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    data = {
        'userName': username,
        'password': password
    }
    url = '/login'
    response = app.test_client().post(url, data=json.dumps(data), headers=headers)

    assert response.status_code == 200
    assert response.json["user"] is not None
    assert response.json["user"][0]["firstName"] == 'test'
    assert response.json["token"] is not None
    assert response.json["NoFound"] is None

    ctx.pop()



def test_get_user():
    response = app.test_client().get('/get_user')
    assert response.status_code == 200
    assert response.json['users'] is not None


def test_add_survey():
    ctx = app.app_context()
    ctx.push()
    db.init_app(app)
    user = User.query.filter_by(userName = "test").first()
    userId = user.idU
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    data = {
        'title': 'testSurvey',
        'category': 'test',
        'nbOfQuestions': '5',
        'idU': userId
    }
    url = '/add_survey'
    response = app.test_client().post(url, data=json.dumps(data), headers=headers)

    assert response.status_code == 200
    assert response.json["checkCommit"] == "Success"
    assert response.json["message"] is not None
    assert response.json["idS"] is not None

    ctx.pop()


def test_add_question():
    ctx = app.app_context()
    ctx.push()
    db.init_app(app)
    survey = Survey.query.filter_by(title="testSurvey").first()
    surveyId = survey.idS
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    data = {
        'statement': 'test',
        'number': '1',
        'answer1': 'testa1',
        'answer2': 'testa2',
        'answerType': 'single',
        'idS': surveyId
    }
    url = '/add_question'
    response = app.test_client().post(url, data=json.dumps(data), headers=headers)

    assert response.status_code == 200
    assert response.json["checkCommit"] == "Success"

    ctx.pop()


def test_get_question():
    ctx = app.app_context()
    ctx.push()
    db.init_app(app)
    survey = Survey.query.filter_by(title="testSurvey").first()
    surveyId = survey.idS
    question = Question.query.filter_by(statement = "test").first()
    questionId = question.idQ
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    data = {
        'idS': surveyId,
        'idQ': questionId
    }
    url = '/get_question'
    response = app.test_client().post(url, data=json.dumps(data), headers=headers)

    assert response.status_code == 200
    assert response.json["questions"] is not None

    ctx.pop()


def test_add_vote():
    ctx = app.app_context()
    ctx.push()
    db.init_app(app)
    user = User.query.filter_by(userName="testUsr").first()
    userId = user.idU
    question = Question.query.filter_by(statement="test").first()
    questionId = question.idQ
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    data = {
        'idU': userId,
        'idQ': questionId,
        'answer': 'test answer'
    }
    url = '/add_vote'
    response = app.test_client().post(url, data=json.dumps(data), headers=headers)

    assert response.status_code == 200
    assert response.json["checkCommit"] == "Success"

    ctx.pop()



def test_get_votes():
    ctx = app.app_context()
    ctx.push()
    db.init_app(app)
    survey = Survey.query.filter_by(title="testSurvey").first()
    surveyId = survey.idS
    mimetype = 'application/json'
    headers = {
        'Content-Type': mimetype,
        'Accept': mimetype
    }
    data = {
        'idS': surveyId
    }
    url = '/vote'
    response = app.test_client().post(url, data=json.dumps(data), headers=headers)

    assert response.status_code == 200
    assert response.json["votes"] is not None

    ctx.pop()