from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
db = SQLAlchemy()

# all primary keys are autoincremented on creation, there is no integrity check yet except for the Foreign keys


class User(db.Model): #the User table
    idU = db.Column(db.Integer, primary_key=True, autoincrement=True)
    userName = db.Column(db.String, nullable=False, unique=True)
    lastName = db.Column(db.String, nullable=False)
    firstName = db.Column(db.String, nullable=False)
    birthdate = db.Column(db.String, nullable=False)
    gender = db.Column(db.String, nullable=False)
    phone = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String, nullable=False)
    right = db.Column(db.Integer, nullable=False)
    surveys = db.relationship("Survey", cascade="all, delete-orphan") # foreign key to child survey
    votes = db.relationship("Vote", cascade="all, delete-orphan") #foreign key to child vote

    @property
    def serialize(self): # property that transforms the user object into a json string
        return{
            'idU'    : self.idU,
            'userName' : self.userName,
            'lastName': self.lastName,
            'firstName': self.firstName,
            'birthdate': self.birthdate,
            'gender': self.gender,
            'phone': self.phone,
            'email': self.email,
            'password': self.password,
            'right': self.right,
          #  'surveys': self.serialize_one2many_surveys,
          #  'votes': self.serialize_one2many_votes
        }

    @property
    def serialize_one2many_surveys(self): # property to create an array of json elements, basically the foreign keys of the main on
        return [item.serialize for item in self.surveys]

    @property
    def serialize_one2many_votes(self):
        return [item.serialize for item in self.votes]

    def __repr__(self):
        return  '<User %r %r>' % self.lastName % self.firstName
    
    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)
        
# For seeds
    def __init__(self, userName = None, lastName=None, firstName=None, birthdate=None, gender=None, phone=None, email=None, password=None, right=None):
        self.userName = userName
        self.lastName = lastName
        self.firstName = firstName
        self.birthdate = birthdate
        self.gender = gender
        self.phone = phone
        self.email = email
        self.password =password
        #self.password = generate_password_hash(password)
        self.right = right
        
    def __str__(self):
        return "userName=%s, lastName=%s, firstName=%s, birthdate=%s, gender=%s, phone=%s, email=%s, password=%s, right=%d" % (self.userName, self.lastName, self.firstName, self.birthdate, self.gender, self.phone, self.email, self.password, self.right)



class Survey(db.Model):
    idS = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    nbOfQuestions = db.Column(db.Integer, nullable=False)
    idU = db.Column(db.Integer, db.ForeignKey('user.idU'), nullable=False) # foreign key to parent user
    questions = db.relationship("Question", cascade="all, delete-orphan") # foreign key to child question

    @property
    def serialize(self):
        return {
            'idS': self.idS,
            'title': self.title,
            'category': self.category,
            'nbOfQuestions': self.nbOfQuestions,
            'idU': self.idU,
          #  'questions': self.serialize_one2many_questions
        }

    @property
    def serialize_one2many_questions(self): # same as for User
        return [item.serialize for item in self.questions]

    def __repr__(self):
        return '<Survey %r %r>' % self.idS % self.title
    
# For seeds
    def __init__(self, idU=None, title=None, category=None, nbOfQuestions=None):
        self.title = title
        self.category = category
        self.nbOfQuestions = nbOfQuestions
        self.idU = idU
        
    def __str__(self):
        return "IDU=%d, Title=%s, Category=%s, nbOfQuestions=%d" % (self.idU, self.title, self.category, self.nbOfQuestions)


class Question(db.Model):
    idQ = db.Column(db.Integer, primary_key=True, autoincrement=True)
    statement = db.Column(db.String, nullable=False)
    number = db.Column(db.Integer, nullable=False)
    answer1 = db.Column(db.String, nullable=True)
    answer2 = db.Column(db.String, nullable=True)
    answer3 = db.Column(db.String, nullable=True)
    answer4 = db.Column(db.String, nullable=True)
    answer5 = db.Column(db.String, nullable=True)
    answerType = db.Column(db.String, nullable=False)
    idS = db.Column(db.Integer, db.ForeignKey('survey.idS'), nullable=False) # foreign key to parent survey
    votes = db.relationship("Vote", cascade="all, delete-orphan") # foreign key to child vote

    @property
    def serialize(self):
        return{
            'idQ': self.idQ,
            'statement': self.statement,
            'number': self.number,
            'answer1': self.answer1,
            'answer2': self.answer2,
            'answer3': self.answer3,
            'answer4': self.answer4,
            'answer5': self.answer5,
            'answerType': self.answerType,
            'idS': self.idS,
           # 'votes': self.serialize_one2many_votes
        }

    @property
    def serialize_one2many_votes(self): #same as User
        return [item.serialize for item in self.votes]

    def __repr__(self):
        return '<Question %r %r>' % self.statement  % self.number
    
    # For seeds
    def __init__(self, statement=None, number=None, answer1=None, answer2=None, answer3=None, answer4=None, answer5=None, answerType=None, idS=None):
        self.idS = idS
        self.statement = statement
        self.number = number
        self.answer1 = answer1
        self.answer2 = answer2
        self.answer3 = answer3
        self.answer4 = answer4
        self.answer5 = answer5
        self.answerType = answerType
        
    def __str__(self):
        return "IDS=%d, Statement=%s, number=%d, answer1=%s, answer2=%s, answer3=%s, answer4=%s, answer5=%s, answerType=%s" % (self.idS, self.statement, self.number, self.answer1, self.answer2, self.answer3, self.answer4, self.answer5, self.answerType)



class Vote(db.Model):
    idV = db.Column(db.Integer, primary_key=True, autoincrement=True)
    answer = db.Column(db.String, nullable=False)
    idU = db.Column(db.Integer, db.ForeignKey('user.idU'), nullable=False)
    idQ = db.Column(db.Integer, db.ForeignKey('question.idQ'), nullable=False)

    @property
    def serialize(self):
        return{
            'idV': self.idV,
            'answer': self.answer,
            'idQ': self.idQ,
            'idU': self.idQ
        }
        
# For seeds
    def __init__(self, answer=None, idQ=None, idU=None):
        self.answer = answer
        self.idQ = idQ
        self.idU = idU
        
    def __str__(self):
        return "IDU=%d, IDQ=%d, Answer=%s" % (self.idU, self.idQ, self.answer)