#!/bin/bash

source ./env.sh
source "$WORKSPACE_DIR/runtime/utils.sh"

function activate_venv() {
  if [ ! -d "$VENV" ]; then
    echo "VIRTUAL ENVIRONMENT NOT FOUND. MUST CREATE ONE"
    return 1
  fi
  if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    source "$VENV/Scripts/activate"
  else
    source "$VENV/bin/activate"
  fi
}

function create_venv() {
  if [ -d "$VENV" ]; then
    echo "VIRTUAL ENVIRONMENT ALREADY EXISTS"
  else
    echo "NO VIRTUAL ENVIRONMENT FOUND. CREATING ONE..."
    "$PYTHON_CMD" -m venv "$VENV" || {
      echo "FAILED TO CREATE VIRTUAL ENVIRONMENT"
      return 1
    }
    if [ -f "$WORKSPACE_DIR/requirements.txt" ]; then
      echo "INSTALLING DEPENDENCIES..."
      pip install -r "$WORKSPACE_DIR/requirements.txt" || {
        echo "FAILED TO INSTALL DEPENDENCIES"
        return 1
      }
    else
      echo "requirements.txt NOT FOUND AT $WORKSPACE_DIR"
    fi
  fi
}

function install_venv() {
  activate_venv
  pip install -r "$WORKSPACE_DIR/requirements.txt" || {
    echo "FAILED TO INSTALL DEPENDENCIES"
    return 1
  }
}

function run() {
  activate_venv
  export PYTHONPATH="$WORKSPACE_DIR:$PYTHONPATH"

  # handle start twice
  if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "⚠️  Server already running (PID $(cat "$PID_FILE"))"
    return 1
  fi

  echo "Starting server in daemon mode on $HOST:$PORT..."

  # ensure logs directory
  LOG_DIR=$(dirname "$PID_FILE")/logs
  mkdir -p "$LOG_DIR"

  gunicorn \
    -w "$WORKERS" \
    -b "$HOST:$PORT" \
    --timeout "$TIMEOUT" \
    --log-level "$LOG_LEVEL" \
    --log-file "$LOG_DIR/app.log" \
    --pid "$PID_FILE" \
    -D \
    "$MODULE_NAME:$APP_VAR"

  # wait for gunicorn.pid to be created
  local timeout=5
  while [ ! -f "$PID_FILE" ] && [ $timeout -gt 0 ]; do
    sleep 0.5
    timeout=$((timeout - 1))
  done

  if [ $? -eq 0 ]; then
    echo "✅ Server started, PID $(cat "$PID_FILE")"
  else
    echo "❌ Failed to start server"
  fi
}


function stop() {
  if [ -f "$PID_FILE" ]; then
    PID=$(cat $PID_FILE)
    echo "Stopping server with PID $PID..."
    kill $PID
    rm $PID_FILE
    echo "Server stopped."
  else
    echo "PID file not found. Is the server running?"
  fi
}

function debug() {
  activate_venv
  export PYTHONPATH="$WORKSPACE_DIR:$PYTHONPATH"
  python -m application.Debug
}

function status() {
  if [ -f "$PID_FILE" ]; then
    PID=$(cat $PID_FILE)
    if ps -p $PID > /dev/null; then
      echo "Server is running with PID $PID"
    else
      echo "PID file exists but process is not running. Cleaning up..."
      rm $PID_FILE
    fi
  else
    echo "Server is not running"
  fi
}

function show_helps() {
  echo """
Usage: Run server with prepaired configs
  ./flask.sh [COMMAND] [OPTION]

Python Virtual Environment
  ./flask.sh venv --create
  ./flask.sh venv --install

Server
  ./flask.sh run
    - Start gunicorn service as daemon

  ./flask.sh stop
    - Kill gunicorn service by PID

  ./flask.sh status
    - Check the server if it is running or not

  ./flask.sh debug
    - Start gunicorn service with tail logs
  """
}

COMMAND=$1;
if [ -n "$COMMAND" ]; then
  shift
else
  echo "No command provided. Showing helps..."
  show_helps
  exit 1
fi

if [ "$COMMAND" = "venv" ] ; then
  if has_opt "--create" "$@"; then
    create_venv
  elif has_opt "--install" "$@"; then
    install_venv
  fi
elif [ "$COMMAND" = "help" ] ; then
  show_helps
elif [ "$COMMAND" = "run" ] ; then
  run
elif [ "$COMMAND" = "stop" ] ; then
  stop
elif [ "$COMMAND" = "status" ] ; then
  status
elif [ "$COMMAND" = "debug" ] ; then
  debug
else
  show_helps
fi