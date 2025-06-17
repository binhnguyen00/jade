#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
ORANGE='\033[0;33m'
NO_COLOR='\033[0m'

windowsOS=false
if [ "$OSTYPE" = "msys" ] ; then
  windowsOS=true;
elif [[ "$OSTYPE" == "cygwin" ]]; then
  windowsOS=true;
elif [[ "$OSTYPE" == "win32" ]]; then
  windowsOS=true;
fi

function has_opt() {
  OPT_NAME=$1
  shift
  for i in "$@"; do
    if [[ $i == $OPT_NAME ]] ; then
      return 0  # true in bash
    fi
  done
  return 1  # false in bash
}

function get_opt() {
  OPT_NAME=$1
  DEFAULT_VALUE=$2
  shift

  for i in "$@"; do
    index=$(($index+1))
    if [[ $i == $OPT_NAME* ]] ; then
      value="${i#*=}"
      echo "$value"
      return
    fi
  done
  echo $DEFAULT_VALUE
}

function install() {
  if has_opt "-clean" $@; then
    rm -rf node_modules dist pnpm-lock.yaml
  fi
  pnpm install
}

function build() {
  if has_opt "-clean" $@; then
    ./mini-app.sh install -clean
  fi
  typescript_check
  if [ $? -eq 0 ]; then
    pnpm vite build
  fi
}

function typescript_check() {
  echo -e "${BLUE}Checking TypeScript...${NO_COLOR}"
  pnpm tsc -b
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}TypeScript check passed.${NO_COLOR}"
    echo ""
    return 0
  else
    echo -e "${RED}TypeScript check failed.${NO_COLOR}"
    echo ""
    return 1
  fi
}

function show_help() {
  echo """
./server.sh [COMMAND] [OPTION]

Commands:

  """
}

COMMAND=$1;
if [ -n "$COMMAND" ]; then
  shift
else
  echo -e "${ORANGE}No command provided. Showing help...${NO_COLOR}"
  show_help
  exit 1
fi

if [ "$COMMAND" = "build" ] ; then
  build $@
elif [ "$COMMAND" = "install" ] ; then
  install $@
else
  show_help
fi