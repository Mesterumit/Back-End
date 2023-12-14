
<center><img src="cohort_007.jpg"  alt="Clarusway" width="600"/></center>
<br>

<center><h1> Django Class Notes</h1></center>
<p>Clarusway<img align="right"
  src="https://secure.meetupstatic.com/photos/event/3/1/b/9/600_488352729.jpeg"  width="15px"></p>
<br>


# Docker for Developers

### Needs
- Node.js
- Npm
- Docker Desktop
- Docker Hub account

<br>

## Server Systems

- **Physical Servers (BareMetal Servers):**
  - Computers with high hardware specifications, specialized processors, and operating systems.
  - Installation: Complex
  - Data Transfer: Difficult
  - Cost: High
  - Dedicated Servers
- **Virtual Servers (VMs: Virtual Machines):**
  - Multiple virtual machines within a physical machine.
  - Installation: Moderate (iso image)
  - Data Transfer: Moderate
  - Cost: Moderate
  - Transition from one machine to another is challenging.
  - Hypervisor software -> [vmware.com](https://www.vmware.com/)
  - VPS (Virtual Private Server), VDS (Virtual Dedicated Server)
- **Containers:**
  - Multiple containers within a physical/virtual machine.
  - Installation: Easy (docker image)
  - Data Transfer: Easy
  - Cost: Low
  - Manage all containers from the same environment.
  - Microservice architecture.
  - Container software -> [docker.com](https://www.docker.com/)

## Fundamental Information

- IP and Port:
  - Default ports: 80, 443 -> [List of TCP and UDP Port Numbers](https://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers)
  - http -> 80 * [http://clarusway.com](http://clarusway.com/) == [http://clarusway.com:80](http://clarusway.com/)
  - https -> 443 * [https://clarusway.com](https://clarusway.com/) == [https://clarusway.com:443](https://clarusway.com/) (requires SSL)

## What is Docker?

Developers often face the challenge of ensuring that their project works seamlessly on different machines. Docker addresses this challenge by providing a platform for automating the deployment of applications in lightweight, portable containers.

- Docker creates containers.
- Containers are similar to virtual machines or instances, but they can share system resources, unlike VMs.
- One process per Docker container.
- **Containerization Technology:**
  - Docker is a platform that enables developers to automate the deployment of applications in lightweight, portable containers.
- **Isolation:**
  - Containers provide a way to package applications and their dependencies, ensuring consistency across different environments.
- **Build:**
  - Docker builds images from a `Dockerfile` and a `context`.
  - The build's context includes the set of files in the specified PATH or URL.
  - Docker Hub is a repository for sharing and distributing Docker images.
- **Share:**
  - Docker Hub provides a cloud-based registry for sharing and distributing container images.
  - Docker images can be pushed to Docker Hub for sharing and deployment.
- **Run:**
  - Docker facilitates efficient development by leveraging Docker images to create applications on any operating system.
  - Multi-container applications can be created using Docker Compose.

### Docker Desktop

[Docker Desktop](https://docs.docker.com/desktop/) is an application that simplifies the development of containerized applications and microservices. It is compatible with Mac, Linux, and Windows environments.

- Docker Desktop provides a graphical user interface and command-line tools.
- It enables building and sharing containerized applications.

Now, start Docker Desktop to work on Docker. See the features.

### Basic Docker Commands

We do not have to memorize Docker commands. Here is a simple [cheat sheet](https://docs.docker.com/get-started/docker_cheatsheet.pdf).

- **Basic Commands:**

```bash
$ docker --version
$ docker version

$ docker info

$ docker --help
$ docker help
$ docker build --help

$ docker search <imagename> # search on dockerhub
```

- **Container Lifecycle:** 
  - `docker run`: Create and start a container.
  - `docker stop`: Stop a running container.
  - `docker start`: Start a stopped container.
  - `docker rm`: Remove a container.
  - `docker ps`: List running containers.
  - `docker ps -a`: List all containers.
- **Image Lifecycle:**
  - `docker images`: List available images.
  - `docker rmi`: Remove an image.
  - `docker pull`: Download an image from Docker Hub.

For detailed command options, visit the [Docker CLI guide](https://docs.docker.com/engine/reference/commandline/cli/). 

## Docker Hub

[Docker Hub](https://www.docker.com/products/docker-hub/#:~:text=Docker%20Hub%20is%20a%20hosted,push%20them%20to%20Docker%20Hub) is the world’s largest repository of container images with an array of content sources including container community developers, open source projects and independent software vendors (ISV) building and distributing their code in containers. Users get access to free public repositories for storing and sharing images or can choose subscription plan for private repos.

- A cloud-based registry for sharing and distributing container images.
- Store and retrieve Docker images to streamline collaboration.

Docker Hub is a hosted repository service provided by Docker for finding and sharing container images with your team.

Key features include:
- Private Repositories: Push and pull container images.
- Automated Builds: Automatically build container images from GitHub and Bitbucket and push them to Docker Hub.
- Teams & Organizations: Manage access to private repositories.
- Official Images: Pull and use container images provided by Docker.
- Publisher Images: Pull and use container images provided by external vendors. Certified images also include support and guarantee compatibility with Docker Enterprise.
- Webhooks: Trigger actions after a successful push to a repository to integrate Docker Hub with other services.

## Dockerize a Simple Node.js App

- Docker operations are generally three stages. 
  - Build image from a Dockerfile,
  - Push image to registry for future uses,
  - Run image to create container.
- Let's dockerize our Nodejs project.

#### Project Folder SetUp

- Create a working directory named `project`. 
- Create a `hello.js` file inside project folder and add below code in it.

```js
console.log("Hello Docker!")
```

#### Dockerfile

- Create a new file and name it as `Dockerfile`

```dockerfile
# INSTRUCTION arguments

# The FROM instruction initializes a new build stage and sets 
# the Base Image for subsequent instructions. As such, a valid 
# Dockerfile must start with a FROM instruction.

# Select a base image which suits your usecase
# Consider using smallest image possible. But there
# are other considerations like security and packages.
FROM node:20.9.0-alpine

# The WORKDIR instruction sets the working directory for any RUN, CMD, 
# ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile. 
# If the WORKDIR doesn’t exist, it will be created even if it’s not used 
# in any subsequent Dockerfile instruction.
WORKDIR /app


# The COPY instruction copies new files or directories from <src> and adds 
# them to the filesystem of the container at the path <dest>.

# Docker checks if layers can be reused, if it finds that there are 
# no changes to the requirements.txt file, it will jump straight 
# to the COPY instruction, which will be resolved in a matter of seconds. 
# With this tiny change, we speed up a lot the build process: No more 
# waiting for minutes between builds each time that we modify something 
# in our code.

# Copy all the working directory to the container. Optionally a
# `.dockerignore` file can be used not to copy unrelated things
# to the continer and keep it smaller in size and less vulnerable.
COPY hello.js /app
# COPY . /app
# COPY . .

# The main purpose of a CMD is to provide defaults for an executing 
# container. There can only be one CMD instruction in a Dockerfile. 
# If you list more than one CMD then only the last CMD will take effect.

CMD node hello.js
```

- Open Docker Desktop tool before executing any docker operation. This tool is using Docker deamon and having a nice user interface enables us to do our task easily.

#### Build

```dockerfile
# Build the Docker image in the current directory.
# `docker build .`: This command builds a Docker image from the current directory. The `.` represents the build context, which includes the files needed for the image.
$ docker build .

# Build the Docker image and give it a name.
# `docker build . --tag <imagename>` or `docker build . -t <imagename>`: Tags the built image with the specified name `<imagename>`.
$ docker build . --tag <imagename>
$ docker build . -t <imagename>

# Build the Docker image with a specific version or tag.
# `docker build . -t <imagename>:v2` or `docker build . -t <imagename>:v2 --no-cache`: Tags the image with a version (`v2`) and optionally disables caching during the build.
$ docker build . -t <imagename>:v2
$ docker build . -t <imagename>:v2 --no-cache

# List Docker images.
# `docker image ls` or `docker images`: Lists Docker images on the local machine.
$ docker image ls
$ docker images

# we can see the details of this image ( Like id sha, tags, environment variables, OS configuration, volumes etc. ) with the command;

$ docker inspect <image id>

# Remove a Docker image.
# `docker rmi <imagename>` or `docker rmi <imagename> -f`: Removes a Docker image. The `-f` flag forces removal.

$ docker rmi <imagename>
$ docker rmi <imagename> -f

# Remove unused Docker images.
# `docker image prune -f -a`: Removes unused Docker images. The `-f` flag forces removal without confirmation.
$ docker image prune -f -a

# Add or change the tag of a Docker image.
# `docker tag <imagename> <newimagename>`: Adds or changes the tag of a Docker image.
$ docker tag <imagename> <newimagename>

# Run a Docker container from an image.
# `docker run <imagename>`: Runs a Docker container from the specified image.
$ docker run <imagename>

# Run a Docker container from an image with a specified name.
# `docker run --name <containername> <imagename>`: Runs a Docker container with a specified name.
$ docker run --name <containername> <imagename>

# List running Docker containers.
# `docker container ls` or `docker ps`: Lists running Docker containers.
$ docker container ls
$ docker ps

# List all Docker containers, including stopped ones.
# `docker container ls -a` or `docker ps -a`: Lists all Docker containers, including stopped ones.
$ docker container ls -a
$ docker ps -a

# Start or stop a Docker container.
# `docker start|stop <containername>`: Starts or stops a running Docker container.
docker start|stop <containername>

# Remove a Docker container.
# `docker rm <containername>` or `docker rm <containername> -f`: Removes a Docker container.
$ docker rm <containername>
$ docker rm <containername> -f

# Remove unused Docker containers.
# `docker container prune -f`: Removes unused Docker containers.
$ docker container prune -f

# Open an interactive shell in a Docker container.
# `docker run -it <imagename> sh`: Opens an interactive shell in a Docker container.
$ docker run -it <imagename> sh

# Exit from interactive mode.
# `exit`: Exits from interactive mode within a container.
$ exit

# For interactive processes (like a shell), you must use -i -t together.
$ docker exec [OPTIONS] CONTAINER COMMAND [ARG...]
$ docker exec -it <container_id> sh
$ docker exec -it 37b5afe65eaa sh
```

---

# Dockerize Stock App Project

## Project Folder SetUp

- Create a working directory named `stock project`. Create two folders; `backend/` and `frontend`. Copy Node.js Stock Api project inside `backend/` folder, and React Stock App project inside `frontend/` folder.

- You can copy frontend and backend folders from your repo 

- The project folder structure will be like;

```
project
├─ backend
│
└─ frontend
```

## Dockerize Node.js Express App

- Go to `backend/` folder.
- Check that you have .env file. Otherwise create .env file from .env.sample

### **.dockerignore:**

- Create a `.dockerignore` file to exclude unnecessary files from the Docker build context.
- As a first step and a best practice, create a `.dockerignore` file under backend/ folder. This file will be on the same level with the `Dockerfile` we will create on next step. 
- A standard .dockerignore file for Node applications may be;

```
.DS_Store
.git/
.sass-cache
dist
docs
logs
node_modules/
Dockerfile
.dockerignore
.gitignore
```

#### Dockerfile

- Create a new file and name it as `Dockerfile`

```dockerfile
# INSTRUCTION arguments

# Select a base image which suits your usecase
# Consider using smallest image possible. But there
# are other considerations like security and packages.
FROM node:20.9.0-alpine3.18

# The WORKDIR instruction sets the working directory for any RUN, CMD, 
# ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile. 
# If the WORKDIR doesn’t exist, it will be created even if it’s not used 
# in any subsequent Dockerfile instruction.
WORKDIR /backend

# Copy all the working directory to the container. Optionally a
# `.dockerignore` file can be used not to copy unrelated things
# to the container and keep it smaller in size and less vulnerable.
COPY . .

# RUN commands executed When image is building
RUN mkdir -p logs
RUN mkdir -p upload
RUN npm install

# CMD command is executed when container is running
# CMD npm start
CMD ["npm", "start"]

EXPOSE 8000
```

- Open Docker Desktop tool before executing any docker operation. This tool is using Docker deamon and having a nice user interface enables us to do our task easily.

### Build

- Go to your terminal

```bash
# Change directory to the /backend folder.
$ cd /backend

# Build a Docker image named 'backend' from the current directory.
$ docker build -t backend .

# Run a Docker container named 'backend', mapping port 8000 on the host to port 8000 in the container.
# This command will lock the terminal, and you won't be able to enter more commands until the container is stopped.
$ docker run -p 8000:8000 --name backend backend

# If you want to keep using the terminal, run the container in daemon mode.
$ docker run -d -p 8000:8000 --name backend backend

# List running Docker containers to check the status.
$ docker ps

# Stop the running 'backend' container.
$ docker stop backend

# Start the stopped 'backend' container.
$ docker start backend

# Open a web browser and navigate to http://localhost:8000 to access the running application.

# Note: The '-p' flag maps the specified ports, and '--name' assigns a name to the container for easier management.
# The '-d' flag runs the container in the background (daemon mode).
```

## Dockerize React App

- Go to `frontend/` folder.
- Check that you have .env file. Otherwise create .env file from .env.sample

### **.dockerignore:**

- Create a `.dockerignore` file to exclude unnecessary files from the Docker build context.

#### Dockerfile

- Create a new file and name it as `Dockerfile`

```dockerfile
FROM node:20.9.0-alpine3.18

WORKDIR /frontend

COPY . .

RUN npm i -g pnpm
RUN pnpm i

CMD ["npm", "start"]
EXPOSE 5173
```

- Open Docker Desktop tool before executing any docker operation. This tool is using Docker deamon and having a nice user interface enables us to do our task easily.

### Build

- Go to your terminal

```bash
$ cd /frontend
$ docker build -t frontend .
$ docker run -d -p 5173:5173 --name frontend frontend
$ docker ps

# Browser: http://localhost:5173
```

-----



# Docker Compose

Compose is a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration.

Compose has commands for managing the whole lifecycle of your application:

  - Start, stop, and rebuild services,
  - View the status of running services,
  - Stream the log output of running services,
  - Run a one-off command on a service.

- The key features of Compose that make it effective are:

  - Have multiple isolated environments on a single host,
  - Preserves volume data when containers are created,
  - Only recreate containers that have changed,
  - Supports variables and moving a composition between environments.

- Compose specification concepts with a concrete example application is in the [documentation](https://docs.docker.com/compose/compose-file/#illustrative-example).

### Preperation

- **Update .env file related  MONGODB**
```
MONGODB=mongodb://mongodb:27017/stockAPI
```

### docker-compose file

- Create a `docker-compose.yml` file under main directory at the same level with backend/ and frontend/;
```yml
# On the top line we set the most recent version of Docker Compose 
# which is currently 3.9
version: '3.9'

# Top level elements: version, services, network, volumes, configs, secrets.

# Computing components of an application are defined as Services. 
# Specify which services (or containers) we want to have running 
# within our Docker host.
services:

  frontend:
    # image: frontend
    # build: ./frontend
    build:
      context: ./frontend
    restart: on-failure
    ports:
      - '80:5173'
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
    ports:
      - '8000:8000'
    restart: on-failure
    depends_on:
      - mongodb
    volumes:
      # The volumes mount automatically syncs the Docker filesystem 
      # with our local computer's filesystem. This if we make a change 
      # to the code within Docker it will automatically be synced with 
      # the local filesystem.
      - $PWD/backend/logs:/backend/logs
      - $PWD/backend/upload:/backend/upload
      
  mongodb:
    image: 'mongo:latest'
    restart: on-failure
    ports:
      - '27017:27017'
```

- To understand the terminology, look at [documentation](https://docs.docker.com/compose/compose-file/compose-file-v3/).


### Build

Build the declared images and create containers with a single command;
```
docker-compose up
docker-compose up -d --build
```

- To see error messages look at logs in a container;
```
docker-compose logs backed
docker-compose logs frontend
docker-compose logs mongo
```

### Cleanup

- To clean up infrastructure created by docker compose, including volumes;
```
docker-compose down -v
```

- To remove all stopped containers, all unused networks, all images without at least one container associated to them, all build cache use the command below;
```docker
docker system prune -a
```



----



# Dockerhub - Share

- To see how to manage Docker Hub repos see [documentation](https://docs.docker.com/docker-hub/repos/).

- To push an image to Docker Hub first login Docker Hub using your terminal;

```docker
docker login
```

- The prompt will ask for username and password of your Docker Hub account. Enter them correctly.

- The standard format of our image is `docker push <hub-user>/<repo-name>:<tag>`. So we have to tag our current image.

```docker
# docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]
docker tag django-backend stefanorafe/django-backend:v0.1
```

- Ready to push our image;

```
docker push stefanorafe/django-backend:v0.1
```



## Docker Best practices

- Use explicit and deterministic Docker base image tags for containerized Python applications.
- Separate dependencies from source code.
- Use Python WSGI for production.
- Run containers with least possible privilege (and never as root).
- Handle unhealthy states of your application. 
- Find and fix security vulnerabilities in your Python Docker application image.
- Use linting tools to check your code before consuming unnecessary resources


## Next Steps

- [Deployment Checklist](https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/#run-manage-py-check-deploy) on Django documentation

- Using Kubernetes to orchestrate your cluster
