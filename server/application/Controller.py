import logging;

from typing import Any;
from http import HTTPStatus;
from flask import Flask;
from flask import jsonify;

from .Service import Service, ServiceStatus;

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
      "message" : self.message,
    }

class Controller():
  app: Flask
  log: logging.Logger
  service: Service

  def __init__(self, app: Flask, service: Service) -> None:
    self.app = app
    self.log = logging.getLogger("Controller")
    self.service = service

  def register_routes(self):
    @self.app.route("/mock", methods=["GET"])
    def mock():
      response = Response.success(data="MongoDB is easy ☘️")
      self.log.info(response.to_dict())
      return jsonify(response.to_dict())

    @self.app.route("/conversation/<string:id>", methods=["GET"])
    def get_conversation(id: str):
      result = self.service.get_conversation(id=id)
      if (result.status.equals(ServiceStatus.ERROR)):
        response = Response.error(code=HTTPStatus.NOT_FOUND.value, message=result.message)
        return jsonify(response.to_dict())

      response = Response.success(data=result.data)
      return jsonify(response.to_dict())