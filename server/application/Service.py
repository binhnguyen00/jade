import logging;

class Service():
  log: logging.Logger

  def __init__(self) -> None:
    self.log = logging.getLogger("Service")

  def get_conversation(self, id: int):
    pass