#!/bin/bash
cd ./api
echo 'rm -rf ./api/node_modules'
rm -rf ./node_modules
cd ../
cd ./ui
echo 'rm -rf ./ui/node_modules'
rm -rf ./node_modules
cd ../
docker kill $(docker ps -q)
docker rm -f $(docker ps -a -q)
docker rmi -f $(docker images -q)
docker volume prune -f