import os;

from flask import json;
from mongodb.MongoDB import MongoDB;

class SampleData():
  database: MongoDB

  def __init__(self, database: MongoDB) -> None:
    self.database = database

  def insert_conversations(self) -> None:
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_path = os.path.join(base_dir, "data", "conversations.json")

    with open(data_path, "r") as file:
      data: list[dict] = json.load(file)
    self.database.insert_many(collection_name="conversations", documents=data)

  def drop_all(self) -> None:
    self.database.drop_collection(collection_name="conversations")