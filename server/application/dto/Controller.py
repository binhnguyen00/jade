from typing import Any;
from http import HTTPStatus;

class Response():
  def __init__(self, code: int, message: str, data: Any):
    self.code     = code
    self.message  = message
    self.data     = data

  @classmethod
  def success(cls, data: Any, message: str = "success"):
    return cls(code=HTTPStatus.OK.value, message=message, data=data)

  @classmethod
  def error(cls, code: int, message: str):
    return cls(code=code, message=message, data=None)

  def to_dict(self):
    return {
      "code"    : self.code,
      "data"    : self.data,
      "message" : self.message
    }