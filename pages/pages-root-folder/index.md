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
  text: 'Give a blurb here about the blog.  Need to make as long as the 2nd and 3rd widget'
widget2:
  title: "Speaking"
  url: 'speaking/'
  text: 'Find out where I will be speaking next and get links to my presentation/demo material.'
  image: mic-4-302x182.jpg
widget3:
  title: "Youtube Channel"
  text: 'Find videos of me speaking on my Youtube Channel'
  url: 'https://youtube.com/user/digitaldrummerj'
  video:
    url: 'https://www.youtube.com/embed/3b5zCFSmVvU'
    id: videoModal
    height: 1280
    width: 720
  image:
    name: start-video-feeling-responsive-302x182.jpg
    width: 302
    height: 182

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
  url: https://tinyletter.com/feeling-responsive
  text: Inform me about new updates and features ›
  style: alert
permalink: /index.html
#
# This is a nasty hack to make the navigation highlight
# this page as active in the topbar navigation
#
homepage: true
---

