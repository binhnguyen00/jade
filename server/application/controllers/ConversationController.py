import logging

from flask import Flask;
from flask import request;
from flask import jsonify;
from http import HTTPStatus;
from typing import Literal;

from ..dto.Controller import Response;
from ..dto.MessageType import MessageType;
from ..dto.Service import ServiceStatus;
from ..services.MessageService import MessageService;
from ..services.ConversationService import ConversationService;

class ConversationController():
  app: Flask
  log: logging.Logger
  conversation_service: ConversationService
  message_service: MessageService

  def __init__(self, 
    app: Flask, 
    conversation_service: ConversationService,
    message_service: MessageService,
  ) -> None:
    self.app = app
    self.log = logging.getLogger("Controller")
    self.conversation_service = conversation_service
    self.message_service = message_service

  def register_routes(self):
    @self.app.route("/mock", methods=["GET"])
    def mock():
      response = Response.success(data="MongoDB is easy ☘️")
      self.log.info(response.to_dict())
      return jsonify(response.to_dict())

    @self.app.route("/conversation/<string:id>", methods=["GET"])
    def get_conversation(id: str):
      result = self.conversation_service.get_conversation(id=id)
      if (result.status.equals(ServiceStatus.ERROR)):
        response = Response.error(code=HTTPStatus.NOT_FOUND.value, message=result.message)
        return jsonify(response.to_dict())

      response = Response.success(data=result.data)
      return jsonify(response.to_dict())

    @self.app.route("/conversation/search", methods=["POST"])
    def search_conversations():
      result = self.conversation_service.search_conversations()
      if (result.status.equals(ServiceStatus.ERROR)):
        response = Response.error(code=HTTPStatus.NOT_FOUND.value, message=result.message)
        return jsonify(response.to_dict())

      response = Response.success(data=result.data)
      return jsonify(response.to_dict())

    @self.app.route("/conversation/<string:id>/message/save", methods=["POST"])
    def save_message(id: str):
      request_body: dict = request.get_json()
      if (not request_body):
        response = Response.error(code=HTTPStatus.BAD_REQUEST.value, message="Request body is empty")
        return jsonify(response.to_dict())

      message: dict = request_body.get("message", {})
      if (not message):
        response = Response.error(code=HTTPStatus.BAD_REQUEST.value, message="Message is empty")
        return jsonify(response.to_dict())

      role: Literal["user", "assistant"] = request_body.get("role", "user")
      result = self.message_service.save_message(conversation_id=id, message=message, role=MessageType(role))
      if (result.status.equals(ServiceStatus.ERROR)):
        response = Response.error(code=HTTPStatus.INTERNAL_SERVER_ERROR.value, message=result.message)
        return jsonify(response.to_dict())

      response = Response.success(data=result.data)
      return jsonify(response.to_dict())