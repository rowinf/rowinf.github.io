+++
date = '2025-01-08T13:04:21+13:00'
draft = false
title = 'Choosing Hugo'
description = "Choosing Hugo: A Developer's Journey to Self-Hosting a Blog"
showtoc = true
ShowBreadCrumbs = true
tags = ['hugo']
+++

This blog is written with [Hugo](https://gohugo.io/). The choice was originally inspired by my interest in Golang. A blog is a valuable way to keep notes on your developer journey. When I decided to start my developer blog, considering all the options, everything seemed like a massive time investment—-until I found Hugo.

<!--more-->

## Self hosting a blog {{< fa "code" >}}

I wanted to self host a blog to preserve the uniqueness of my voice. Medium may improve reach, but I want to find my voice first by writing lots of content and being free to experiment. I also want to experiment with tools and technologies along the way.

### First impressions of Hugo

In my first attempt with Hugo, I simply ran the [Jekyll migration](https://gohugo.io/tools/migrations/) command. It went so well that there's not much to say about it. However, I did not attempt to customize much of my blog because I found the documentation overwhelming, I didn't know Go yet, and I was wondering if I was too hasty to drop Jekyll. A success story from [Low Tech Magazine](https://solar.lowtechmagazine.com/2023/06/rebuilding-a-solar-powered-website/) inspired me to keep going. 

After taking the time to learn Go, I find that I better understand the theme's code, and I'm more comfortable with changing the theme. Now I really enjoy the blazing speed of Hugo.

Choosing [PaperMod Theme](https://adityatelange.github.io/hugo-PaperMod/) was important to getting started with Hugo. If you choose a good theme, most of what you need to learn is in the theme's documentation.

### Learning how to learn

{{< fa "thumbs-up" "success" >}} As with most things, when first starting out with Hugo, it's good to learn a little, go out and do a little. Use the lessons from applying what you learn to form questions as a guide to learn a little bit more.

```goat

    .----------.        .------------.        .---------------.
   | Learn a    +----->| apply your   +----->| Evaluate the    |
   | little     |      | knowledge    |      | results         |
    '----------'        '------------'        '--------+------'
          ^                                            |
          |                                            |
          |               .----------.                 |
           +-------------+ formulate  +<--------------+
                         |  questions |
                          '----------'
```

In practice, the first steps might look something like this:
1. [Install Hugo](https://gohugo.io/installation/)
2. [Create a website](https://gohugo.io/getting-started/quick-start/)
    - Install a theme
    - Add some content
    - Basic configuration
3.  [Deploy to Github pages](https://gohugo.io/hosting-and-deployment/hosting-on-github/) 

Follow it up with questions about what to do next. If you don't have questions, write more content! Some ideas:
- Tag your posts
- Use some shortcodes in your content
- Add a chart to your content
- Configure social media [OG tags](https://ogp.me/)
- Add a favicon
- [Choose a different theme](https://themes.gohugo.io/)

## Developer Blog

I chose the PaperMod because of its simple design and powerful configuration options for my developer blog. This is a static blog with content I want to add through my normal usage of text editors or through GitHub directly. The blog is published to GitHub Pages, a free hosting service supported in Hugo's configuration. 

{{< aside >}}
Hugo offers a migration path [from Jekyll and others](https://gohugo.io/tools/migrations/). It's totally fine to start with Jekyll and move to Hugo later. That's what I did.
{{< /aside >}}

## Navigating Hugo

Hugo has many features, but it maybe be helpful to learn the most impactful features first.

### Content First
Hugo really shines on a website with lots of content. Establish a good base of content first by learning Hugo's content management features.

Your experience with Hugo will improve if you get more familiar with the basic features of Hugo before jumping into the more advanced features!

#### Markdown
Markdown is the default editing experience with Hugo and it uses a Go implementation called [Goldmark](https://github.com/yuin/goldmark/). Hugo provides powerful [features](https://gohugo.io/content-management/markdown-attributes/) for working with Markdown.

#### CSS classes and attributes
You can add classes to your markdown text, but some configuration is required.
{class="success"}

#### Emojis
:smile: Enable emojis :blueheart: configuration.

#### Diagrams

```goat
                          .----------.                 
                         | use goat   + --------+ are they useful?
                         |  diagrams  | <-------+
                          '----------'
```
#### Shortcodes
{{< aside >}}
More advanced customization is allowed via shortcodes.
{{< /aside >}}

### Themes!

There's an abundance of [themes](https://themes.gohugo.io/) to choose from. Choose one you like, but double check that it has good documentation.

PaperMod provides a wealth of configuration tools for this blog. I am in awe at how well-designed this theme is. The theme docs are my first point to go check how to do something different with my blog.

Choosing a good theme is key to starting quickly with Hugo. Common steps to customize Papermod is well-documented in the [FAQ section](https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-faq/).

## Summary
There we have some good jumping off points for you to see what is valuable about Hugo, and how to be productive with Hugo. Refer to the documentation links throughout this post for reference, the key points are:
- Create and publish a Hugo website
- Write lots of markdown content
- A good theme will get you really far
Give it a try and you'll have a good developer blog in no time!