import logging;

from typing import Optional;
from mongodb.MongoDB import MongoDB;

from ..dto.Service import ServiceResult;

class ConversationService():
  log: logging.Logger
  database: MongoDB

  def __init__(self, database: MongoDB) -> None:
    self.log = logging.getLogger("Service")
    self.database = database

  def get_conversation(self, id: str) -> ServiceResult:
    collection_name = "conversations"
    conversation: Optional[dict | None] = self.database.get_by_id(collection_name, document_id=id)
    if (conversation is None):
      return ServiceResult.error(message="Conversation not found")

    normalized: dict = self.database.normalize(conversation)
    return ServiceResult.success(data=normalized)

  def search_conversations(self, query: dict = {}) -> ServiceResult:
    collection_name = "conversations"
    conversations: list[dict] = self.database.search(collection_name, query=query)
    if (not conversations):
      return ServiceResult.error(message="Conversations not found")

    normalized: list[dict] = self.database.bulk_normalize(conversations)
    return ServiceResult.success(data=normalized)