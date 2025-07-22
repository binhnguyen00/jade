import enum;

from typing import Any;

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