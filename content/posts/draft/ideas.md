---
date: 2025-03-01T13:00:00Z
published: false
title: "Post Ideas"
url: '/post-ideas'
---

Here are some additional post ideas that I have not picked a date for yet.

<!--more-->

## Planned Posts

### March

* 031122-aspnet-health-checks.md
* 031222-aspnet-health-checks-json-response.md
* 031322-vscode-extension-addonly.md
* 031422-vscode-extension-foldplus.md
* 031522-vscode-extension-path-intellisense.md
* 031622-vscode-extension-markdown-lint.md
* 031722-vscode-extension-angular2-switcher.md
* 031822-vscode-extension-github-pr.md
* 031922-dotnet-core-auto-mapper.md
  * setup / mapping
  * testing
* 032022-ef-core-soft-deletes.md
* 032122-ef-core-add-audit-columns.md
* 031322-ef-core-enums-as-column-value.md
* 031422-ef-core-split-context-config-by-table.md
* 031522-ef-core-call-stored-procedure.md
* 031622-ef-core-global-filters.md
* 031722-ef-core-indexes.md
* 031822-ef-core-relationships.md
* 031922-ef-core-column-attributes.md
* 032022-ef-core-table-names.md
* 032122-ef-core-migration-scripts.md
* 032222-ef-core-use-real-db-for-testing.md
* 032322-aspnet-core-add-swagger.md
* 032422-aspnet-core-add-versioning.md
* 032522-aspnet-core-global-exception-handler.md
* 032722-dotnet-core-repository-pattern.md
* 032822-dotnet-core-supervisor-pattern.md
* 032922-aspnet-core-strongly-typed-config.md
* 033022-hugo-mobile-blog-writing.md

### April

* 040122-
* 040222-

## Future Ideas

1. UI  Testings
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
        1. Angular Language Service
        1. ESLint
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
    1. Service Pattern
    1. aspnet-core-swagger-authentication
    1. Rest Client to Call Other 3rd Party APIs
    1. Anti-Forgery Tokens
    1. Data Protection (<https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/implementation/key-storage-providers?view=aspnetcore-2.2&tabs=netcore-cli>)
    1. CORS
    1. Dependency Injection
    1. Mocking with MOQ
    1. Entity Framework
       1. History Tracking with Triggers
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
    1. Create a Theme
    1. Multiple Config Files
    1. Custom Post Summary
    1. Add Caption to Image
    1. Make Draft Post Obvious
    1. Add Facebook Card
1. Productivity
   1. Streamdeck for coding
   1. Tracking Content with Notion
   1. Import RSS to Notion