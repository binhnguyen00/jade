import enum;
import logging;

from typing import Any, Optional;

from mongodb.MongoDB import MongoDB;

class ServiceStatus(enum.Enum):
  SUCCESS = "success"
  ERROR   = "error"

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

  def __init__(self) -> None:
    self.log = logging.getLogger("Service")
    self.database = MongoDB(
      host="localhost",
      port=27017,
      database="jade",
      timeout=5000
    )

  def get_conversation(self, id: str) -> ServiceResult:
    result: Optional[Any] = self.database.get_by_id(collection_name="conversations", document_id=id)
    if (result is None):
      return ServiceResult.error(message="Conversation not found")
    return ServiceResult.success(data=result)