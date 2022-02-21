---
date: 2025-03-01T13:00:00Z
published: false
title: "Post Ideas"
url: '/post-ideas'
---

Here are some additional post ideas that I have not picked a date for yet.

1. UI  Testings
    1. Cypress Studio
    1. Cypress login testing
    1. Cypress end to end testing
    1. Cypress screenshot testing
    1. Cypress - Mocking Api Calls
    1. UI Performance Testing Using Locust
1. VSCode
    1. Visual Studio Code Outline on the Right
    1. Creating VSCode snippets
    1. VSCode Settings Sync
    1. VSCode Extensions Series of my favorite
        1. AddOnly
        1. FoldPlus
        1. Path Intellisense
        1. Angular Language Service
        1. angular2-switcher
        1. ESLint
        1. markdownlint
        1. Prettier
        1. REST Client
        1. Winter Is Coming Theme (along with coding font)
1. Resharper
    1. Resharper Shortcuts
    1. Resharper Templates
    1. Resharper creating multiple file templates
1. Visual Studio
    1. Visual Studio 2019 Extensions
    1. Upgrading to Visual Studio 2022
1. .NET Architecture
    1. Repository Pattern
    1. Supervisor Pattern
    1. Service Pattern
    1. Adding Swagger
    1. Configuring Swagger for Authentication
    1. Rest Client to Call Other 3rd Party APIs
    1. Global Exception Handler
    1. Strongly Typed Configuration Values
    1. Automapper
        1. Setup / Usage
        1. Testing Mappings
    1. Anti-Forgery Tokens
    1. Data Protection (<https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/implementation/key-storage-providers?view=aspnetcore-2.2&tabs=netcore-cli>)
    1. CORS
    1. Dependency Injection
    1. ASP.NET Versioning
    1. Mocking with MOQ
    1. Entity Framework
        1. Soft Deletes
        1. Auto Add Audit Columns
        1. History Tracking with Triggers
        1. Using Enums as a column value
        1. Splitting Context configuration into file by table
        1. Call stored procedures
        1. default values for columns
        1. cascade
        1. global filters
        1. indexes
        1. relationships
        1. column attributes
        1. table names
        1. create migration scripts
        1. you should use real database for unit testing vs in-memory or sql lite?
1. Hugo
    1. Set url in front matter so it is diff than file name
    1. Make external urls open in a new tab automatically (e.g. _default\_markup\render-link.html)
    1. shortcodes to look into adding
       1. file tree shortcode
       1. expandable sections shortcode
       1. better figure shortcode
       1. better blockquote
       1. better note shortcode
       1. better warning shortcode
       1. shortcode for checkmarks
    1. Add Reading time

        ```html
        {{ if (gt .ReadingTime 0) }}
            {{ $readTime := cond (gt .ReadingTime 1) "minutes" "minute" }}
            <span class="meta-tags">| <span class="fa fa-clock-o"></span>Reading Time: {{ .ReadingTime }} {{ $readTime }} |</span>
        {{ end }}
        ```

    1. Customize the display of the terms and terms list
<!--more-->