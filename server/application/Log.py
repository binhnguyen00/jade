import logging

# ANSI escape codes for colors
LOG_COLORS: dict[str, str] = {
  'DEBUG': '\033[37m',    # white
  'INFO': '\033[32m',     # green
  'WARNING': '\033[33m',  # yellow
  'ERROR': '\033[31m',    # red
  'CRITICAL': '\033[41m', # white on red bg
}
RESET_COLOR: str = '\033[0m'

class ColoredFormatter(logging.Formatter):
  def format(self, record: logging.LogRecord) -> str:
    color: str = LOG_COLORS.get(record.levelname, '')
    levelname_colored: str = f"{color}{record.levelname}{RESET_COLOR}"
    record.levelname = levelname_colored
    return super().format(record)