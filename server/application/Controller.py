from typing import Any;
from flask import Flask;
from flask import request, jsonify;

class Response():
  def __init__(self, code: int, message: str, data: Any):
    self.code     = code
    self.message  = message
    self.data     = data

  def to_dict(self):
    return {
      "code": self.code,
      "message": self.message,
      "data": self.data
    }

class Controller():
  
  def __init__(self):
    pass

  def register(self, app: Flask):
    @app.route("/mock", methods=["GET"])
    def mock():
      response = Response(code=200, message="ok", data="MongoDB is easy ☘️")
      return jsonify(response.to_dict())