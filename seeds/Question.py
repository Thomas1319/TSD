#Seeders to create some questions

from flask_seeder import Seeder, Faker, generator
from TSDYourCustomSurvey.models import Question

# All seeders inherit from Seeder
class QuestionSeeder(Seeder):

#2 Questions about napoleon
  # run() will be called by Flask-Seeder
  def run(self):
    # Create a new Faker and tell it how to create Question objects
    fakerNapoleon1 = Faker(
      cls=Question,
      init={
        "idS": 1,
        "statement": "Do you know Napoleon ?",
        "number": 1,
        "answer1": "yes",
        "answer2": "no",
        "answer3":'',
        "answer4":'',
        "answer5":'',
		"answerType":'single',
      }
    )
    
    fakerNapoleon2 = Faker(
      cls=Question,
      init={
        "idS": 1,
        "statement": "His nationality is :",
        "number": 2,
        "answer1": "French",
        "answer2": "Russian",
        "answer3": "Spanish",
        "answer4": "Polish",
        "answer5": "Chinese",
		"answerType":'single',
      }
    )
#3 Questions about movie   
    fakerMovies1 = Faker(
      cls=Question,
      init={
        "idS": 2,
        "statement": "Do you prefer :",
        "number": 1,
        "answer1": "Gladiator",
        "answer2": "Terminator 1",
        "answer3": "Charlie and the chocolate factory",
        "answer4":'',
        "answer5":'',
		"answerType":'single',
      }
    )
    fakerMovies2 = Faker(
      cls=Question,
      init={
        "idS": 2,
        "statement": "Do you prefer :",
        "number": 2,
        "answer1": "Charlie Chaplin",
        "answer2": "Leonardo Di Caprio",
        "answer3": "Johnny Depp",
        "answer4":'',
        "answer5":'',
		"answerType":'single',
      }
    )
    fakerMovies3 = Faker(
      cls=Question,
      init={
        "idS": 2,
        "statement": "Do you prefer :",
        "number": 3,
        "answer1": "Albert Hitchcock",
        "answer2": "James Cameron",
        "answer3": "Luc Besson",
        "answer4":'',
        "answer5":'',
		"answerType":'single',
      }
    )

    # Create Question
    for question in fakerNapoleon1.create(1):
      print("Adding question: %s" % question)
      self.db.session.add(question)

    for question in fakerNapoleon2.create(1):
      print("Adding question: %s" % question)
      self.db.session.add(question)
      
    for question in fakerMovies1.create(1):
      print("Adding question: %s" % question)
      self.db.session.add(question)
    
    for question in fakerMovies2.create(1):
      print("Adding question: %s" % question)
      self.db.session.add(question)
      
    for question in fakerMovies3.create(1):
      print("Adding question: %s" % question)
      self.db.session.add(question)