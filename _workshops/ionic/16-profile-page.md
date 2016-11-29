---
collection: workshops
title: 'Lab 16: Profile Page'
published: true
type: ionic
layout: workshoppost2
order: 16
lab: ionic
length: 30 minutes
date: 2016-05-16
todo: |
    * {:.done} update objectives
    * {:.done} update wrap up
    * {:.done} update length
    * {:.done} write lab
    * {:.done} update imagedir
    * Custom Item Divider Styles.  Matches positive

            .custom-item-divider.item-divider {
              background-color: #387ef5;
              color: white !important;
            }

---

{% assign imagedir = "../images/profile-page/" %}

{:.fake-h2}
Objective

So far there is no way to logout of our application except to clear the token from local storage which is not something a user would have access to do on a device.

Instead we are going to implement a profile page that shows the user's information and has a logout button.  When the user logs out it will clear their token and redirect them to the login page.

Key Concepts:

* Logging out and redirecting to login page
* Introduction to Ionic Cards style

{:.fake-h2}
Table of Contents

* TOC
{:toc}


## 16.0:  Get User Details from Back&

For the profile page we are going to use the `LoginService` to get the user's information like first name, last name, and email.  The password will not be a field that comes back to us from Back&.

1. Open the www/js/services/login.service.js file
1. Add a new function called `getUserDetails` that takes no parameters

        function getUserDetails() {

        }

1. Inside the `getUserDetail` function we want to call the `Backand.getUserDetails`

        function getUserDetails() {
           return Backand.getUserDetails().then(function (response) {
              return response;
            });
        }

1. We need to expose the `getUserDetails` function to the service

        var service = {
            ....
            getUserDetails: getUserDetails,
        };

## 16.1: Adding Profile Controller

1.  In www/js/controllers directory create a file called `profile.controller.js`
1. Use the `ng1controller` snippet to generate the controller code
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Controller: ProfileController
        * dependency1: LoginService
1. Press Esc or Enter to exit the snippet
1. Add the call to the `LoginService.getUserDetails` in the activate function

            LoginService.getUserDetails().then(function(response){
                vm.details = response;
            });

1. Make sure to add the controller js file reference to the index.html page


Now we are finally ready to create the UI and test it out.

## 16.3: Creating the Profile UI

1. In the www/templates directory, created a file called profile.html
1. In the profile.html file, use the `i1_view` snippet to generate the view boilerplate code and set the view-title to "Me"
1. Press Esc or Enter to exit the snippet
1. To the `ion-content` we want to add the css class `padding`
1. Inside of `ion-content` add the following html so that we can then style up a decent looking profile page.

{% highlight html %}
{% raw %}
<div class="list card" id="profile">
  <div class="item item-divider" id="name">
    {{vm.details.fullName}}
  </div>

  <div class="item item-text-wrap">
    <p id="description">{{vm.details.username}}</p>
    </p>
  </div>

</div>
{% endraw %}
{% endhighlight %}

## 16.4: Adding the route

1. Open the www/js/config/app.config.js
1. We need to add in the `profile` route

        .state('profile', {
              url: '/profile',
              templateUrl: 'templates/profile.html',
              controller: 'ProfileController as vm'
        })

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, open [http://localhost:8100/#/profile](http://localhost:8100/#/profile) you will be able to view the profile page.  If you get redirected to the login page, login and then manually change the url to the profile page.

Right now our page looks pretty plan.  After we add the logout button we will give it a little bit of style.

## 16.6: Adding Logout Button

The main purpose of having our logout page in to be able to allow users to logout.  You could also use it as the place where they could change their password if not using a social provider.

1. Open the www/js/services/login.service.js
1. Add a `signout` function that will call the `Backand.signout` function

       function signout() {
          return Backand.signout();
       };

1. Make sure to expose the `signout` function to the service

            var service = {
              .....
              signout: signout
            };

Now we need to add a `signout` function to the `ProfileController`

1. Open the www/js/controllers/profile.controller.js
1. Add a `signout` function that takes no parameters and calls the `LoginService.signout` function

        function signout() {
            LoginService.signout();
        }

1. Make sure to expose it to the view

        vm.signout = signout;


Now time to add the logout button onto the UI

1. Open the www/templates/profile.html page
1. Add the logout button that calls the vm.signout function.  Add it after the username tag like so.

{% highlight html %}
{% raw %}
....
<p id="description">{{vm.details.username}}</p>

<p><button id="logout-button" class="button button-positive ion-locked" ng-click="vm.signout()"> Logout </button>
....
{% endraw %}
{% endhighlight %}

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, open [http://localhost:8100/#/profile](http://localhost:8100/#/profile), click the signout button and then check the Back& tokens in the Chrome Dev Tools -> Resources -> Local Storage you will see that they can removed.  However, we didn't redirect the user to the login page like you were most likely expecting it to.  To do the redirect, we need to respond to the `BackandSignOut` event.
1. Open the www/js/app.js file
1. In the run function we need to add the event handle to capture the `BackandSignOut` event.

          $rootScope.$on('BackandSignOut', function () {
            $state.go('login');
          });
1. Now when you click on the `logout` button, it will redirect you to the login page.

The last thing we are going to do with the profile page is to make it look a little bit nicer.

## 16.5: Styling the Page

Right now the page looks rather plain and more like a list then a profile page.  To fix this we are going to add a few styles to center the text and change some of the font sizes.

1. Open the www/css/style.css file
1. Add the following css to the bottom of the file

        #profile {
          text-align: center;
        }

        #profile #name {
          font-size: 26px;
        }

        #profile #description {
            font-size: 15px;
             }

        #profile #logout-button {
          margin: 20px;
        }

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, open [http://localhost:8100/#/profile](http://localhost:8100/#/profile) you can see the styled page.

## Wrap-up

The ionic cards are a pretty cool feature and a UI element that many web sites are using.  Having it built-in means that we don't have to worry about writing all of the CSS to make it look correct on all of the devices.