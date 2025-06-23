import logging;

from flask import Flask;
from flask import jsonify;
from http import HTTPStatus;

from .dto import Response;
from ..services.dto import ServiceStatus;
from ..services.ConversationService import ConversationService;

class ConversationController():
  app: Flask
  log: logging.Logger
  service: ConversationService

  def __init__(self, app: Flask, service: ConversationService) -> None:
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

    @self.app.route("/conversation/search", methods=["POST"])
    def search_conversations():
      result = self.service.search_conversations()
      if (result.status.equals(ServiceStatus.ERROR)):
        response = Response.error(code=HTTPStatus.NOT_FOUND.value, message=result.message)
        return jsonify(response.to_dict())

      response = Response.success(data=result.data)
      return jsonify(response.to_dict())