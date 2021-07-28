# Dockerizing your app using docker-compose

So why use docker-compose instead of docker?

docker-compose is used to manage multiple containers, where each container handles a different image.


inside the docker-compose.yml file type:

```text
version: '3.7'

services:
  app:
    image: node:12-alpine
    container_name: my_app
    ports:
    - "3030:3030"
      #  This tells Compose that we would like to add environment variables from a file called .env, located in our build context.
    
    restart: unless-stopped
    env_file: .env
    volumes:
      - ./:/src/
    working_dir: /src/
    # NOTICE:
    # 1. That is not changing the dev workflow since in any case the dev has to exec into the app
    #    container and run `npm run dev`
    # 2. docker-compose.yml is only used in dev env, that's why this change has no side effects
    command: tail -F -n0 /etc/hosts
```
Lets break docker-compose in pieces:

`services:
    app:
`
This is the name of our service, it could be anything, e.g `frontend`

`image: node:12-alpine`  
Here we are asking which image to use for our service.
If we wanted to build a new image based on a docker file we would change it to something like:
`build: <docker file path>`


```
ports:
  - "3030:3030"
```  
We are connecting/mapping guest's port 3030 to host's port 3030. 

`container_name: my_app`  
The container name at the time it was started

`restart: unless-stopped`  
Similar to always, except that when the container is stopped (manually or otherwise), it is not restarted even after Docker daemon restarts.

`env_file: .env`  

You can pass multiple environment variables from an external file through to a service’s containers with the ‘env_file’ option, just like with docker run --env-file=FILE ...:  

```
volumes:
  - ./:/src/
working_dir: /src/
```  
What are volumes?

Volumes, on the other hand, are physical areas of disk space shared between the host and a container, or even between containers. In other words, a volume is a shared directory in the host, visible from some or all containers.

# NOTICE:
# 1. That is not changing the dev workflow since in any case the dev has to exec into the app
#    container and run `npm run dev`
# 2. docker-compose.yml is only used in dev env, that's why this change has no side effects
`command: tail -F -n0 /etc/hosts`

to see docker info logged in name

`docker info | grep 'name'`

