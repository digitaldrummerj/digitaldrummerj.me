---
collection: workshops
title: 'Lab 09 : Implementing User Management'
published: true
type: ionic
layout: workshoppost2
order: 9
lab: ionic
length: 45 minutes
date: 2016-05-16
todo: |
    * add the demo account username and password to use
---

{% assign imagedir = "../images/user-management/" %}

{:.fake-h2}
Objective

One of the hardest piece to figure out and get right is how to do authentication with username/password or social logins.  You want to make sure that a user cannot see data even if they navigate directly to a page instead of starting at the login page.  You also want to make sure that you validate that no authentication errors are coming back from the API calls even if they are logged in since it could be that someone deleted their account out of the API.

In this lab we are going to code up all of the functionality to implement the login and sign up pages.  By the end of the lab you will have a set of reusable code that will allow you to implement authentication in both an ionic project as well as a regular non-ionic Angular project.


|login page|signup page
|![Login Page]({{"login-page-no-error.png" | prepend: imagedir }}) |![Sign up page]({{"signup-page.png" | prepend: imagedir }})

Key Concepts

* Authentication flow for making sure a user is signed up and logged
* Inspecting Http request and response traffic

{:.fake-h2}
Table of Contents

* TOC
{:toc}

## 9.0: Creating the Signup Page

1. Download the [logo image](../files/todo_logo.png) that we will be using and save it to the directory www/img
1. In the www/templates directory create a file called signup.html
1. Set the contents of the signup.html page to:

        <ion-view view-title="Signup" hide-nav-bar="true">
          <ion-content class="padding">
            <div class="app-logo"><img src="img/todo_logo.png"></div>
            <div>
              <form name="loginForm">
                <label class="item item-input">
                        <input id="email" name="email" required type="email" placeholder="Your email" ng-model="vm.formdata.email">
                    </label>
                <label class="item item-input">
                        <input id="firstname" name="firstname" type="text" placeholder="Your first name" ng-model="vm.formdata.firstName">
                    </label>
                <label class="item item-input">
                        <input id="username" name="lastname" type="text" placeholder="Your last name" ng-model="vm.formdata.lastName">
                    </label>
                <label class="item item-input">
                        <input id="password" required name="password" type="password" placeholder="Your password" ng-model="vm.formdata.password">
                    </label>
                <label class="item item-input">
                        <input id="again" required name="again" type="password" placeholder="confirm your password" ng-model="vm.formdata.passwordConfirm">
                    </label>
              </form>
            </div>

            <div ng-show="vm.error" class="center-div login-error">
              <h4 class="login-error" ng-bind="vm.error"></h4>
            </div>

            <div>
              <button class="button button-block button-positive" ng-disabled="!loginForm.$valid" ng-click="vm.signup()"> Create Account </button>
            </div>
            <div class="center-div">
              Already have an account? <a href="#/login">Sign in</a>
            </div>
          </ion-content>
        </ion-view>

### 9.0.1: Making the Signup Page Look Right

The signup and login pages uses a few custom styles to get the layout look like we, so we need to add those into our stylesheet.

1. Open the www/css/style.css and add the following classes:

        .center-div {
          display: inline-block;
          width: 100%;
          margin: 0 auto;
          text-align: center;
          margin-top: 10px;
        }

        #social-login-buttons {
          margin-top: 30px;
        }

        .app-logo {
          max-width: 100px;
          margin: auto;
          background-repeat: no-repeat;
          background-position: center;
        }

        .login-error {
          color:red;
        }

### 9.0.2: Adding a Route to the Signup Page

We are now ready to add the routes in so that we can view the pages.

1. Open the www/js/config/app.config.js and add the following routes to get to the lign and signup pages.

        .state('signup', {
              url: '/signup',
              templateUrl: 'templates/signup.html'
        })

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, navigate directly to [http://localhost:8100/#/signup](http://localhost:8100/#/signup) to view the signup page.  Later on we will wire up all of the logic to route the user correctly to the login if they are not authenticated but one thing at a time.

Right now the sign up page does not have any functionality behind it.  Next we are now going to add the controllers and services to make the page work.

### 9.0.3: Creating the Service to Login

The first thing we are going to do is create the angular service to call the Back& authorization service to sign a user up.

1. In the www/js/services directory create a file called login.service.js
1. Using the angular snippet `ng1factory` to generate a new service.
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Service: LoginService
        * dependency1: Backand
        * exposedFn: signup
1. Press Esc or Enter to exit the snippet
1. In the signup function, we need to pass in the following fields:
    * firstName
    * lastName
    * email
    * password
    * passwordConfirm

            function signup(firstName, lastName, email, password, passwordConfirm) {
            }
1. Then inside the signup function we need to call the Backand.signup function and pass all of the fields in.  The Backand.signup function takes care all of the authentication.  It calls the Back& authorization service and upon successful login broadcast an authorize event.

        return Backand.signup(firstName, lastName, email, password, passwordConfirm);

1. In order for the Backand.signup function to work properly, we need to set the signup token value in the www/js/app.config.js file just like we set the app name and anonymous token in the previous lab.  Back& will

          BackandProvider.setSignUpToken('14d7ec8d-e57a-4d93-9724-10f7879a352b');

### 9.0.4: Adding a Controller to the Signup Page

Now it is time to create the controller for the signup page for the UI view to be able to call the LoginService.

1. In the www/js/controllers directory created a file called signup.controller.js
1. Use the `ng1controller` snippet to generate the controller code
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Controller: SignupController
        * dependency1: LoginService
1. Press Esc or Enter to exit the snippet

Now we need to create the signup function and expose it to the view.  After the `activate` function create a new function called signup.  In the signup function if the call to the LoginService.signup is successfully we will redirect the user to the projects page by calling `$state.go` (Don't forget to inject `$state` into the `SignupController`).  To expose the function to the view we need to add it to the vm variable by creating the vm.signup variable and setting the value of it to signup.

       SignupController.$inject = ['LoginService', '$rootScope', '$state'];
       function SignupController(LoginService, $rootScope, $state) {
         var vm = this;
         vm.signup = signup;

         activate();

         ////////////////

         function activate() { }

         function signup() {
           vm.error = '';
           LoginService.signup(vm.formdata.firstName, vm.formdata.lastName, vm.formdata.email, vm.formdata.password, vm.formdata.passwordConfirm)
             .then(function (result) {
               $state.go('projects');
             },
             function (error) {
               if (error.error_description !== undefined) {
                 vm.error = error.error_description;
               } else {
                 vm.error = 'Unknown Error';
               }

             });
         }
       }

1. We are ready to add the `SignupController` to the route in the www/js/app.config.js file

        controller: 'SignupController as vm'

1. The last step before viewing it in the browser is to add the reference to the signup.controller.js and login.service.js files in the index.html file.

        <script src="js/services/login.service.js"></script>
        <script src="js/controllers/signup.controller.js"></script>

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, navigate directly to [http://localhost:8100/#/signup](http://localhost:8100/#/signup) to view the signup page.  Later on we will wire up all of the logic to route the user correctly to the login if they are not authenticated but one thing at a time.
1. You should now be able to create a new account and it will redirect you to the projects list upon successful account creation.


## 9.1: Creating the Login Page


1. In the www/templates directory create a file called login.html
1. Set the contents of login.html  to:

        <ion-view view-title="Login" hide-nav-bar="true">
          <ion-content class="padding">
            <div>
              <div>
                <div class="app-logo"><img src="img/todo_logo.png"></div>
                <div>
                  <form name="loginForm">
                    <label class="item item-input">
                              <input required type="text" placeholder="Email" ng-model="vm.formdata.email">
                    </label>
                    <label class="item item-input">
                              <input required type="password" placeholder="Password" ng-model="vm.formdata.password">
                    </label>
                  </form>
                </div>
                <div ng-show="vm.error" class="center-div">
                  <h4 class="login-error" ng-bind="vm.error"></h4>
                </div>
                <div>
                  <button class="button button-block button-positive ion-unlocked"
                      ng-disabled="!loginForm.$valid" ng-click="vm.login()"> Login</button>
                </div>
                <div class="center-div">
                  <a href="#/signup">Join now</a>
                </div>
              </div>
            </div>
          </ion-content>
        </ion-view>

### 9.1.1: Adding a Route to the Login page

We are now ready to add the route to the login page so that we can view it

1. Open the www/js/config/app.config.js and add the following route to get to the login page.

            .state('login', {
              url: '/login',
              templateUrl: 'templates/login.html'
            })

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, navigate to [http://localhost:8100/#/login](http://localhost:8100/#/login) to view the login page.  Click on Join now will take you to the sign up page or you can navigate directly to it at [http://localhost:8100/#/signup](http://localhost:8100/#/signup)

Right now the login page does not have any functionality behind it.  It is now time to wire up the login page with a controller that calls into the LoginService to log the user in.

### 9.1.2: Adding username and password login support to the LoginService

We are first going to implement the username and password login.  To do this we need to create a function in the `LoginService` that calls the `Backand.signin` function.

1. Open the www/js/services/login.service.js file
1. Add a function called `login` with 2 parameters called email and password
1. In the `login` function return `Back.signin` and pass both parameters to the call

          function login(email, password) {
            return Backand.signin(email, password);
          }

1.  Don't forget to also add the `login` function to the `var service` object

        var service = {
            signup: signup,
            login: login
         }

We are now ready to create the login controller to call the `LoginService.login` function that we just created.

### 9.1.3: Adding a controller to the Login page

1. In the www/js.controllers directory create a file called login.controller.js
1. Use the `ng1controller` snippet to generate the controller code
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Controller: LoginController
        * dependency1: LoginService
1. Press Esc or Enter to exit the snippet

Now we need to create the login function and expose it to the view.  After the `activate` function create a new function called login.  In the login function if the call to the `LoginService.login` is successfully we will redirect the user to the projects page by calling `$state.go` (Don't forget to inject `$state` into the `LoginController`).  To expose the function to the view we need to add it to the vm variable by creating the vm.login variable and setting the value of it to login.

    LoginController.$inject = ['LoginService', '$state'];
      function LoginController(LoginService, $state) {
        var vm = this;
        vm.login = login;

        activate();

        ////////////////
        function activate() { }

        function login() {
          vm.error = '';
          LoginService.login(vm.formdata.email, vm.formdata.password)
            .then(function (result) {
              $state.go('projects');
            },
            function (error) {
              if (error.error_description !== undefined) {
                vm.error = error.error_description;
              } else {
                vm.error = 'Unknown Error';
              }
            });
        }
      }


1. We are ready to add the `LoginController` to the route in the www/js/app.config.js file

        controller: 'LoginController as vm'

1. The last step before viewing it in the browser is to add the reference to the login.controller.js files in the index.html page.  No need to add the login.service.js  since it is already there from the signup page section

        <script src="js/controllers/login.controller.js"></script>

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, navigate directly to [http://localhost:8100/#/login](http://localhost:8100/#/login) to view the login page.  Later on we will wire up all of the logic to route the user correctly to the login if they are not authenticated but one thing at a time.
1. You should be able to login with the user that you created when you signed up in the previous section and have it redirect you to the project list upon successful login.

## 9.2: Adding ability to login through a social network provider

Now that we are able to login with the username and password, lets add in the ability to login with Facebook, Google, GitHub or Twitter.  Out of the box Back& already has everything setup to be able to implement social logins using the Back& keys.  However, before a production release they do recommend that you setup your own application keys for each of the providers so that the application references your app name and the permissions that you need.  All of the instructions for setting up these keys are included in the administrative interface for Back& and it only takes a few minutes per provider to request the keys from the provider.

### 9.2.1  Add social login buttons to Login page

1. Open the www/templates/login.html file
1. Before the `</ion-content>` tag add the following html to add the social login buttons onto the login form.  This html will add the ionicons for the different provider and call the vm.socialSignin function for each type.  The possible social provider values are facebook, google, github, and twitter.

        <div id="social-login-buttons">
          <div class="button-bar">
            <button class="button button-positive button-block" ng-click="vm.socialSignin('facebook')"><i class="icon ion-social-facebook"> Facebook</i></button>
            <button class="button button-assertive  button-block" ng-click="vm.socialSignin('google')"><i class="icon ion-social-googleplus"> Google+</i></button>
          </div>
          <div class="button-bar">
            <button class="button button-stable  button-block" ng-click="vm.socialSignin('github')"><i class="icon ion-social-github"></i> Github</button>
            <button class="button button-calm  button-block" ng-click="vm.socialSignin('twitter')"><i class="icon ion-social-twitter"></i> Twitter</button>
          </div>
        </div>

### 9.2.2: Add social login method to LoginService

1. Open the www/js/services/login.service.js file
1. Add a function called `socialLogin` with 1 parameter called provider
1. In the `socialLogin` function return `Backand.socialLogin` and pass the provider parameter to it
1. In the `socialLogin` function return `Backand.socialLogin` and pass the provider parameter to it

          function socialLogin(provider) {
            return Backand.socialSignin(provider);
          }

1.  Don't forget to also add the `login` function to the `var service`

        var service = {
            signup: signup,
            login: login,
            socialSignin: socialSignin
         }

We are now ready to create the login controller to call the `LoginService.socialSignin` function that we just created.

### 9.2.3: Adding social login ability to the LoginController

1. In the www/js/controllers/login.controller.js file we need to add a new function called `socialSignin` and expose it to the view
1. After the `login` function add the `socialSignin` function

           function socialSignin(provider) {
              vm.error = '';
              LoginService.socialSignIn(provider)
                .then(function (result) {
                  $state.go('projects');
                },
                function (error) {
                  if (error.error_description !== undefined) {
                    vm.error = error.error_description;
                  } else {
                    vm.error = 'Unknown Error';
                  }
               });
           }

The last piece before we test the functionality is to tell Back& if we are on a mobile device or not.  This is important due to how the social logins work differently on a desktop browser versus a mobile device.

1. Open the www/js/app.js file and add the following lines to the run function

        var isMobile = ionic.Platform.isWebView();
        Backand.setIsMobile(isMobile);
        Backand.setRunSignupAfterErrorInSigninSocial(true);

1. Don't forget to inject the backand dependency

        angular.module('starter', ['ionic', 'backand'])

## 9.3: Ensuring the User is Logged In

We have added the functionality to be able to login and signup.  However, there is currently no checks in place to validate that an authorization errors (401 and 403 status codes) didn't occur in one of the Back& API calls and if one did then redirect the user to the login page.  It is not hard to implement this functionality code wise but if you have never done this in Angular then finding out how to do it is no easy tasks.  Luckily I have gone through the pain of figuring it so that we can easily implement it in this workshop.


### 9.3.1: Capturing 401 Unauthorized and 403 Forbidden Errors

With Angular you can use Http Interceptors to globally inspect the request and response of http request.

1. In the www/js create a new file called http.interceptor.js
1. Using the angular snippet `ng1factory` to generate a new service.
    * This will have a few fields to fill out as part of the template.  When you are done filling out each field press tab to go to the next one
    * Values to fill out:
        * Module: starter
        * Service: LoginService
        * dependency1: $rootScaope
        * exposedFn: responseError
1. Press Esc or Enter to exit the snippet
1. Add `$q` to the dependency list for the `HttpInterceptor`

          HttpInterceptor.$inject = ['$rootScope', '$q'];
          function HttpInterceptor($rootScope, $q) {
                ........
          }

1. In the `responseError` function we need to check the response.state.  If it is a 401 or 403 then we are going to broadcast the `event:unauthorized` event on `$rootScope` and reject the promise.  Don't forget to pass in the `response` parameter to the `responseError` function.

        function responseError(response) {
          if (response.status === 401 || response.status === 403) {
            $rootScope.$broadcast('event:unauthorized');
          }

          console.log('api interceptor http error', response);
          return $q.reject(response);
        }

Now we need to tell Angular about the interceptor so that it will use it for every http request that uses $http

1. Open the www/js/config/app.config.js file
1. In the dependency list add `$httpProvider`

        config.$inject = ['$stateProvider', '$urlRouterProvider', 'BackandProvider', '$httpProvider'];

        function config($stateProvider, $urlRouterProvider, BackandProvider, $httpProvider) {
            ......
        }

1.  In the config function push our interceptor the `$httpProvider.interceptors` array

        $httpProvider.interceptors.push('HttpInterceptor');

The last thing we need to do in the app.config.js file is to update the `$urlRouterProvider.otherwise` call so that it continues to function as expect.  Replace the current call to `$urlRouterProvider.otherwise` with this code

    $urlRouterProvider.otherwise(function ($injector) {
        var $state = $injector.get("$state");
        $state.go("projects");
    });

Now we need to capture the `event:unauthorized` that we are throwing when the response status is a 401.

1. Open the www/js/app.js file
1. To the dependency list add `$rootScope` and `$state`

    .run(function ($ionicPlatform, Backand, $rootScope, $state) {
        .....
    }

1. In the run function add the following code to response to the `event:authorized` broadcast and redirect to the login screen.

        $rootScope.$on('event:unauthorized', function () {
            $state.go('login');
        });

We are now ready to test our interceptor.  To get either a 401 or 403 to trigger we need to clear the `Backand` values from Local Storage.

However, in order to test this out we need to change which Back& application we are pointing to.  So far we have been using a Back& Application that is open for everyone to read so we cannot generate any authorization errors with the functionality we have implemented so far.  Long term we only want to interact with the projects that we have entered and this new Back& Application that we are changing to will enable us to do just this.

1.  Open the www/js/config/app.config.js file and change the Back& settings for tokens and app name to

          BackandProvider.setAppName('ddjtodo');
          BackandProvider.setSignUpToken('536d7143- edf0 - 451b- 9e8d- fa065c563eb6');
          BackandProvider.setAnonymousToken('ec9b4565-8d2e-4740-a4dc-4e8e52dbbc72');

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, navigate directly to [http://localhost:8100/](http://localhost:8100/)
1. Since we have been implementing authentication most likely you already have the Back& token stored in Local Storage and we need to clear those out.

    1. In Chrome, open up the developer tools
    1. Go to the resources tab
    1. Expand Local Storage and select http://localhost:8000
    1. If the `BACKANDtoken` or `BACKANDuser` rows exists, click on them and delete them

        ![Chrome Devs  Tools Resources Local Storage]({{"chrome-devtools-resources-backand.png" | prepend: imagedir }})

    1. Anytime that you want to test the 401/403 Authorization event broadcast, login, delete the Back& tokens from Local Storage, and refresh the page.  It should redirect you to the login page.

Everything should be working.  However, we have one concern with network traffic that we need to address.  If you look in the Chrome Dev Tools Console Tab, you will notice that even though you do not have the Back& token stored in Local Storage anymore it still made the http call to Back& to get the 403 Forbidden error.  This is a waste of network traffic and cell phone data plans.  Instead we should check for the token with each state change and if the token is not present in Local Storage then redirect the user to the login page.  This way we will not make any network call if the user is not logged in.

### 9.3.2: Checking login status on state change

The first thing we are going to do is add a function to the `LoginService` that checks if the Back& token is present.

1. Open the www/js/services/login.service.js file
1. Add a new function called `verifyIsLoggedIn` that takes no parameters and checks if the `Backand.getToken()` function )

    function verifyIsLoggedIn() {
      if (Backand.getToken() === null) {
        return false;
      }

      return true;
    }

1. Make sure to expose it as part of the service

         var service = {
              signup: signup,
              login: login,
              socialSignIn: socialSignIn,
              verifyIsLoggedIn: verifyIsLoggedIn
         };


In the `app.run` function we need to check if the user is logged in on each state change and redirect them to the login page if they are not logged in.

1. Open the www/js/app.js file
1. In order to capture the state change, inside of the run function we need to listen for the event `$stateChangeStart`

        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {

        }

1. We then need to check if the user is logged by calling the `LoginService.verifyIsLoggedIn` function and if they are not logged in then we need to called the `event.preventDefault()` to stop running more code and then return the `$state.go('login')` call.  If the user is logged in then we can just return from the function.  One very important thing that we also need to check for to prevent an infinite redirect loop is that the state change is not to the login or signup pages by looking at the `next.name` value and making sure it is not equal to the login/signup route name.

        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
            if (next.name !== 'login' && next.name !== "signup") {
                if (!LoginService.verifyIsLoggedIn(false)) {
                    event.preventDefault();
                    return $state.go('login');
                } else {
                    return;
                }
            }
        });

1. You also need to inject the `LoginService` into the run function

            .run(function ($ionicPlatform, Backand, $rootScope, $state, LoginService) {
                ........
            }

Now we are ready to test.

1. If you don't already have ionic serve running, open a command prompt and run the command ionic serve
1. In your web browser, navigate directly to [http://localhost:8100/](http://localhost:8100/)
1. You need to make sure that the Back& tokens are removed from Local Storage before testing

    1. In Chrome, open up the developer tools
    1. Go to the resources tab
    1. Expand Local Storage and select http://localhost:8000
    1. If the `BACKANDtoken` or `BACKANDuser` rows exists, click on them and delete them

        ![Chrome Devs  Tools Resources Local Storage]({{"chrome-devtools-resources-backand.png" | prepend: imagedir }})

    1. Anytime that you want to test the 401/403 Authorization event broadcast, login, delete the Back& tokens from Local Storage, and refresh the page.  It should redirect you to the login page without
1. Now try to navigate to [http://localhost:8100/#/projects](http://localhost:8100/#/projects) and it should redirect you to the login page.  If you look in the Chrome Dev Tools Console, you will also not see any network calls or errors like before since we no longer make network calls just to find out the authentication token is not there.

## 9.4: Logout Support

Right now we do not directly support logout.  In a future lab we will implement this functionality.  For now you can go into the Chrome Dev Tools and clear the Back& tokens from Local Storage

## Wrap-up

Whew you made it through this lab.  This is by far one of the longest and hardest labs to implement.  I bet you are glad that you didn't have to do all of the research to figure out how to make this all work.  This was one of the biggest hurdles that I had to overcome when I started doing mobile development and implementing authentication.

You now have a set of code that you can reuse on any project that needs authentication.  Just update the LoginService to call the provider that is doing the authentication, update the events that you want to throw and capture with the `$rootScope.$broadcast and $rootScope.$on`, and update the state to redirect the user to.  As simple as that, BOOM! Bobs Your Uncle, working authentication.

In the next lab we are going to code up the add new project and task screens.