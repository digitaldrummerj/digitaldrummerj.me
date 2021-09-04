---
categories:
- visual studio
- gulp
date: 2015-11-15T00:00:00Z
excerpt: "When I am working in an code editor such as Visual Studio, I do not want
  to have to have to leave the editor to run command line programs such as Gulp task.
  \ I want to be able to run the gulp task right from instead the editor.  Starting
  with Visual Studio 2013, you could do this with the [Task Runner Explorer extension](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708).
  \ Microsoft then integrated the Task Runner Explorer into Visual Studio 2015 so
  you no longer have to install an extension.   \n\nIn this post, we will look at
  how to run your Gulp task within Visual Studio and then how to integrate them into
  the Visual Studio build process.\n"
published: true
title: Running Gulp Task in Visual Studio

---

When I am working in an code editor such as Visual Studio, I do not want to have to have to leave the editor to run command line programs such as Gulp task.  I want to be able to run the gulp task right from instead the editor.  Starting with Visual Studio 2013, you could do this with the [Task Runner Explorer extension](https://visualstudiogallery.msdn.microsoft.com/8e1b4368-4afb-467a-bc13-9650572db708).  Microsoft then integrated the Task Runner Explorer into Visual Studio 2015 so you no longer have to install an extension.

In this post, we will look at how to run your Gulp task within Visual Studio and then how to integrate them into the Visual Studio build process.

## Code for this tutorial

The sample code for this tutorial is available at [https://github.com/digitaldrummerj/pluralsight-audition](https://github.com/digitaldrummerj/pluralsight-audition).


## Pulling up the Task Runner Explorer

You can get to the task runner explorer, by going under the View Menu, selecting Other Windows, and then selecting the Task Runner Explorer.
![Open Task Runner Explorer](/images/GulpInVisualStudio/TaskRunnerExplorer_FindInMenu.png)


When the Task Runner Explorer opens it will pull up all of the task from gulpfile.js that is in the root directory of the project.

![Task Runner Explorer Initial View](/images/GulpInVisualStudio/TaskRunnerExplorer.png)

In this case it shows the 5 task that are available in the gulpfile.js

* default
* clean
* inject
* release
* watch

## Running a Task

After the task is opened up, to run a task, right-click on it and select the run option.

![Running a Task](/images/GulpInVisualStudio/TaskRunnerExplorer_TaskRun_RightClickMenu.png)

When a task it run, it will open up a tab in the Task Runner explorer and show the results of the gulp task

For the demo, we have right-clicked on the default task and selected the run option.

![Results of Task Run](/images/GulpInVisualStudio/TaskRunnerExplorer_TaskRun.png)

## Integrating into Visual Studio Build Process

Manually running a task is nice but it is even better if you can integrate it into the Visual Studio build process.  Luckily the Task Runner Explorer, give you just that option.  If you right-click on a task and select Bindings, you can see the options.

![Task Build Options](/images/GulpInVisualStudio/TaskRunnerExplorer_BuildBindings.png)

There are 4 bindings options:

* Before Build - task will run before the Visual Studio build.
* After Build - task will run after the Visual Studio Build.
* Clean - task will run when the project is cleaned.
* Project Open - task will run when the project is opened.

For this example, we are going to set the "Before Build" binding for the default task.  Right-click on the default task, select Bindings, and then Before Build.

When you set the binding, 2 things happened in the Task Runner Explorer:

1. The default task now shows up in the Bindings tab under the Before Build secton.
1. If you right-click on the default task and select binding there will be a checkmark next to the "Before Build" to indicate that it is set for this task.

    ![Before Build Binding](/images/GulpInVisualStudio/TaskRunnerExplorer_BindingSetForBeforeBuild.png)


Also, if you open up the gulpfile.js, you will notice that the first line now has a comment with the bindings in it.

![Gulpfile with BeforeBuild set](/images/GulpInVisualStudio/TaskRunnerExplorer_GulpfileWithBeforeBuildSet.png)


## Wrap-up

Now as a Visual Studio user, you kow how to run your gulp task without leaving Visual Studio and how to integrate it into the Visual Studio build process.
