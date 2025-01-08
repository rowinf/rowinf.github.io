+++
date = '2025-01-06T13:04:21+13:00'
draft = true
title = 'Choosing Hugo'
showtoc = true
ShowBreadCrumbs = true
tags = ['hugo']
+++

This blog is written with [Hugo](https://gohugo.io/). The choice was originally inspired by my interest in Golang. A blog is a valuable way to keep notes on your developer journey.

<!--more-->

## Self hosting a blog {{< fa "code" >}}

I wanted to self host a blog to preserve the uniqueness of my voice. Medium may improve reach, but I want to find my voice first by writing lots of content and being free to experiment. I also want to experiment with tools and technologies along the way.

### Migrating from Jekyll to Hugo

Initially I did not attempt to customize much of my blog because I found the documentation overwhelming, I didn't know Go yet, and I was wondering if I was too hasty to drop Jekyll. A success story from [Low Tech Magazine](https://solar.lowtechmagazine.com/2023/06/rebuilding-a-solar-powered-website/) inspired me further. 

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
    -  Basic configuration
3.  [Deploy to Github pages](https://gohugo.io/hosting-and-deployment/hosting-on-github/) 

Follow it up with questions about what to do next. If you don't have questions, write more content! Some ideas:
- Tag your posts
- Use some shortcodes in your content
- Add a chart to your content
- Configure social media OG meta tags
- Add another content archetype
- Add a favicon
- [Choose a different theme](https://themes.gohugo.io/)
- Write a new shortcode
- Add font awesome icons

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

### Themes!

A theme is key to starting quickly with Hugo, choose your theme and make sure it's well documented, most of what you will need to do is there! Common steps to customize Papermod is well-documented in the [FAQ section](https://adityatelange.github.io/hugo-PaperMod/posts/papermod/papermod-faq/).

#### Markdown
Markdown is the default editing experience with Hugo and it uses a Go implementation called [Goldmark](https://github.com/yuin/goldmark/).

#### Diagrams
Hugo supports a diagram syntax called GoAT.
```goat
      .               .                .               .--- 1          .-- 1     / 1
     / \              |                |           .---+            .-+         +
    /   \         .---+---.         .--+--.        |   '--- 2      |   '-- 2   / \ 2
   +     +        |       |        |       |    ---+            ---+          +
  / \   / \     .-+-.   .-+-.     .+.     .+.      |   .--- 3      |   .-- 3   \ / 3
 /   \ /   \    |   |   |   |    |   |   |   |     '---+            '-+         +
 1   2 3   4    1   2   3   4    1   2   3   4         '--- 4          '-- 4     \ 4

```

### Golang

Golang Templates have a simple syntax. It's interesting that some variable names start with a dot, and you can just pass a dot as an argument to a block or partial.

### Shortcodes

[Shortcodes](https://github.com/yuin/goldmark/) give us more utility beyond the basic Markdown syntax. For example, I want to make a callout box that cuts through the normal content with `<aside>` tags.

```go
<aside>
  {{ .Inner | markdownify }}
</aside>
```

{{< aside >}}
I can now use the aside in content and it looks like this.
{{< /aside >}}

```go
{{% aside %}}
I can now use the aside in content and it looks like this.
{{% /aside %}}
```

## Customize

