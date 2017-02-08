#!/bin/sh
SERVICE=$1
SERVICE=${SERVICE:-test}
COMMAND=$2

# Error handler.
abort()
{
  printf "[$(date +"%F %T")] \xe2\x9c\x96 Run failed!\n"
  exit -1
}
trap 'abort' 0

# Stop on first error.
set -e

printf "[$(date +"%F %T")] \xe2\x9c\xad Running ${SERVICE}...\n"

# Run
docker-compose -f ./docker/docker-compose.yaml run --service-ports --rm $SERVICE

# Cleanup
docker-compose -f ./docker/docker-compose.yaml down --remove-orphans

# Success.
trap : 0
