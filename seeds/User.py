#Seeders to create some Users(without questions)

from flask_seeder import Seeder, Faker, generator
from TSDYourCustomSurvey.models import User

# All seeders inherit from Seeder
class AUserSeeder(Seeder):

  # run() will be called by Flask-Seeder
  def run(self):
    # Create a new Faker and tell it how to create Survey objects
    fakerUser = Faker(
      cls=User,
      init={
        "userName": "Antoine12",
        "lastName": "Landrieu",
        "firstName": "Antoine",
        "birthdate": "17-03-1998",
        "gender": "Male",
        "phone": "+33632145678",
        "email": "anto@pp.com",
        "password": "12345",
        "right": 2,
      }
    )
    

    # Create 1 User
    for user in fakerUser.create(1):
      print("Adding user: %s" % user)
      self.db.session.add(user)

