import os;
import sys;
import logging

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from typing import Optional;
from mongodb.MongoDB import MongoDB;

logging.basicConfig(
  level=logging.INFO,
  format='%(asctime)s - [ %(name)s\t ] - [ %(levelname)s\t ]: %(message)s',
  handlers=[logging.StreamHandler()]
)

class UnitTest():
  log: logging.Logger
  
  def __init__(self) -> None:
    self.log = logging.getLogger("UnitTest")
    self.log.info("Starting Unit Test")

  def test_get_collection(self, db: MongoDB):
    collection = db.get_collection("users")
    assert (collection is not None)
    self.log.info("Collection users exists")

  def test_drop_collection(self, db: MongoDB):
    db.drop_collection("users")
    self.log.info("Collection users dropped")

  def test_delete(self, db: MongoDB, id: str) -> Optional[int]:
    result = db.delete_by_id(collection_name="users", document_id=id)
    assert (result == 1)
    self.log.info(f"Deleted user: {id}")
    return result

  def test_insert(self, db: MongoDB) -> str:
    user = db.insert_one("users", {
      "username" : "abc",
      "password" : "123456",
      "email"    : "jackjack2000.kahp@gmail.com"
    })
    assert (user is not None)
    self.log.info(f"User inserted: {user.inserted_id}")
    return user.inserted_id

  def main(self):
    jade = MongoDB(host="localhost", port=27017, database="jade")
    self.test_get_collection(db=jade)
    id = self.test_insert(db=jade)
    self.test_delete(db=jade, id=id)
    self.test_drop_collection(db=jade)
    jade.close()

if (__name__ == "__main__"):
  UnitTest().main()
