---
layout: post
title: Docker on Windows Notes
date: 2016-04-13 06:00
categories: ['docker']
published: false
excerpt: |
     After seeing a Docker presentation recently I decided to finally figure out how to get Docker working correctly on Windows.  These are my notes as I was learning to use the Docker Toolkit and Virtualbox.
---

{% assign imagedir = "/images//" | prepend: site.baseurl | prepend: site.url %}

## Docker Install

You will need the docker toolkit.  Follow the instructions at [https://docs.docker.com/mac/](https://docs.docker.com/mac/).  They have Linux and Windows instructions there as well.  I am a Windows user, so  I can verify that this all worked under Windows.

## Proxy Setup

If you are using [Proxifier](http://www.proxifier.com/) you can skip this section.  Note that the Proxifier portable setup does not work with Docker as it only works with GUI applications.

### Add proxy settings to ~/.bashrc

**Note:** This will also modify your git bash shell since it also uses the ~/.bashrc file to settings

1. Open up the Docker Quickstart Terminal

     * In order to support long file names that are common with node modules you will want to launch the Docker Quickstart Terminal as an Administrator.
     
1. Run vi ~/.bashrc and add the following lines
1. Arrow down to the end of the file and press i to enter insert mode which allows you to add text in the file.

          MY_PROXY='http://[Proxy Server]:[Proxy Port]'
          export {http,https,ftp,socks,all,npm_config,npm_config_https}_{proxy,PROXY}=$MY_PROXY
          export {HTTP,HTTPS,FTP,SOCKS,ALL}_{proxy,PROXY}=$MY_PROXY
          export {no,NO}_{proxy,PROXY}=10.0.0.0/8,192.168.0.0/16,localhost,127.0.0.0/8,134.134.0.0/16,192.168.99.100
	

1. Once you are done editing press the ESC key and then type wq to write the file and exit vi.  
1. Run the following to make the proxy settings active in the Docker Quick Start Terminal 
	
	     source ~/.bashrc
	

### Add proxy to docker default machine

> WARNING: I have seen issues with docker reverting the profile back with each default docker machine restart.

In the Docker Quickstart Terminal that you already have open run the following commands:


     docker-machine ssh default
     sudo vi /var/lib/boot2docker/profile


## Add to /var/lib/boot2docker/profile

1. Arrow down to the end of the file and press i to enter insert mode which allows you to add text in the file.

          export HTTP_PROXY=http://[Proxy Server]:[Proxy Port]
          export HTTPS_PROXY=http://[Proxy Server]:[Proxy Port]
          export NO_PROXY=10.0.0.0/8,192.168.0.0/16,localhost,127.0.0
	
1. Once you are done editing press the ESC key and then type wq to write the file and exit vi.  
1. Run the following to make the proxy settings active in the default Docker machine

          docker-machine restart default

Once the reboot is done, you will be able to communicate with the default machine.

## Examples

Below are a number of example of working with docker.  

### Example 1: Basic Hello World

This will download the hello-world image if it is not already one your machine.  Then is will create a container, run hello-world and finally remove the container.

     docker run --rm -i hello-world


###Example 2: nginx

This example will start up an nginx web server.

**Start nginx**

This pull down the nginx image if you do not already have it, the -d will leave the container running in the background, and the -p will set port forwarding of port 8000 to port 80 in the container.

     docker run -d -p 8000:80 nginx

Once the nginx container is up and running we can see that it is running with

     docker ps

To connect to the nginx web page, we need to know the ip address of the docker machine.  

     docker-machine ip


In my case it is 192.168.99.100.  To navigate to the web page, open up a browser and navigate to http://192.168.99.100:8000/

### Example 3: Ubuntu Bash Shell

This example will downloada the ubuntu docker image, start up an interactive bash shell that allow you to make changes to the image, and then it will install wget

     docker run -it ubuntu bash
     sudo http_proxy='http://[Proxy Server]:[Proxy Port]' apt-get install wget

At this point the image has not been saved and the wget install will be lost when the container is stopped.  To save the changes to the image you need to find the container ID, then call the docker commit, and finally call docker tag

This will get the container ID that we need to commit.  It will normally be the last one in the list since you just modified it.

     docker ps -a   

Next we need to take the container ID from the previous step and commit it.

     docker commit 4c20e049fbb3

Finally, we need to take the sha1 output from the commit command and tag the commit so that it becomes an image that we can reuse.

     docker tag 


### Example 4: MYSQL Sample

This example will download the mysql image, create a mysql database and expose it to your local machine to interact with.

     docker pull mysql
     docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -e MYSQL_USER=mysql_user -e MYSQL_PASSWORD=mysql_user1 -e MYSQL_DATABASE=mysql_test -p 3306:3306 -d mysql

### Example 5: Strongloop (loopback) Sample

The StrongLoop API Platform features the popular open source LoopBack framework. LoopBack enables you to quickly compose scalable APIs, runs on top of the Express web framework and conforms to the Swagger 2.0 specification.

Unfortunately, IBM does not have a Strongloop docker image.  Luckily though, the Loopback framework is just an npm package that needs to be installed globally and there is a Node docker image to build from.

First thing is to get the node image and login interactively

     docker run -it node bash

Once we are logged in with the bash shell we need to install Loopback.

     npm install -g strongloop

Once this is complete we need to commit and tag the changes like we did in Example 2 with ubuntu and wget.

     docker ps -a
     docker commit [ContainerID for Node Container we just installed Strongloop in]
     docker tag [sha1 from the commit command] [name to give image]

## Mounting Host Directories onto the Docker Container


By default Docker mounts you Users folder (c:\Users on Windows or /Users on Osx).  However,  if you want to mount additional directories you have to do a little bit of work and you need to do it from the command line.

Make sure that the docker-machine default is not running.


     $ cd "/c/Program Files/Oracle/Virtualbox"

     $ VBoxManage.exe sharedfolder add default --name "c/Users" --hostpath "\\?\c:\Users" --automount
     $ VBoxManage.exe sharedfolder add default --name "c/projects" --hostpath "\\?\c:\projects" --automount
     $ VBoxManage.exe sharedfolder add default --name "c/personal" --hostpath "\\?\c:\personal" --automount


Add the ability to allow Symlinks to each of the shared folders.

     $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root 1
     $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/c/Users 1
     $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/c/projects 1
     $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/c/personal 1

1. Open up the Virtualbox GUI
1. Find the default image for Docker, right-click on it and select Settings
1. Click on Shared Folders (it is the 2nd from last option on the left)
1. Make sure that each folder has Auto-Mount is true and Access is Full.  


Unfortunately even with auto-mount Docker will only mount the c/Users folder in the docker-machine.  If you want the folders to auto-mount you will need to manually mount them each time you start up the default docker machine. 

1. docker-machine ssh default
1. Run the following commands
	
          $ sudo mkdir --parents /c/projects
          $ sudo mount -t vboxsf c/projects //c/projects/

          $ sudo mkdir --parents /c/personal
          $ sudo mount -t vboxsf c/personal //c/personal/
          
1. You should now be able to see the files and directorys in /c/projects and c/personal
 
     $ ls /c/projects
     $ ls /c/personal

1. exit the ssh session
1. You are now ready to start up or create your containers 
	
> **Important Note:**  To make symlinks works when you start up the docker-machine, you need to run the Docker Quickstart Terminal as an administrator.  This is a security limitation of Windows that makes you run docker as an administrator.  Right-click on the Docker Quickstart Terminal and select Run As Administrator.  

Now that the shared folders are mounted, to mount a directory from within them on a container you need to use the -v argument.  The command below will mount the local directory c:\projects (in unix form /c/projects) to /c/projects within the container.  The -it say run interactively, ubuntu is the image name and bash is the type of interactive shell

     docker run -v /c/projects:/c/projects -it ubuntu bash

## Windows Users: Running Npm when files are mount from a Windows directory

Unfortunately, the Windows file system does not always play well with the Docker linux containers when running npm install due to file path length and symlink issues .  Luckily, it is fairly easy to work around these limitations.

**Note:** If you followed the instructions in the mounting host directories section, then the command below are the exact same.  
 
The first thing is to use the VBoxmanage.exe command line when creating shared folders instead of the Virtualbox UI.

Then when you create the shared folder prepend \\?\ onto the hostpath to tell Windows to enable long file paths.


     $ VBoxManage.exe sharedfolder add default --name "c/Users" --hostpath "\\?\c:\Users" --automount

Enable symlinks for v-root
  
     $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root 1

Next you need to enable symlinks for each of the shared folders.  Replace SharedFolderName with the --name value that you used when creating the sharedfolder.  

     $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/SharedFolderName] 1


> **Important Note:**  To make symlinks works when you start up the docker-machine, you need to run the Docker Quickstart Terminal as an administrator.  This is a security limitation of Windows that makes you run docker as an administrator.

## Other Useful Images

Here are some other useful images.  You can use docker pull to download the images for later use, e.g. docker pull node


* node
* postgres
* mongo
* nginx
* couchbase
* jekyll/jekyll:pages

## Update an existing image

If you have already pulled down a docker image from the Docker hub to update it just run:

     $ docker pull [image name]
     
For example to pull the node Docker image run:

     $ docker pull node     
     
## Updating All Docker Images to Latest At Once

> WARNING: Run at your own risk.  I believe this left a bunch of bogus images that I had to clean up afterwards

There is no built in way to tell docker to update all of your images at once but luckily with a few commands strung together you can do that from the docker command line.


     $ docker images | awk '(NR>1) && ($2!~/none/){print $1":"$2}' | xargs -L1 docker pull


## Alias Docker IP to Localhost

From an administrative command prompt run the following to alias the docker address of 192.168.99.100:1337 to localhost:1337


     netsh interface portproxy add v4tov4 listenport=1337 listenaddress=localhost connectport=1337 connectaddress=192.168.99.100


**To see what is setup for port proxy**


     $ netsh interface portproxy show v4tov4


**To remove port proxy**


     $ netsh interface portproxy delete v4tov4 listenport=1337 listenaddress=localhost

     
     
## Git Configurations

There are times that software I run does a Git clone.  Below are the essential configurations for Git.


     $ git config --global --add url.https://github.com.insteadof git://github.com
     $ git config --global --add core.longpaths true


If you are connecting to a Github Enterprise edition and you don't have the SSL certs on the docker container which you most likely won't then you can tell the git command line to not verify the SSL cert.


     $ git config --global --add http.sslVerify "false"



## Connect to Existing Container


     $ docker start -i [Container ID]

## Misc Commands

**delete image**

     $ docker rmi [image id]
     
**delete container**

     $ docker rm [container id]
     
**image list**

     $ docker images

**list of running containers**

     $ docker ps
     
**list of all containers regardless of state**

     $ docker ps -a
     
**get Docker image from Docker Hub**

     $ docker pull [image name]
     
**get Docker Image from at specific version**

     $ docker pull [image name]:[tag or version]               
           
           
## Windows Server 2016

**Install Docker**

Install-WindowsFeature containers
Install-WindowsFeature hyper-v
wget -uri https://aka.ms/tp5/New-ContainerHost -OutFile c:\New-ContainerHost.ps1
powershell.exe -NoProfile -ExecutionPolicy Bypass c:\New-ContainerHost.ps1 -VMName MyContainerHost -WindowsImage ServerDatacenterCore –Hyperv

Invoke-WebRequest https://aka.ms/tp5/Update-Container-Host -OutFile update-containerhost.ps1
Install-PackageProvider ContainerImage -Force
Find-ContainerImage
Install-ContainerImage -Name NanoServer -Version 10.0.14300.1010
Install-ContainerImage -Name WindowsServerCore -Version 10.0.14300.1000           

Install-ContainerImage -Name NanoServer

https://msdn.microsoft.com/virtualization/windowscontainers/quick_start/quick_start_configure_host

https://msdn.microsoft.com/virtualization/windowscontainers/quick_start/manage_docker

https://msdn.microsoft.com/en-us/virtualization/windowscontainers/management/manage_images


           