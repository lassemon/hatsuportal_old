# hatsuportal

## Development environment installation (Windows)

- Install Git for windows (https://gitforwindows.org/)
  - _use recommended options during installation_
- Install docker (https://www.docker.com/get-docker)
  - _You'll need to create a Docker ID_
- Install node and npm for windows (https://nodejs.org/en/download/current/)
  - _Take current version, not the LTS_
- Install yarn for windows (https://yarnpkg.com/lang/en/docs/install/#windows-stable)
  - _Take latest version_
- Install Visual Code Studio (https://code.visualstudio.com/download)
  - _Install plugin TSLint https://marketplace.visualstudio.com/items?itemName=eg2.tslint_
  - _Set your VSCode settings to `"tslint.autoFixOnSave": true` and `"editor.formatOnSave": true`_
  - _Please also use `"editor.tabSize": 2` and `"editor.detectIndentation": false`_ to always force indentation with 2 spaces

## Running development environment

- Navigate to project root
- Run `sh install.sh` (installs node packages for all projects, _needed so that volume mount won't override projects and delete node_modules folders_ and runs `docker-compose up`)
- (on windows run `docker-volume-watcher`, see http://blog.subjectify.us/miscellaneous/2017/04/24/docker-for-windows-watch-bindings.html for more info)
- `http://localhost/docs/` should now answer with swagger documentation
- `http://localhost:8080/` should now answer with PostgreSQL Adminer. (_see credentials from docker-compose.yml_)
- `http://localhost` should now answer with React UI
- **_DISCLAIMER: note that in the API project, nodemon only updates dependency changes trough the ./src/server.ts inclusion hierarchy (_see nodemon.json file_), but does not run for example commands like `tsoa swagger` or `tsoa routes`. To make sure all changes are deployed to server, run `yarn build`, `docker-compose down` and finally `docker-compose up` to generate all files and deploy them to the server._**


## Destroying development environment

- Navigate to project root
- Run `sh uninstall.sh` (removes node_modules folders, kills and destroys all docker containers, deletes all images and removes all not used volumes.
- **_DISLAIMER: If you have other docker projects on your machine, this will destroy them too!!_**


## Using SwaggerUI

- Navigate to `http://localhost/docs/`
- Open any of the API descriptions and press the `Try it out` button on the right side.
- SwaggerUI will generate a placeholder request for you. Pressing the `Execute` button will send the request.
- Some of the API requests require a Json Web Token https://jwt.io/ and will respond with `401 Unauthorized` without a proper jwt in the request headers.
- Login to the application using the login POST request (find it in the API listing under _Auth_)
- Both test users `jykajee` and `Mister Thane` use the password `root`
- Login response will contain `authToken`. copy it.
- Navigate to the top of the SwaggerUI page and press the `Authorize` button.
- A popup opens. Inside the `Value` field. Input first the word `Bearer` followed by a space and then the authToken.
- e.g. `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJuYW1lIjoiTWlzdGVyIFRoYW5lIn0sImlhdCI6MTUzMzg0NDk4MH0.796cXHQ_Jvh2HYcglNovfWfKsX4WgW3zcqevrMWYoxc`
- Press the `Authorize` button inside the popup dialog and then press `Close`.
- All requests now sent to the API using SwaggerUI should contain a valid jwt token.
- More about bearer token https://stackoverflow.com/a/25843058

## Docker cheatsheet

- `docker ps` lists all running docker containers
- `docker image ls` lists all downloaded images
- `docker volume ls` lists all the volumes
- `docker rm <container id>` deletes a container
- `docker rmi <image id>` deletes an image
- `docker kill $(docker ps -q)` kills all running containers
- `docker rm $(docker ps -a -q)` deletes all stopped containers
- `docker rmi $(docker images -q)` deletes all images
- `docker volume prune` removes all dangling volumes
- `docker build -t <friendlyname>` builds a docker image with specified name
- `docker run -p <hostport>:<containerport> <friendlyname>` run a docker image and publish a port to host
- `docker stop <container ID>` stops the container (_find the id with `docker ps`_)
- `docker exec -it <container ID> /bin/bash`
  - or for windows with git bash you need to start the container with `winpty docker run -p <hostport>:<containerport> <friendlyname>` and then access using `winpty docker exec -it <container ID> bash` (_more information here https://willi.am/blog/2016/08/08/docker-for-windows-interactive-sessions-in-mintty-git-bash/_)
- `docker-compose up -d` starts the containers and detaches from run command after finished
  - _on windows, remember to share the drive that you are developing on, with docker_
- `docker-compose down` stops all running containers
- `docker-compose restart <worker>` restarts a single container within docker-compose

## Troubleshooting

$ docker-volume-watcher \
`WARNING:root:No mounts match container name pattern * and host directory pattern *`

- SOLUTION: you have not started docker-compose with `docker-compose up`
