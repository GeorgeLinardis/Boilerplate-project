# Dockerizing your app using docker-compose

So why use **docker-compose** instead of **docker**?

`docker-compose` is used to manage multiple containers, where each container handles a different image.

So I guess choosing between one and multiple containers will depend on what your app is will do.

Here I am just trying to learn so I am choosing probably the hard way.

Where to start?

Create a `docker-compose.yml` file and add inside:

Wait!! `yml`? Yummy Yummy? Who's hungry? :hugging_face:

Sorry...back to coding, so what is a `yml` file?

First of all, YAML is a language, it is a human-readable language and is most often used
to write configuration files.

If we need to go more technical (and truth be told this is as deep as I can get for now) we would say
that YAML language is a superset of JSON language.

When writing YAML in a file, we are writing using text and adding the `.yml` extension.

For those of you who love acronyms, it stands for:

**YAML Ain't Markup Language**

although it started as

**Yet Another Markup Language**

YAML is an agnostic language which means that it can be used in combination with any language you are using.

One our case now, a `docker-compose` `.yml` file is a text file which contains guidelines

used by docker on how to assemble an image which will be used later for containers.

It doesn't feel really easy to grasp it? right? yeap...


In our example now, lets add inside the `docker-compose.yml` file:
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
Let's break `docker-compose` in pieces:

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
It helps thinking as host your computer. Meaning the entity which provides the area for another entity to live inside it.
So your computer is the host and the container, is another small entity inside your computer, the guest.
Both should communicate through that ports. Guest would talk to 3030 port and host would hear in 3030 port for whatever the guest talked about.
Same for vice versa.
I know this will seem as an oversimplification, it helps me understand
the different between these 2 entities thought - host and guest.

`container_name: my_app`  
The container name at the time it was started

`restart: unless-stopped`  
This one is similar to "always", except that when the container is stopped (manually or otherwise), it is not restarted even after Docker daemon restarts.

`env_file: .env`
You can pass multiple environment variables from an external file through to a service’s containers with the ‘env_file’ option,

just like with typing `docker run --env-file=FILE ...`  

```
volumes:
  - ./:/src/
working_dir: /src/
```  
What are volumes?

Volumes, on the other hand, are physical areas of disk space shared between the host and a container, or even between containers. In other words, a volume is a shared directory in the host, visible from some or all containers.


Now try typing

`docker-compose up -d --force-recreate`

You might encounter an error telling you that you already have a container running with that name.

In this case type `docker ps` to list all your running containers.

(Check the **dockerize** document for more commands => [Dockerizing it](dockerizing.md))

Find your container's id and type `docker stop <container-id>` to stop it.

Then you will need to remove your container by typing 

`docker rm <container id>`

If everything work as expected by re-typing

`docker-compose up -d --force-recreate` you will see the following message:

```
Creating my_app ... done
```

Now that your container is up and running type `docker exec -it my_app ash` and get inside!

We did it!!!!

_Hints_

- `exit` will get you out of the container
- `docker-compose down` will close your containers
- `docker-compose restart` will close and restart your container, but it will keep your command history :sunglasses:
