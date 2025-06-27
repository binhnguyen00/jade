#!/bin/bash

source ./env.sh
source "$WORKSPACE_DIR/runtime/utils.sh"

function run() {
  if has_opt "--dev" "$@"; then
    if [ ! -d "$DEV_DATA_DIR" ]; then
      mkdir -p "$DEV_DATA_DIR"
    fi
    mongod --dbpath $DEV_DATA_DIR
  elif has_opt "--prod" "$@"; then
    if [ ! -d "$PROD_DATA_DIR" ]; then
      mkdir -p "$PROD_DATA_DIR"
    fi
    mongod --dbpath $PROD_DATA_DIR
  fi
}

function stop() {
  if has_opt "--dev" "$@"; then
    kill $(pgrep -f "mongod --dbpath $DEV_DATA_DIR")
  elif has_opt "--prod" "$@"; then
    kill $(pgrep -f "mongod --dbpath $PROD_DATA_DIR")
  fi
}

function show_helps() {
  echo """
Usage: MongoDB CLI
  ./mongodb.sh [COMMAND] [OPTION]

Start MongoDB Service
  ./mongodb.sh run --dev
    - Start MongoDB service in with development data
  ./mongodb.sh run --prod
    - Start MongoDB service in with production data

Stop MongoDB Service
  ./mongodb.sh stop --dev
  ./mongodb.sh stop --prod
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
  run "$@"
elif [ "$COMMAND" = "stop" ] ; then
  stop "$@"
fi