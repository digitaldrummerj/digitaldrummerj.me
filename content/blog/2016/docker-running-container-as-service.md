---
categories:
- docker
date: 2016-06-15T00:00:00Z
excerpt: |
  In the [previous tutorial](../docker-windows-mounting-directories/) we learned how to mount additional directories within the Docker containers.  In this tutorial we are going to learn how to run a Docker container as a service a.k.a daemon for nginx and mysql.

  To run a Docker container as a daemon, we run it with the -d flag.  This will tell Docker to start up the container in the background and return back to the command prompt.
published: true
series: ["docker-toolkit-windows"]
title: Docker - Running Container As a Service

---

In the [previous tutorial](../docker-windows-mounting-directories/) we learned how to mount additional directories within the Docker containers.  In this tutorial we are going to learn how to run a Docker container as a service a.k.a daemon for nginx and mysql.

To run a Docker container as a daemon, we run it with the -d flag.  This will tell Docker to start up the container in the background and return back to the command prompt.

### nginx

The Docker Hub image for run an nginx server, is called nginx.  If you do not already have the nginx image the run command will download it from the Docker hub.  To start the nginx container run:

     docker run -d -p 8000:80 nginx

* -d: runs container in the background
* -p: set the port to forward to.

Once the nginx container is up and running, we can verify it is running by executing

     docker ps

>To see all of the containers even if they are not running execute add a `-a` 

To connect to the nginx web page, we need to know the ip address of the docker machine.  

     docker-machine ip

>In my case it is 192.168.99.100.  To navigate to the web page, open up a browser and navigate to http://192.168.99.100:8000/.

If you need to to attach to a shell within the running container, run

    docker attach [container id]

>If docker attach never connects, run docker exec -i -t [container id] /bin/bash
{:.warning}

If you need to stop the container, run

    docker stop [container id]

You can verify it stopped by running

    docker ps -a

If you are done with the container and ready to delete it, run

    docker rm  [container id]

### MySQL Sample

This example will download the mysql image, create a mysql database and expose it to your local machine to interact with.

```shell
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_USER=mysql_user -e MYSQL_PASSWORD=mysql_user1 -e MYSQL_DATABASE=mysql_test -p 3306:3306 -d mysql
```

* --name: is the name to give the container
* -e: sets environment variables
* -d: runs container in the background
* -p: set the port to forward to.

Once the MySql container is up and running we can see that it is running with

     docker ps

>To see all of the containers even if they are not running execute add a `-a`     

To connect to the MySql database, we need to know the ip address of the docker machine   

     docker-machine ip

Then we need to install MySql Workbench from [https://www.mysql.com/products/workbench/](https://www.mysql.com/products/workbench/) to connect to the database to interact with the database.

If you need to to attach to a shell within the running container, run

    docker attach [container id]  

>If docker attach never connects, run docker exec -i -t [container id] /bin/bash
{:.warning}

If you need to stop the container, run 

    docker stop [container id]
    
You can verify it stopped by running

    docker ps -a

If you are done with the container and ready to delete it, run

    docker rm  [container id]

>WARNING: This will delete any data that you added to the database
{:.warning}

You have learn how to run 2 different types of Docker containers as background containers.  Any Docker container can be run as a background container by using the -d when starting up the container for the first time.  
