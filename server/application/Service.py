import enum;
import logging;

from typing import Any, Optional;
from mongodb.MongoDB import MongoDB;

class ServiceStatus(enum.Enum):
  SUCCESS = "success"
  ERROR   = "error"

  def equals(self, to: "ServiceStatus") -> bool:
    return self.value == to.value

class ServiceResult():
  status  : ServiceStatus
  message : str
  data    : Any

  def __init__(self, status: ServiceStatus, message: str, data: Any) -> None:
    self.status  = status
    self.message = message
    self.data    = data

  @classmethod
  def success(cls, data: Any, message: str = "success"):
    return cls(status=ServiceStatus.SUCCESS, message=message, data=data)

  @classmethod
  def error(cls, message: str = "error"):
    return cls(status=ServiceStatus.ERROR, message=message, data=None)

class Service():
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