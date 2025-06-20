import logging;

from typing import Optional, Union;
from pymongo.cursor import Cursor;
from pymongo.database import Database;
from pymongo.errors import DuplicateKeyError;
from pymongo.mongo_client import MongoClient, PyMongoError;
from pymongo.collection import Collection, ObjectId;
from pymongo.results import DeleteResult, InsertManyResult, InsertOneResult, UpdateResult;

class MongoDB():
  client: MongoClient
  db: Database
  logger: logging.Logger

  def __init__(self, host: str = "localhost", port: int = 27017, database: str = "jade") -> None:
    self.logger = logging.getLogger("MongoDB")
    self.client = MongoClient(f"mongodb://{host}:{port}/", serverSelectionTimeoutMS=5000)
    try:
      self.client.server_info()
      self.db = self.client.get_database(database)
      self.logger.info("Connected to MongoDB successfully")
    except PyMongoError as e:
      self.logger.error(f"Connection error: {e}")
      raise

  def get_collection(self, collection_name: str) -> Collection:
    return self.db[collection_name]

  def drop_collection(self, collection_name: str) -> dict:
    return self.db.drop_collection(collection_name)

  def close(self):
    self.client.close()

  def search(self, collection_name: str, query: dict = {}, projection: dict = {}, limit: int = 0) -> list[dict]:
    """ Search documents in a collection
      :param collection_name: Name of the collection
      :param query: Filter query (default: {})
      :param projection: Fields to include/exclude (default: None)
      :param limit: Maximum documents to return (default: 0 = all)
      :return: List of matching documents
    """
    try:
      collection: Collection = self.get_collection(collection_name=collection_name)
      cursor: Cursor = collection.find(filter=query, projection=projection, limit=limit)
      return list(cursor)
    except PyMongoError as e:
      self.logger.error(f"Search error: {e}")
      raise

  def find_one(self, collection_name: str, query: dict = {}, projection: dict = {}) -> dict | None:
    """ Find a single document in a collection
      :param collection_name: Name of the collection
      :param query: Filter query (default: {})
      :param projection: Fields to include/exclude
      :return: Single document or None
    """
    try:
      collection: Collection = self.get_collection(collection_name=collection_name)
      return collection.find_one(filter=query, projection=projection)
    except PyMongoError as e:
      self.logger.error(f"Find one error: {e}")
      raise

  def get_by_id(self, collection_name: str, document_id: Union[str, ObjectId], projection: dict = {}):
    """ Get document by ID
      :param collection_name: Name of the collection
      :param document_id: Document ID as string or ObjectId
      :param projection: Fields to include/exclude
      :return: Document or None
    """
    try:
      collection: Collection = self.get_collection(collection_name)
      if (isinstance(document_id, str)):
        document_id = ObjectId(document_id)

      _id: ObjectId = document_id
      document = collection.find_one(filter={"_id": _id}, projection=projection)
      return document
    except (PyMongoError, ValueError) as e:
      self.logger.error(f"Get document error: {e}")
      raise

  def insert_one(self, collection_name: str, document: dict) -> Optional[InsertOneResult]:
    try:
      collection: Collection = self.get_collection(collection_name)
      result: InsertOneResult = collection.insert_one(document)
      return result
    except (PyMongoError, DuplicateKeyError) as e:
      self.logger.error(f"Insert one error: {e}")
      raise

  def insert_many(self, collection_name: str, documents: list[dict]) -> Optional[InsertManyResult]:
    try:
      collection: Collection = self.get_collection(collection_name)
      result: InsertManyResult = collection.insert_many(documents)
      return result
    except (PyMongoError, DuplicateKeyError) as e:
      self.logger.error(f"Insert many error: {e}")
      raise

  def update(self, collection_name: str, filter_query: dict, datas: list[dict], upsert: bool = False) -> Optional[int]:
    """ Unified update method for single or multiple documents
      :param collection_name: Name of the collection
      :param filter_query: Filter query
      :param datas: List of update operations
      :param upsert: Whether to insert if document doesn't exist
      :return: Modified document count or None on error
    """
    try:
      collection: Collection = self.get_collection(collection_name)
      if (len(datas) == 1):
        data = datas[0]
        result: UpdateResult = collection.update_one(filter=filter_query, update=data, upsert=upsert)
        return result.modified_count
      else:
        result: UpdateResult = collection.update_many(filter=filter_query, update=datas, upsert=upsert)
        return result.modified_count

    except PyMongoError as e:
      self.logger.error(f"Update error: {e}")
      raise

  def update_by_id(self, collection_name: str, document_id: Union[str, ObjectId], update_data: dict) -> Optional[int]:
    """ Update document by ID
      :param collection_name: Name of the collection
      :param document_id: Document ID as string or ObjectId
      :param update_data: Update data
      :return: Modified count (1 if updated, 0 if not found) or None on error
    """
    try:
      collection: Collection = self.get_collection(collection_name)
      if (isinstance(document_id, str)):
        document_id = ObjectId(document_id)

      _id: ObjectId = document_id
      result: UpdateResult = collection.update_one(filter={"_id": _id}, update=update_data)
      return result.modified_count

    except PyMongoError as e:
      self.logger.error(f"Update by ID error: {e}")
      raise

  def delete(self, collection_name: str, filter_query: dict, multi: bool = False) -> Optional[int]:
    """ Unified delete method for single or multiple documents
      :param collection_name: Name of the collection
      :param filter_query: Filter query
      :param multi: False for single delete (default), True for multi-delete
      :return: Deleted document count or None on error
    """
    try:
      collection: Collection = self.get_collection(collection_name)
      if (multi):
        result: DeleteResult = collection.delete_many(filter_query)
      else: result: DeleteResult = collection.delete_one(filter_query)
      return result.deleted_count

    except PyMongoError as e:
      self.logger.error(f"Delete error: {e}")
      raise

  def delete_by_id(self, collection_name: str, document_id: Union[str, ObjectId]) -> Optional[int]:
    """ Delete document by ID
      :return: Deleted count (1 if deleted, 0 if not found) or None on error
    """
    try:
      collection: Collection = self.get_collection(collection_name)
      if (isinstance(document_id, str)):
        document_id = ObjectId(document_id)

      _id: ObjectId = document_id
      result: DeleteResult = collection.delete_one(filter={"_id": _id})
      return result.deleted_count

    except PyMongoError as e:
      self.logger.error(f"Delete by ID error: {e}")
      raise