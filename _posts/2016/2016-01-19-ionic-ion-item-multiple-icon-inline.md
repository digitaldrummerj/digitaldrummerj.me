---
layout: post
title: Ionic - Stop Icons from Overlapping in Ion List 
date: 2016-01-19 06:00
categories: ['ionic']
published: true
excerpt: | 
    Today I ran into an issue using Ionic, where I was trying to put two icons on the right side of an ion list item.  There is really easy to do with the item-icon-right css class.  Unfortunately when you have multiple icons, it overlaps instead of showing them side by side. I was not expecting this as I had only used 1 icon before and assumed that item-icon-right would just put them side by side.  

    Luckily, there is an easy fix for this using some built-in Ionic css classes.
---

{% assign imagedir = "/images/ionic-ion-list-inline-icons/" | prepend: site.baseurl | prepend: site.url %}

Today I ran into an issue using Ionic, where I was trying to put two icons on the right side of an ion list item.  There is really easy to do with the item-icon-right css class.  Unfortunately, when you have multiple icons, it overlaps instead of showing them side by side.  I was not expecting this as I had only used 1 icon before and assumed that item-icon-right would just put them side by side.  

![Overlapped Icons]({{ "icons-overlapped.png" | prepend: imagedir }})

Here is the code that causes the overlapped icons.

    <ion-list>
        <ion-item class="item item-icon-right">
            Task 1
            <i class="icon ion-ios-circle-outline"></i>
            <i class="icon ion-close icon-accessory"></i>
        </ion-item>
        <ion-item class="item item-icon-right">
            Task 2
            <i class="icon ion-checkmark-circled"></i>
            <i class="icon ion-close icon-accessory"></i>
        </ion-item>
    </ion-list>


Luckily, there is an easy fix for this using some built-in Ionic css classes.  We need to convert the icons into buttons, surround them with a div that has the class "buttons" on it, and change the ion-item class from item-icon-right to item-button-right.  

Also, to make the buttons still look like icons and not give them a border, we can use the button-icon class.  

    <ion-list>
        <ion-item class="item item-button-right">
            Task 1
            <div class="buttons">
                <button class="button button-icon ion-ios-circle-outline"></button>
                <button class="button button-icon ion-close icon-accessory"></button>
            </div>
        </ion-item>
        <ion-item class="item item-button-right">
            Task 2
           <div class="buttons">
                <button class="button button-icon ion-ios-circle-outline"></button>
                <button class="button button-icon ion-close icon-accessory"></button>
            </div>
        </ion-item>
    </ion-list>


![Not Overlapped Icons]({{ "icons-not-overlapped.png" | prepend: imagedir }})



