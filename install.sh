#!/bin/bash
cd ./api
yarn install
cd ../
cd ./ui
yarn install
cd ../
docker-compose up