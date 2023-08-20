---
categories: ["companion", "streamdeck"]
date: 2023-08-19T13:00:00Z
published: true
title: "Setup Streamdeck With Companion Plug-in "
url: '/companion-streamdeck-plugin'
---

When using [BitFocus Companion](https://bitfocus.io/companion) and one or more [Streamdecks](https://www.elgato.com/us/en/s/welcome-to-stream-deck), you have two ways to setup Companion to interact with the Streamdecks.  

1. The first option is to use the Streamdeck natively use Companion.  For this to work you do not need to install the Streamdeck software and can not have the Streamdeck software running if you have it installed.  The major downside of this configuration is that you are not able to use any Streamdeck plug-ins and can only use what Companion offers.  The upside to this configuration is that it allows you to use multiple Streamdecks and have them work independently of each other.
1. The second option is to use the Streamdeck Companion plug-in which allows you to use Streamdeck plug-ins and requires that the Streamdeck software is installed and running.  The downside to this configuration is if you are using multiple Streamdecks then when you change the page in Companion it will change the page on all of the Streamdeck.  The upside is that all of the StreamDeck plug-ins do work.  

This article is going to focus on how you set up Companion to work with the StreamDeck Plugin.

<!--more-->

## Configuration Companion

The first thing we are going to do is configure Companion to use the Streamdeck plugin.

1. Open up your Companion Setting GUI.  Mine is at [http://localhost:8888/settings](http://localhost:8888/settings)
1. Find the Surfaces section and disable the "Enable connected Streamdecks

  ![Companion Enable connected Streamdecks Setting](/images/companion/plugin/companion-turn-on-plugin.png)

## Install Streamdeck Companion Plugin

Next we are going to install the Companion button plugin for your Streamdeck.  If you do not already have the Streamdeck software installed, you will need to download it from [https://www.elgato.com/us/en/s/downloads](https://www.elgato.com/us/en/s/downloads) and install it before you can install the Companion button plugin.

1. Once you have the software installed, open up the Streamdeck software
1. In the top right corner, you want to click on the Store icon.  It is the one with the + sign on it.

    ![Streamdeck Store Icon](/images/companion/plugin/streamdeck-store.png)

1. Once the store is open, click on the Plugins option on the left

    ![Streamdeck Store Plugins](/images/companion/plugin/streamdeck-store-plugins.png)

1. In the searchbar type, Companion and then install the Companion button plugin if it is not already installed.  

    ![Streamdeck Companion Plugin Search and Install](/images/companion/plugin/streamdeck-store-companion-plugin.png)

    {{< alert class="danger" >}}
**Note:** If the button for the plugin says uninstall then you already have it installed and can go to the next section.
    {{</alert>}}

1. If the install ask you to install the Companion profile, please install it.  

## Adding Companion Buttons to Your Streamdeck

Next, in the Streamdeck software we need to add buttons that are of Companion button that point to a specific Companion button and page within Companion.  It does not matter if you create an additional page of Companion buttons, a sub-folder of Companion buttons or a Streamdeck profile that has all of the Companion buttons, they all work the same way once you add the buttons. 

{{< alert class="success" >}}
**Note:** You will want to leave one button in Companion empty so that you can put a button on your Streamdeck that changes your Streamdeck page or profile out of your Companion profile
{{</alert>}}

1. When you install the Companion profile, if you switch to that profile, it may have all of the buttons already configured on it for you.  
1. If the Companion profile did not install or does not have all of the buttons configured for you, follow the steps below.
1. In the Streamdeck software, search for Companion in the list of possible actions.  

    ![Streamdeck Companion action search](/images/companion/plugin/streamdeck-companion-button-action.png)

1. Then drag the Companion button on to the Streamdeck in the position that you want the Companion button to show up
1. Once you have dragged the button onto the Streamdeck, you will need to set the button number that it references and the page number.  By default the page number is set to dynamic which means that you will be able to navigate to different Companion pages.  If you want to stay on a single page for that Streamdeck, then set the page number to the page that you want that Streamdeck to always stay on.

    ![Streamdeck Companion Button set button number and page number](/images/companion/plugin/streamdeck-companion-button-set-button-and-page.png)

1. Repeat the previous two steps for all of the Companion buttons that you want on your Streamdeck.

Now your Streamdeck will work with all of the Companion buttons that you have configured.  
