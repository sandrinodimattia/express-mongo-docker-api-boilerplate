#!/bin/sh
COMMAND=$1

# Error handler.
abort()
{
  printf "[$(date +"%F %T")] \xe2\x9c\x96 Build failed!\n"
  exit -1
}
trap 'abort' 0

# Stop on first error.
set -e

printf "[$(date +"%F %T")] \xe2\x9c\xad Building containers...\n"

# Prepare environment
if [ "$COMMAND" = "-f" ]
then
  docker-compose -f ./docker/docker-compose.yaml build --no-cache --force-rm
else
  docker-compose -f ./docker/docker-compose.yaml build
fi

# Success.
trap : 0
