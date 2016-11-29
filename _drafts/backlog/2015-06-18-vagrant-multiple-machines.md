---
published: false
layout: post
title: 'Vagrant - Multiple Machines'
categories: ['How-To', 'vagrant']
date: 2015-06-18 06:00
---

{% include vagrantseries_top.html %}

Previous Lesson: [Network Options]({{site.url}}/vagrant-networking-options)

Outline:
* Overview
* ??
* Next Steps

##NOTES:

###Machine Status

**All Machines**

	vagrant status

**By Name**

	vagrant status [machine name]

**By Regular Expression**

	vagrant status [Regular expression]

Examples:
* Contains the String win7: vagrant status /win7/
  

###Start up Machines

**All Machines**

	vagrant up

**By Name**

	vagrant up [machine name]

**By Regular Expression**

Use regular expression to bring up machines that match a string in the virtual machine name.

	vagrant up /ie8/


Next Lesson: [Azure Virtual Machines]({{site.url}}/vagrant-azure-machines)

{% include vagrantseries_bottom.html %}
