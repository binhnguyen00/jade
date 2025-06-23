import logging;

from typing import Literal;
from flask import Flask;
from flask_cors import CORS;
from mongodb.MongoDB import MongoDB;

from .Data import SampleData;
from .Log import ColoredFormatter;
from .controllers.ConversationController import ConversationController;
from .services.ConversationService import ConversationService;

formatter: ColoredFormatter = ColoredFormatter(
  fmt='%(asctime)s - [ %(name)-12s ] - [ %(levelname)s ]: %(message)s',
  datefmt='%d-%m-%Y@%H:%M:%S'
)
handler: logging.StreamHandler = logging.StreamHandler()
handler.setFormatter(formatter)

logging.basicConfig(
  level=logging.INFO,
  handlers=[handler]
)

class Application():
  mode: Literal["develop", "production"]
  app: Flask
  database: MongoDB

  def __init__(self, mode: Literal["develop", "production"]):
    self.mode = mode
    self.app = Flask(__name__)
    CORS(self.app)
    if (self.mode == "develop"):
      self.database = MongoDB(host="localhost", port=27017, database="dev", timeout=10000)
    elif (self.mode == "production"):
      self.database = MongoDB(host="localhost", port=27017, database="jade", timeout=10000)
    self._component_scan()

  def get_app(self) -> Flask:
    return self.app

  def run(self, debug=False, host='0.0.0.0', port=5001):
    self._print_banner()
    self.app.run(debug=debug, host=host, port=port)

  def debug(self, host='0.0.0.0', port=5001):
    sample_data = SampleData(database=self.database)
    sample_data.drop_all()
    sample_data.insert_conversations()
    self._print_banner()
    self.app.run(debug=True, host=host, port=port)

  def _component_scan(self):
    conversation_service = ConversationService(database=self.database)
    conversation_controller = ConversationController(app=self.app, conversation_service=conversation_service)
    conversation_controller.register_routes()

  def _print_banner(self):
    banner = r"""
    /$$$$$$                 /$$          
    |__  $$                | $$          
       | $$  /$$$$$$   /$$$$$$$  /$$$$$$ 
       | $$ |____  $$ /$$__  $$ /$$__  $$
  /$$  | $$  /$$$$$$$| $$  | $$| $$$$$$$$
 | $$  | $$ /$$__  $$| $$  | $$| $$_____/
 |  $$$$$$/|  $$$$$$$|  $$$$$$$|  $$$$$$$
  \______/  \_______/ \_______/ \_______/
    """
    print("\033[1;36m" + banner + "\033[0m")
    print("\033[1;32mApplication is starting...\033[0m")
    if (self.mode == "develop"):
      print("\033[1;33m➜ Mode:    \033[0m DEVELOP")
    elif (self.mode == "production"):
      print("\033[1;33m➜ Mode:    \033[0m PRODUCTION")
    print(f"\033[1;33m➜ Local:   \033[0m http://localhost:{self.app.config.get('PORT', 5001)}")

# export
develop     = Application(mode="develop")
application = Application(mode="production")

if (__name__ == "__main__"):
  application.run()