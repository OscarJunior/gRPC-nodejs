#!/usr/bin/env bash

file=".envrc"

if [ -f $file ] ; then
    rm $file
fi

echo "PORT=$PORT" >> $file
echo "NODE_ENV=${NODE_ENV}" >> $file
echo "MONGO_URI=${MONGO_URI}" >> $file
