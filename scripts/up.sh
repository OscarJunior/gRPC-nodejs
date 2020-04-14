#!/bin/sh

export CONTAINER_COMMAND="npm run start"
export CONTAINER_PORT="50051"

docker-compose up --build
