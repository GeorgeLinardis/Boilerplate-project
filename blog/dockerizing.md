# Create a docker file

First create an empty docker file by typing `touch Dockerfile`.

Through this file we are going to add some instructions on how to build our container.

Fill in the following commands in the dockerfile and lets check them one at a time:

```dockerfile
FROM node:latest

WORKDIR /app

COPY .. .

RUN npm install

CMD ["npm", "run", "start"]

EXPOSE 3030
```

In our docker file we have the following conventions based on the official docs.
Comments are added using `#`

e.g `# I am a comment`

and commands are written with uppercase letters

e.g `RUN` is a docker command

## Breaking down each line

`FROM node:latest`
A docker file must begin with a FORM command, this command specifies
the parent image you are going to use. This is not the node's version, it is the image's version we are using.

`FROM` command initializes a new build stage.

`WORKDIR` will be used by docker for anything needed inside guest

`COPY .. .`
The `COPY` instruction copies new files or directories from `<src>` folder (from current folder) and adds them to the filesystem of the container at the path `<dest>`, in this example `app` folder

`RUN mkdir -p /usr/src/app` will behave as if you were running this command inside a UNIX shell


`EXPOSE 3030`
This command will inform docker to start listening at that specific port at runtime

`CMD` is the command used on how the container will run

## Build the image

OK! Let's test what we did by running inside the folder which contains the dockerfile:

`docker build --tag george/portfolio:my_app .` (Don't forget the dot!)

`-t` or `--tag` is for adding a tag in your image, that way you can distinguish it more easily from the other images you may have in your machine. The name after : meaning the `:my_app`, will be used as your docker image tag.

If you don't use the `:my_app` part it will tag your image with the default tag which is `latest`.

By using the `.` we tell the Docker daemon (known as `dockerd`) to fetch the file in the current directory.

By successfully finishing your build it should say: `Successfully tagged george/portolio:portfolio`

Type `docker images` to see your images, you should see something like:

```
REPOSITORY                 TAG                 IMAGE ID             CREATED             SIZE
george/portfolio         portfolio          <a random id here>      2 seconds ago       944MB

```

`To remove it at any time while playing around type =  docker rm image george/portfolio:portfolio`


Now create a docker ignore file `touch .dockerignore` and add the following inside there:

```ignorelang
.git
../.gitignore
```

## Run the container

Let's run the container! Just type:

`docker run -d --name my_app george/portfolio:my_app`

Remember if you added port 3030 on your dockerfile you should use it in your app as well.  
If though, you want different ports in these 2 (docker and your app) then you should define the port when running your container.
So in this example our command would change to:

`docker run -d --port 3030:8888 george/portfolio:my_app`  
Which would mean that 3030 would be our app's port and 8888 would be docker's port.  
`docker run` means actually create and run

With

`docker exec -it my_app bash`

command we are asking docker to run our `portfolio` container with the following flags:

`--interactive -i`  
Keep STDIN open even if not attached (from official docs)  
STDIN(STandarD INput) - it means it will keep receiving input data from the user TODO

`--tty -t`  
Allocate a pseudo-TTY (from official docs)
Make it behave as a terminal actually

so `-it` means that we want to interact with it actually

# USEFUL COMMANDS
`docker ps` =  list containers

`docker ps -a`  = lists all containers along with the closed ones etc..

`docker run <image name>` = start a container (if host does not have image it will download it)

`docker run -d <container name>` = detached mode / it will keep running at the backend

`docker stop <container name or id>` = will stop the container

`docker stop $(docker ps -a -q)` = will stop all containers (-q will show only container ids)

`docker rm <container name or id>` = will remove the container

`docker rmi <image name>` = delete image

`docker images` = listing all images

