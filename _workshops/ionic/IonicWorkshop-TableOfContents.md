#Ionic Workshop Labs

##Workshop Feedback

**Chapters to Add**

* Add more basic information about AngularJS into it
* Talk about SASS
* Walk through the lab setup more
* Talk about Debugging an Ionic App using the Chrome Dev Tools
* Add Lab about device debugging and reloading
* Add a Lab Overview Chapter that talks about what we are going to be doing.
    * Talk about how the labs build on each other

**Presentation**

* Do a Demo at the front of the lab to show how easy it is to deploy to a device
* Talk more about Genymotion
* Talk more about the device setup
* Talk more about what Corova really provides
* Talk more about how angular/cordova/ionic all play together
* Show the finished lab so they know what they are building
* Walk everyone through getting the book from leanpub.com
* Talk about promises (what are they, why to use them, and how to use them)

**General**

* Figure out how to make them speed up the lab
* Maybe create a version of the lab for people with no angular experience or maybe just include all of the angular samples
* Give script to download all of the completed samples from the organization.
* Come with USB drives already loaded with all of the labs, pdf manual, node_modules directories, nodejs installer
* Figured out how to have an offline npm global modules for both windows and osx.
* Maybe even print out the manual for folks to have (if someone is sponsoring it)
* talk about editors that you can use
* play with VS Code on both Mac and Windows.

**Lab Feedback**

* Add overview to each section
* Move Ionic View workshop to the very end after the lab is fully working
    * Put before the resources command
    * Put before the CORS lab
* Move the gulp inject lab earlier or just include it in all of the labs and then walk through how to implement it later?
* Add troubleshooting section to the labs
    * show common errors like:
        * script file not included or spelled wrong
        * bracket not closed
        * angular js inject errors
        * npm install errors?
* Show how to turn off npm spin and add npm http logging
* Add more screenshots of setup processes?
* Explain what promises are

**George's Feedback**

*General comments

  I took the approach of "typing along" and
  each time I would check out a revision as
  shown, I would be greeted with all the things
  which I had not yet went over. We talked about
  this and you said you would try to make that
  more clear.

  Farther into the lab, I realized the benefit of
  being able to "just get the finished code". I
  still made an attempt to "type along", but I was
  unfamiliar with Angular and did have to jump
  to the finished version to see how several things
  were implemented.

*Specific Concerns

FIXED Page 10

  "buld" to "build"

FIXED Page 11

  "css    your images" -> Is this correct?

  Maybe this:
    "css   your style sheets"
    "img   your images"

Page 12

FIXED -   I noticed your section title pages do not have
  page numbers. This is likely intentional, but
  made me have to look at other pages to find that
  page 12 was page 12.

Page 13

  Is it sufficient to use:
    <ion-nav-back-button />
  Instead of this?:
    <ion-nav-back-button> </ion-nav-back-button>

  (same concept for <ion-nav-view />)

FIXED -  After running "ionic serve", I do see something
  very similar to what is shown, but the color
  behind "Contacts" is different. I wonder why this
  is? Probably not important.

Page 17

FIXED -   Step 4 of Section 4.2:
    You will need to look at the json output to find the
    properties are for the different values to bind
  I think "are" is not needed?

FIXED  The second sentence of Section 4.3:
    We are going to modify it to look at the following:
  I think "modify it to look like the following"
  may be more correct?

FIXED Lab 5 will take 30 hours!

FIXED - Page 20

  Lab 5 will take 30 hours!

FIXED - Page 21

  Example shows ',' after
    "templateUrl: 'templates/contactdetails.html'"
  However, the "finished" commit (in git) for this subsection
  does not have that comma

FIXED Page 31

  Lab 8 does not have a Length

FIXED Page 36

  Lab 9 does not have a Length

**DONE**

* Lab 3 - Dir Structure show images description for css folder and is missing img folder.
* Add bold text header for each section
    * steps - done
    * git - done
    * overview -done
* Make Git instructions clearer

##Table of Contents

1. [Lab 1: Installing the Ionic Framework](IonicWorkshop-Lab1.md)
1. [Lab 2: Creating Your First Application](IonicWorkshop-Lab2.md)
1. [Lab 3: Exploring the Project Layout](IonicWorkshop-Lab3.md)
1. [Lab 4: Adding Your First View and Service](IonicWorkshop-Lab4.md)
1. [Lab 5: Adding Contact Details Page](IonicWorkshop-Lab5.md)
1. 6[Lab 7: Styling with SASS](IonicWorkshop-Lab7.md)
1. 7[Lab 9: Changing Features based on OS](IonicWorkshop-Lab8.md)
1. 8[Lab 10: Pull to Refresh](IonicWorkshop-Lab10.md)
1. 9[Lab 11: Add Loading Spinner](IonicWorkshop-Lab11.md)
1. 10[Lab 12: Automating Adding New Javascript and Css Files to index.html](IonicWorkshop-Lab12.md)
1. 11[Lab 6: Ionic View](IonicWorkshop-Lab6.md)
1. 12[Lab 8: Resources Command](IonicWorkshop-Lab8.md)
1. [Lab 13: Avoiding the Cross Origin Resource Sharing (CORS) Issues ](IonicWorkshop-Lab13.md)      

Stuff to Add To Slides:
- Get Lib version (ionic lib)
- Update Ionic Lib (ionic lib update)
- Ionic Ion (ionic ion)
- ionic command
- ionic docs command
- ionic info command
- ionic spinner
- ionic resource command
- Docs page (maybe even a demo of the docs)

TODO Labs:
- Using Native Device Features - Either GeoLocation or Weather
- Action Sheet vs Pop Over
- (Blog) Genymotion Setup
- Settings Page
- Navigation
    - Side Menu?

Lab Ideas:
- Local Storage
- Open Auth
- Find Coffee Shops in Area
- Creating REST service
- DocumentDB
- Camera Plugin
- Gulp Minify Js
- Software Install
- Crosswalk (ionic browser add crosswalk)
- Device Debugging


OSx Setup:

* alias iws="cd ~/Documents/projects/IonicWorkshopOrganization/"
* Clone IonicWorkshopOrganization repos [https://gist.github.com/digitaldrummerj/848fc370b9975f7b654c](https://gist.github.com/digitaldrummerj/848fc370b9975f7b654c)
* npm config set spin=false
* npm config set loglevel=info

When pulling the project out fresh, need to re-add the plugins and platforms

# .bash_profile


export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.7.0_76.jdk/Contents/Home

export ANT_HOME=/Users/jpjames/Development/apache-ant-1.9.4


export PATH=${PATH}:/Users/jpjames/Library/Android/sdk/tools:/Users/jpjames/Library/Android/sdk/platform-tools:${ANT_HOME}/bin

### Added by the Heroku Toolbelt
export PATH="/usr/local/heroku/bin:$PATH"
alias gl="git log --pretty=oneline"
alias gt="git tag -l"
alias iws="cd ~/Documents/projects/IonicWorkshopOrganization/"
export PS1="\W $ "

alias lab7="iws; cd Lab7-StylingWithSASS"
alias lab4="iws; cd Lab4-AddingAView"
alias lab5="iws; cd Lab5-CreatingADetailView"
alias lab8="iws; cd Lab8-ConfiguringIconAndSplashImages"
alias lab9="iws; cd Lab9-ChangingIconsBasedOnPlatform"
alias lab10="iws; cd Lab10-PullToRefresh"
alias lab11="iws; cd Lab11-AddingALoadingSpinner"
alias lab12="iws; cd Lab12-AutomaticallyInjectFilesOnIndex"
alias lab13="iws; cd Lab13-WorkingThruCorsErrors"
alias lab13api="iws; cd Lab13-HerokuHostedApi"
