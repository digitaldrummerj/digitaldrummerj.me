---
categories:
- blogging
- jekyll
date: 2015-03-10T00:00:00Z
excerpt: "Welcome the continuing series on using Jekyll. In this tutorial we are going
  to setup a custom domain for your blog.\n    \n## Overview\n\nPart of having a blog
  is making it your own and giving it personality.  One of the easiest ways to do
  this is to use a custom domain name that fits the blog.  So far we have been using
  http://[username].github.io to get to your blog, but now we will go through the
  process of setting up a custom domain name like http://digitaldrummerj.me.  At first
  it might seem like this is going to be complicated but it is actually very easy
  to set this up.\n"
published: true
series: ["blogging-with-jekyll"]
title: 'Jekyll Part 08: Using a Custom Domain'
---

Welcome the continuing series on using Jekyll. In this tutorial we are going to setup a custom domain for your blog.

## Overview

Part of having a blog is making it your own and giving it personality.  One of the easiest ways to do this is to use a custom domain name that fits the blog.  So far we have been using http://[username].github.io to get to your blog, but now we will go through the process of setting up a custom domain name like http://digitaldrummerj.me.  At first it might seem like this is going to be complicated but it is actually very easy to set this up.

## Section 1: Purchasing a Domain Name

**Note:** If you already have a domain name that you want to use for your Github blog purchased and are using DNSimple for your DNS provider.  You can skip this section and move onto Section 2.

The first step in this process is to get a domain name.  The easiest way to do this is to purchase the domain name from the dns provider.  For this tutorial we are going to use [dnsimple](http://dnsimple.com).  You can use any DNS provider but I am only providing instructions for using [dnsimple](http://dnsimple.com).

1. Go to [dnsimple](http://dnsimple.com)
2. Click the "Get Started with DNSimple Today" button

    ![Getting Started with DNSimple Today button](/images/BloggingOnGitHub/github_part_8_get_started_dnsimple.png)

3. Click the "Add Domain" button

    ![Add Domain button](/images/BloggingOnGitHub/github_part_8_add_domain_button.png)

4. Fill in the domain name that you want or if you are transferring the domain to DNSimple fill in the domain name that you want to transfer.
5. Check the "Register or transfer this domain" box
6. If you want you registration information private, check the "Enable WHOIS Privacy Protection"
7. If you want the domain to auto renew each year, check the "Enable Auto Renewal"
8. Click the "Add Domain" button

    ![Add Domain button](/images/BloggingOnGitHub/github_part_8_add_domain_button.png)

9. Fill in your contact information
10. Click the "Register Domain" button

    ![Register Domain button](/images/BloggingOnGitHub/github_part_8_register_domain.png)

11. You now have a domain name registered and are ready to complete the DNS setup in the next section.

## Section 2: Setting up DNS

**Note 1:** If you are transferring a domain to DNSimple that process may take several days to be completed and you may not be able to complete this setup until the transfer process is completed.

**Note 2:** If you just purchased your domain name from DNSimple, you will be able to complete this section.

1. Click the "Services" button next to your domain name under the DNSimple domain list for your account.
1. Scroll down until you see the "Github Pages" service

    ![Github Pages Service](/images/BloggingOnGitHub/github_part_8_dnsimple_github_service.png)

1. Click the Add Button

    ![Github Page Service Add Button](/images/BloggingOnGitHub/github_part_8_dnsimple_github_service_add_button.png)

1. Fill in your Github username

    ![Github Pages Name](/images/BloggingOnGitHub/github_part_8_dnsimple_github_service_setup.png)

1. Click the "Complete Github Pages Setup" button

    ![Github Pages Service](/images/BloggingOnGitHub/github_part_8_dnsimple_github_service_setup_complete.png)

1. You now have DNSimple configured to point your domain name correctly to your Github blog at http://[username].github.io

## Section 3: Configure Blog with Domain Name

**Note 1:** If you are transferring a domain to DNSimple,  that process need to be completed before you can complete this section.

**Note 2:** If you just purchased your domain name from DNSimple, you will be able to complete this section.

1. Click on the + button to add a new file

    ![Github Plus Button](/images/BloggingOnGitHub/github_add_button.png)

1.  Name the file CNAME with no extension

    ![Github Name the New File CNAME](/images/BloggingOnGitHub/github_part_8_add_cname_file.png)

1. At the very top of the file add your domain name

    ![Add Domain Name at top of CNAME file](/images/BloggingOnGitHub/github_part_8_cname_domain_name.png)

1. Scroll to the "Commit changes" section on the Github Editor, put in your commit comment and click "Commit changes"

    ![Commit CNAME Changes](/images/BloggingOnGitHub/github_part_8_cname_commit.png)

1. It will take a few minutes for Github to update before you will be able to browse to your Github blog with your domain name.  Once your domain is working, even the old http://[username].github.io url will redirect to your domain name.

## Conclusion

Now users will be able to get to your blog with the domain name that you just configure.  Even if the user tries to go to the http://[username].github.io it will redirect them to your domain name.

In our next lesson, I will show you how to install jekyll so that you can edit your blog post and files locally instead of using the Github web site.  This will allow you to make changes without having to publish them to the world just to test them.

