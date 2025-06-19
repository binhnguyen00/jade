import pymongo;

from pymongo.database import Database;
from pymongo.collection import Collection;
from pymongo.results import InsertOneResult;

client = pymongo.MongoClient("mongodb://localhost:27017/")

db: Database = client.get_database("jade")

users: Collection = db.get_collection("users")
user = users.find_one({"username": "jackjack"})
if (user):
  print(user)
else:
  new_user: InsertOneResult = users.insert_one({
    "username" : "jackjack",
    "password" : "123456",
    "email"    : "jackjack2000.kahp@gmail.com"
  })
  print(new_user)