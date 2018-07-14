# hatsuportal


## Development environment installation (Windows)
- Install docker (https://www.docker.com/get-docker)
  - _You'll need to create a Docker ID_
- Install node and npm for windows (https://nodejs.org/en/download/current/)
  - _Take current version, not the LTS_
- Install Visual Code Studio (https://code.visualstudio.com/download)
  - _Use plugin TSLint https://marketplace.visualstudio.com/items?itemName=eg2.tslint_
  - _Set your VSCode settings to `"tslint.autoFixOnSave": true`_

## Running development environment
- navigate to project root
- run `sh install.sh` (installs node packages for all projects, _needed so that volume mount won't override projects and delete node_modules folders_)
- run `docker-compose up -d`
- (on windows run `docker-volume-watcher`, see http://blog.subjectify.us/miscellaneous/2017/04/24/docker-for-windows-watch-bindings.html for more info)
- `http://localhost/api/docs/` should now answer with swagger documentation

## Docker cheatsheet
- `docker ps` lists all running docker containers
- `docker image ls` lists all downloaded images
- `docker build -t <friendlyname>` builds a docker image with specified name
- `docker run -p <hostport>:<containerport> <friendlyname>` run a docker image and publish a port to host
- `docker stop <container ID>` stops the container (_find the id with `docker ps`_)
- `docker exec -it <container ID> /bin/bash`
  - or for windows with git bash you need to start the container with `winpty docker run -p <hostport>:<containerport> <friendlyname>` and then access using `winpty docker exec -it <container ID> bash` (_more information here https://willi.am/blog/2016/08/08/docker-for-windows-interactive-sessions-in-mintty-git-bash/_)
- `docker-compose up -d` starts the containers and detaches from run command after finished
    - _on windows, remember to share the drive that you are developing on, with docker_
- `docker-compose down` stops all running containers


## Troubleshooting
$ docker-volume-watcher \
`WARNING:root:No mounts match container name pattern * and host directory pattern *`
- SOLUTION: you have not started docker-compose with `docker-compose up`

