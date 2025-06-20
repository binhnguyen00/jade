#!/bin/bash

source ./env.sh
source "$WORKSPACE_DIR/runtime/utils.sh"

function run() {
  mongod --dbpath $DATA_DIR
}

function stop() {
  kill $(pgrep -f "mongod --dbpath $DATA_DIR")
}

function show_helps() {
  echo """
Usage: MongoDB CLI
  ./mongodb.sh [COMMAND] [OPTION]

Start MongoDB Service
  ./mongodb.sh run
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

if [ "$COMMAND" = "run" ] ; then
  run
elif [ "$COMMAND" = "stop" ] ; then
  stop
fi