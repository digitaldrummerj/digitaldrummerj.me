---
categories:
- speaking
date: 2016-02-04T00:00:00Z
draft: true
excerpt: "As a public speaker one of the most important things for me is getting feedback
  from attendees.  The feedback helps me get better as a presenter as well as figuring
  out what is working in a talk and what is not. \n\nWhen I started speaking I tried
  several different speaker feedback sites but the number of people that actually
  have feedback was extremely low (like 1 out of a hundred).  It wasn't until one
  of the attendees gave me feedback in person and told that they wanted to leave feedback
  but just didn't want to register for another online account.  \n\nI had been talking
  with other speakers about how they get feedback and all of them seemed to have the
  same issue of low response rate. \n\nLearned how I solved this issue and went from
  < 5% of attendees providing feedback to > 75%.\n"
title: Better Way To Get Talk Feedback

---

As a public speaker one of the most important things for me is getting feedback from attendees.  The feedback helps me get better as a presenter as well as figuring out what is working in a talk and what is not.

When I started speaking I tried several different speaker feedback sites but the number of people that actually have feedback was extremely low (like 1 out of a hundred).  It wasn't until one of the attendees gave me feedback in person and told that they wanted to leave feedback but just didn't want to register for another online account.

I had been talking with other speakers about how they get feedback and all of them seemed to have the same issue of low response rate.

Then I meet [Devin Rader ](http://twitter.com/devinrader) from [Twilio ](http://twillio.com) and he mentioned a totally different way that they asked for talk feedback.  At Twilio they used something called Net Promoter Score (NPS).

NPS ask the user to rate on a scale of 1 to 10.   10 meaning, I would bring my best friend to see the talk and 1 being, please never give this talk again.

NPS seems easy enough but you still need some way to get the feedback and to get attendee to summit the feedback.

The first problem is solved by a combination of Twilio to receive the rating through a text message and Twimlbin to send an automated response back to the attendee.   By sending a text message the attendee does not have to register for any kind of account and are more willing to give feedback.

The second problem is solved by giving attendees a reason to text in the rating.  Most attendees want to be able to download the slides and demo code.  I used to give the links at the end of the slide deck but now the attendees get the links as part of the automated response for giving me a rating.  It is a win win for attendees and myself.

 By using this method of getting feedback I have seen the amount of feedback climb to between 50-75%.

Now lets take a look at how to actual implement this feedback system.

## Getting Twilio Phone Number

The first thing we need to do is sign up for a Twilio account at [https://www.twilio.com/try-twilio].  If you already have an account, then go ahead and login to it.

Once you have an account you need to purchase a phone number.  The number of phone numbers to purchase depends on how close your talks are together at an event.  If the talks are on the same day then I get a separate phone number for each talk else I just reuse the phone number.

Sending a text message through Twilio does cost money but it is really inexpensive.  It is $1 per month for each phone number and $.0075 per message.  That is less than a penny per message.

![cost table](/images/feedbackwithtwilio/pricing.png)

To purchase a phone number go under your account, select phone numbers, and click the buy a new Twilio phone  number llink.

![buy phone number](/images/feedbackwithtwilio/buy-phone-number.png)

## Setup Twimlbin
Now that we have a phone number we need to configure it to have an automated response when it gets SMS messages.

To do this we are going to use [Twimlbin](http://twimlbin.com/)   which is a website that does nothing more than send back a Twilio formatted response (Twilio markup language or TwiML for short) when Twilio sends it a message.

To create a Twinlbin, click on the "Create a new Twimlbin" button on the home page.

![Twinlbin home page](/images/feedbackwithtwilio/twimlbin-home.png)

When you create a Twimlbin.com you will be presented with a box to type in the TwiML, a public url that  is read only and a private url to edit the twimlbin.

![Create twimlbin page](/images/feedbackwithtwilio/twimlbin-create.png)

On the Twimlbin text area you need to out valid TwiML markup which it will attempt to validate it for you.  For our purposes we have a basic reply that gives the url to the slides, demos and any other relevant links.  Try not to make the message to long since you are sending it back as a text message.  If the number is links becomes too much, just put them in a blog post or gist and give them that url.

???? give example code????

## Configuring Phone Number to Use Twimlbin

After you have configured the twimlbin, you need to tell Twilio to use it.

To do this toy need to create an application an Twilio that point to the Twimlbin public url.

???? how?????
Once the application is created you need to update the phone number to use it.

????? how?????

## Testing Your Setup

To test everything out send a text message to your Twilio phone  number.

You should get the automated response within a minute or so.  Make sure to click on each of the links to make sure that they work.

## Calculate Feedback

The one downside to use Twimlbin is that your are not able to intercept the incoming messages to parse and store them to calculate the feedback.

Instead you need to export the incoming logs and   manually calculate the NPS score.  Luckily it is easy to import the log into excel and do the calculations.  I do find that in many cases that attendees send text feedback in addition to the score, so I have to extract  the score of of the message.

??? how to calculate????


## Turning off Twilio so you are not charged by accident

One cost saving tip is to turn off the auto response within a day or so after you have presented.  This way you don't get random messages sent to the phone that you are charged for.

As well if it will be more than a month  between speaking engagements then you could save the monthly fee for the phone number and release it .

## Setting Phone Number To Not Allow Voice Calls

If you are only using you Twilio phone number for text messages, you will want to turn off the ability to get phone calls on it, so that you are not charged if someone does try to call the number.

By default a Twilio phone number has a url configured for what to do for voice calls.  If you make the url empty it will turn off the ability to get calls to the number.

## Conclusion

Now you can increase the amount of feedback that get on a talk like I did.  Having feedback is crucial to knowing if the talk resonated with users and to helping make the talk better.  As well the feedback will make you a better as a speaker.

Another upside for attendees is they won't have to wait for you to post  the material online and will have immediate access to it after the talk.
