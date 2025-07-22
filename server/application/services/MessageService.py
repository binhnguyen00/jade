import logging;

from datetime import datetime;
from mongodb.MongoDB import MongoDB;

from ..dto.Service import ServiceResult;
from ..dto.MessageType import MessageType;

class MessageService():
  log: logging.Logger
  database: MongoDB

  def __init__(self, database: MongoDB) -> None:
    self.log = logging.getLogger("Service")
    self.database = database

  def save_message(self, conversation_id: str, message: dict, role: MessageType) -> ServiceResult:
    collection_name = "conversations"
    update_operation = {
      "$push": {
        "messages": {
          "$each": [{ "content": message, "role": role.value }],
        }
      },
      "$set": {
        "updated_at": datetime.now()
      }
    }
    count = self.database.update_by_id(collection_name, document_id=conversation_id, update_data=update_operation)
    if (count == 0):
      return ServiceResult.error(message="Error updating conversation")

    return ServiceResult.success(data=count)