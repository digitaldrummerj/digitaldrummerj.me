---
categories: ["blogging", "notion"]
date: 2024-03-17T13:00:00Z
published: false
title: "Hugo - Import Blog RSS to Notion Content Database"
url: '/hugo-import-rss-to-notion'
---

<!--more-->
1. Create Google Sheet with Headers: Name, Url, PubDate, and Category
1. Run the following csharp code (I ran it in linqpad)

    ```csharp
    XDocument feedXML = XDocument.Load("https://digitaldrummerj.me/feed.xml");

    var posts = from feed in feedXML.Descendants("item")
    select new
    {
    Name = feed.Element("title").Value,
    Url = feed.Element("link").Value,
    PubDate = DateTime.Parse(feed.Element("pubDate").Value),
    Category = string.Join(",", ((from category in feed.Elements("category") orderby category.Value select category.Value).ToArray())),
    };

    posts.OrderByDescending(p => p.PubDate).Dump();
    ```

1. Copy the first row of the output of the linqpad dump to the Google Sheet
1. Create Zapier that reads the Google Sheet and sends it to Notion
