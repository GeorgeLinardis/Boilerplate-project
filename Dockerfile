# this is the version of the docker image
FROM node:latest

WORKDIR /app

COPY . /app

RUN npm install

# we need to keep a running process to keep the container alive
ENTRYPOINT ["tail", "-f", "/dev/null"]
EXPOSE 3030
