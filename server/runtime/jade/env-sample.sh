bin=`cd "$bin"; pwd`
CURRENT_DIR=`cd $bin; pwd`
WORKSPACE_DIR="/Users/jackjack/projects/jade/server"

DB_NAME="jade"

VENV="$WORKSPACE_DIR/runtime/$DB_NAME/.venv"
DATA_DIR="$WORKSPACE_DIR/runtime/$DB_NAME/data"

HOST="0.0.0.0"
PORT="5001"
WORKERS=1
TIMEOUT=120
LOG_LEVEL="info"
PID_FILE="gunicorn.pid"

MODULE_NAME="application.Application"
APP_VAR="main"