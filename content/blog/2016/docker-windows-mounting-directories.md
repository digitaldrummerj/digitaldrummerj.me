---
categories:
- docker
date: 2016-06-03T00:00:00Z
excerpt: "In the [previous Docker tutorial](../docker-on-windows-getting-started/)
  we learned how to install Docker and get our first container running.  In this tutorial
  we are going to learn how to mount additional directories within our Docker container
  that are outside of the c:\\Users directory.  By default, Docker only mounts the
  Users folder (c:\\Users) inside the docker machine and containers.  For myself,
  I have all of my project files two places: c:\\projects and c:\\personal.  I didn't
  want to change my standard configuration just for Docker.  Luckily, it is really
  easy to mount additional directories.    \n\nTo mount additional directories, you
  need to add the directory as a shared folder within Virtualbox and then enable long
  file paths and symlinks.  Once the Virtualbox shared folders are setup, you need
  to mount the directories within the docker machine so that they are available to
  the containers.  \n"
published: true
series: ["docker-toolkit-windows"]
title: Docker - Mounting Windows Directories in Containers

---

In the [previous tutorial](../docker-on-windows-getting-started/) we learned how to install Docker and get our first container running.  In this tutorial we are going to learn how to mount additional directories within our Docker container that are outside of the c:\Users directory.  By default, Docker only mounts the c:\Users directory inside the docker machine and containers.  For myself, I have all of my project files two places: c:\projects and c:\personal.  I didn't want to change my standard configuration just for Docker.  Luckily, it is really easy to mount additional directories.    

To mount additional directories, you need to add the directory as a shared folder within Virtualbox and then enable long file paths and symlinks.  Once the Virtualbox shared folders are setup, you need to mount the directories within the docker machine so that they are available to the containers.

## Step 1: Adding Shared Folders

The first step is to add the directories as Virtualbox shared folders by using  the VBoxManage.exe utility that comes with Virtualbox.  VBoxManage.exe is located in your Virtualbox install directory, which by default is C:\Program Files\Oracle\VirtualBox.

{{< blockquote class="warning" >}}
**Warning:** To make symlinks works when you start up the docker-machine, you need to run the Docker Quickstart Terminal or Command Line as an administrator.  This is a security limitation of Windows for symlinks.
{{</blockquote>}}

Before adding the shared folders, we need to make sure that no docker machines are running.  We are going to check for running docker containers and machines as both a  non-admin and admin.

**Non-Admin Checking For Running Machines**

Launch the Windows Command Prompt and run 

    $ docker-machine ls

If any machines comes back with the state of running, you will need to stop the machine.


1. Before stopping the machine you will want to make sure that your containers are stopped.    

        $ docker ps 

1. For any containers that are returned you can stop them by running

        $ docker stop [Container ID]

1. Once all of the containers are stop, you can stop the docker machine. Replace the "[machine name]" with you machine name that we returned from the docker-machine ls command.   Typically you will only have 1 machine and it will be named  default

        $ docker-machine stop [machine name]           

**Admin Checking For Running Machines**
          
1. Open the Windows Command Prompt as an administrator.
     * Start Menu
     * Search for command prompt
     * Right-click on the Command Prompt and select Run as Administrator
1. To check if any docker machines are running, run the command:

        $ docker-machine ls

If any machines comes back with the state running, you will need to stop the machine.  

1. Before stopping the machine you will want to make sure that your containers are stopped.    

        $ docker ps

1. For any containers that are returned you can stop them by running

        $ docker stop [Container ID]

1. Once all of the containers are stop, you can stop the docker machine. Replace the "[machine name]" with you machine name that we returned from the docker-machine ls command.   Typically you will only have 1 machine and it will be named  default

        $ docker-machine stop [machine name]

We are now ready to add in our shared folders.

1. Navigate to the Virtualbox directory.

        $ cd "c:\Program Files\Oracle\Virtualbox"

1. Run the following command to add the shared folders.  For your shared folders, replace the projects or personal name in the name and hostpath options.

        $ VBoxManage.exe sharedfolder add default --name "c/projects" --hostpath "\\?\c:\projects" --automount
        $ VBoxManage.exe sharedfolder add default --name "c/personal" --hostpath "\\?\c:\personal" --automount

{{< blockquote class="warning" >}}
The \\?\ in the hostpath tells Windows to enable long file paths.
{{</blockquote>}}

## Step 2: Allow Long Paths and Symlinks

If you are using node many of the modules will create symlinks which are supported under Virtualbox but you need to make a configuration change to enable them.
 
     $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/v-root 1

Next you need to enable symlinks for each of the shared folders.  Replace SharedFolderName with the --name value that you used when creating the sharedfolder.  

    $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/c/personal 1

    $ VBoxManage.exe setextradata default VBoxInternal2/SharedFoldersEnableSymlinksCreate/c/projects 1

## Step 3: Mounting Shared Folders in Docker

{{< blockquote class="warning" >}}
**Warning:** To make symlinks works when you start up the docker-machine, you need to run the Docker Quickstart Terminal as an administrator.  This is a security limitation of Windows for symlinks.  Right-click on the Docker Quickstart Terminal and select Run As Administrator. 
{{</blockquote>}}

Unfortunately even with auto-mount Docker will only mount the c/Users folder in the docker-machine.  If you want the folders to auto-mount you will need to manually mount them each time you start up the default docker machine. 

1. Open the Docker Quickstart Terminal as an administrator
    * Start Menu
    * Search for Docker Quickstart Terminal
    * Right-click on the Docker Quickstart Terminal and select "Run as Administrator"    
    
1. In order to mount the directories we need to ssh into the docker machine

        $ docker-machine ssh default
        
1. Once you have ssh'ed into the docker machine run the following commands to mount the shared folders we created.
	
          $ sudo mkdir --parents /c/projects
          $ sudo mount -t vboxsf c/projects /c/projects/

          $ sudo mkdir --parents /c/personal
          $ sudo mount -t vboxsf c/personal /c/personal/
          
1. Within the docker machine you should now be able to see the files and directories in /c/projects and c/personal
 
        $ ls /c/projects
        $ ls /c/personal

1. exit the ssh session
1. You are now ready to start up or create your containers 
	

## Step 4: Using the Shared Folders

Now that the shared folders are mounted in the docker machine to use them from a container -v argument.  The command below will mount the local directory c:\projects (in unix form /c/projects) to /projects within the container.  The -it say run interactively, ubuntu is the image name and bash is the type of interactive shell

     $ docker run -v /c/projects:/projects -it ubuntu bash

From the container, you can look at the projects directory by running

     $ ls /projects

You are now ready to start using the container for your development work.  In the next tutorial we will look at running docker containers in the background for processes like mysql and postgres.  
