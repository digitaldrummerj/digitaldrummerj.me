---
categories:
- docker
date: 2016-05-31T00:00:00Z
excerpt: "After seeing a Docker presentation recently I decided to finally figure
  out how to get Docker working correctly on Windows.  Luckily it worked out of the
  box fairly well but I did run into issues with Windows file path lengths and proxy
  issues.  This series of article will documented how I got Docker working and overcame
  those issues.  \n\nTo get started, you will need the docker toolkit.  I followed
  the instructions on the Docker website to get the Docker Toolkit with Virtualbox
  installed.  The instructions for Windows are at [https://docs.docker.com/windows/](https://docs.docker.com/windows/).
  \ The instructions also have links to the Linux and Mac instructions.  As I am a
  Windows user, I can only verify that this tutorial all worked under Windows.  \n\nOnce
  you get the Docker toolkit installed you are probably wondering now what do I do.
  \ On the desktop, it installed a shortcut to the \"Docker Quickstart Terminal\".
  \ This terminal will ensure that you have the base image that Docker uses for Virtualbox
  on Windows and you can run all of the Docker commands from this terminal.\n\nLets
  take a look at a few examples to get us started.\n"
published: true
series: ["docker-toolkit-windows"]
title: Docker - Getting Started On Windows

---

After seeing a Docker presentation recently I decided to finally figure out how to get Docker working correctly on Windows.  Luckily it worked out of the box fairly well but I did run into issues with Windows file path lengths and proxy issues.  This series of article will documented how I got Docker working and overcame those issues.

To get started, you will need the docker toolkit.  I followed the instructions on the Docker website to get the Docker Toolkit with Virtualbox installed.  The instructions for Windows are at [https://docs.docker.com/windows/](https://docs.docker.com/windows/).  The instructions also have links to the Linux and Mac instructions.  As I am a Windows user, I can only verify that this tutorial all worked under Windows.  

Once you get the Docker toolkit installed you are probably wondering now what do I do.  On the desktop, it installed a shortcut to the "Docker Quickstart Terminal".  This terminal will ensure that you have the base image that Docker uses for Virtualbox on Windows and you can run all of the Docker commands from this terminal.  

The reason that we need Virtualbox is because Windows does not yet natively support Docker containers.  All of the containers run within a Linux virtual machine that Docker is using.  

Below are a few examples to help get you started with usage of Docker.  

## Example 1: Basic Hello World

This will download the hello-world image if it is not already one your machine.  Then is will create a container, run hello-world and finally remove the container (--rm).

     docker run --rm  hello-world

## Example 2: nginx

This example will start up an nginx web server.

When you run the docker run command, it will pull down the nginx image if you do not already have it, the -d will leave the container running in the background, and the -p will set port forwarding of port 8000 to port 80 in the container.

     docker run -d -p 8000:80 nginx

Once the nginx container is up and running we can see that it is running with

     docker ps

To connect to the nginx web page, we need to know the ip address of the docker machine.  

     docker-machine ip


In my case it is 192.168.99.100.  To navigate to the web page, open up a browser and navigate to http://192.168.99.100:8000/

Since the container is running behind the scenes, to stop the container you need to issues the

     docker stop command. 

     docker stop [Container ID from docker ps command]
     
## Example 3: Ubuntu Bash Shell

This example will download the ubuntu docker image and start up an interactive bash shell that will allow you to make changes to the image.


     docker run -it ubuntu bash

> If you want to interact with files on the host system you can do this as long as they are in the c:\Users directory.  Docker auto mounts this directory for you.  In a future post will cover the ins and outs of mounting other directories.
{:.warning}

> Also, in a future post, we will cover how to save the change made to a container to a new image that you can use as the base for future containers.

## Finding Additional Docker Images

So far we have used a few basic images but there are many more Docker images available in the Docker Hub at [http://hub.docker.com](http://hub.docker.com).  The Docker Hub host a number of common containers that you might use for your application such as node, mysql, postgres, couchbase, plus many more.   

Once you find an image that you want to get run

     $ docker pull [Image Name]

If you want to pull only a specific version of any image which is common with the nodejs so that you can get the version of node that you need versus the latest version of node, run the following

     $ docker pull [image name]:[tag or version]               
     
## Common Docker Commands

Below is a list of common commands that you will get you started using Docker.   

**List Docker Images**

     $ docker images

**Get Docker image from Docker Hub**

     $ docker pull [image name]
     
**Get Docker Image from at specific version**

     $ docker pull [image name]:[tag or version]               
                
**Update an existing image**

     $ docker pull [image name]
          
**list of running containers**

     $ docker ps

**Seeing Existing Containers**

     $ docker ps -a
     
**See last nth Container Created**

     $ docker ps -n=1
     
>Will pull last container created.  -n says how many back to pull
     
**Connect to Existing Container**

     $ docker start -i [Container ID]

>-i connects to the standard in/out.  

**Delete image**

     $ docker rmi [image id]

>It will warn you if you have a container based on the image
{:.warning}
          
**Delete container**

     $ docker rm [container id]       

## Wrap-up

Docker is a powerful tool to have in your arsenal.  Once you get it working on Windows, you will never install services that can run within Docker locally again.  With Docker you can run light-weight containers for services such as mysql, postgres, mongodb, redis, node, plus many more.  

This is the first of several post on using Docker.  In future post we will cover mounting additional directories, saving changes to a container into an image, saving our image to the Docker Hub and creating our own Docker image from scratch.  
