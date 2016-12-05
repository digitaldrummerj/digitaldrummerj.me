---
#
# Use the widgets beneath and the content will be
# inserted automagically in the webpage. To make
# this work, you have to use › layout: frontpage
#
layout: frontpage
widget1:
  title: "Blog"
  url: 'blog/'
  image: writing-book-302x182.jpg
  text: "My notebook of technical information to share with you.  If I struggled with it or found something cool, it is documented here."
widget2:
  title: "Speaking Engagements"
  url: 'speaking/'
  text: "As much as I love to write code, I enjoy teaching even more. Find out where I will be speaking next and see past presentations."
  image: mic-4-302x182.jpg
widget3:
  title: "Workshops"
  text: "Sometimes an hour long presentation won't do.  You need more time and details.  See my available workshops and work through them."
  url: 'workshops/'
  image: workshop-303x182.jpg 
  #tutorial-header@2x-303x182.jpg
  #url:https://youtube.com/user/digitaldrummerj'
  #video:
  #  url: 'https://www.youtube.com/embed/3b5zCFSmVvU'
  #  id: videoModal
  #  height: 1280
  #  width: 720
  #image:
  #  name: 'start-video-feeling-responsive-302x182.jpg'
  #  width: 302
  #  height: 182

#
# Use the call for action to show a button on the frontpage
#
# To make internal links, just use a permalink like this
# url: /getting-started/
#
# To style the button in different colors, use no value
# to use the main color or success, alert or secondary.
# To change colors see sass/_01_settings_colors.scss
#
callforaction:
  url: https://tinyletter.com/digitaldrummerj
  text: Signup to get latest updates ›
  style: alert
permalink: /index.html
#
# This is a nasty hack to make the navigation highlight
# this page as active in the topbar navigation
#
homepage: true
---

