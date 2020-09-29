#Seeders to create some surveys(without questions)

from flask_seeder import Seeder, Faker, generator
from TSDYourCustomSurvey.models import Survey

# All seeders inherit from Seeder
class BSurveySeeder(Seeder):

  # run() will be called by Flask-Seeder
  def run(self):
    # Create a new Faker and tell it how to create Survey objects
    fakerNapoleon = Faker(
      cls=Survey,
      init={
        "idU": 1,
        "title": "Napoleon",
        "category": "History",
        "nbOfQuestions": 2,
      }
    )
    
    fakerMovies = Faker(
      cls=Survey,
      init={
        "idU": 1,
        "title": "Movies",
        "category": "Cultural(movies, books ...)",
        "nbOfQuestions": 3,
      }
    )

    # Create 2 survey
    for survey in fakerNapoleon.create(1):
      print("Adding survey: %s" % survey)
      self.db.session.add(survey)

    for survey in fakerMovies.create(1):
      print("Adding survey: %s" % survey)
      self.db.session.add(survey)
