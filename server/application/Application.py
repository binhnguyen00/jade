import logging;

from flask import Flask;
from flask_cors import CORS;

from .Controller import Controller;

logging.basicConfig(
  level=logging.INFO,
  format='%(asctime)s - [ %(name)-12s ] - [ %(levelname)-7s ]: %(message)s',
  handlers=[logging.StreamHandler()]
)

class Application():
  app: Flask

  def __init__(self):
    self.app = Flask(__name__)
    CORS(self.app)
    self._component_scan()

  def get_app(self) -> Flask:
    return self.app

  def run(self, debug=False, host='0.0.0.0', port=5001):
    self._print_banner()
    self.app.run(debug=debug, host=host, port=port)

  def _component_scan(self):
    controller = Controller(app=self.app)
    controller.register_routes()

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
    print(f"\033[1;33m➜ Local:   \033[0m http://localhost:{self.app.config.get('PORT', 5001)}")

# export
application = Application()
main = application.get_app()

if (__name__ == "__main__"):
  application.run()