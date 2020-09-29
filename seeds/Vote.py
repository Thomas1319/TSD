#Seeders to create some Votes(without questions)

from flask_seeder import Seeder, Faker, generator
from TSDYourCustomSurvey.models import Vote

# All seeders inherit from Seeder
class VoteSeeder(Seeder):

  # run() will be called by Flask-Seeder
  def run(self):
    # Create a new Faker and tell it how to create Survey objects
    fakerVote1 = Faker(
      cls=Vote,
      init={
        'answer': "yes",
        'idQ': 1,
        'idU': 1,
      }
    )
    fakerVote2 = Faker(
      cls=Vote,
      init={
        'answer': "Chinese",
        'idQ': 2,
        'idU': 1,
      }
    )
    

    # Create 2 Votes
    for vote in fakerVote1.create(1):
      print("Adding vote: %s" % vote)
      self.db.session.add(vote)
      
    for vote in fakerVote2.create(1):
      print("Adding vote: %s" % vote)
      self.db.session.add(vote)

