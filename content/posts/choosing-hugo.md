+++
date = '2025-01-06T13:04:21+13:00'
draft = true
title = 'Choosing Hugo'
+++

## Static Site Generator

There are many static site generators (SSG) to choose from. Careful consideration of your own needs can get you started on the right path. Common use cases for static site generators are simple blogs and documentation websites. People choose static site generators because they don't want a full-featured content management system (CMS), but they still want the nice editing experience that markdown provides. A SSG can be easy enough to start with, but the number of features and configuration options can be daunting.

## Learning Hugo

This blog is written with [Hugo](https://gohugo.io/). The choice was originally inspired by my interest in Golang. Initially I did not attempt to customize much of my blog because I found the documentation overwhelming, I didn't know Go yet, and I was wondering if I was too hasty to drop Jekyll. A success story from [Low Tech Magazine](https://solar.lowtechmagazine.com/2023/06/rebuilding-a-solar-powered-website/) inspired me further. After taking the time to learn Go, I find that I better understand the theme's code, and I'm more comfortable with changing the theme. Now I really enjoy the blazing speed of Hugo.

## Developer Blog

I chose the PaperMod because of its simple design and powerful configuration options for my developer blog. This is a static blog with content I want to add through my normal usage of text editors or through GitHub directly. The blog is published to GitHub Pages, a free hosting service supported in Hugo's configuration.

## Features

Hugo has powerful features, but it also has some less powerful features that are very easy to get started with.

{{< aside >}}
**Note**: Your experience with Hugo will improve if you get more familiar with the basic features of Hugo before jumping into the more advanced features!
{{< /aside >}}

### Basics

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

```go
<body class="... theme ..." id="top"
hx-boost="true"
>
    {{- partialCached "header.html" . .Page -}}
    <main class="main">
        {{- block "main" . }}{{ end }}
    </main>
    {{ partialCached "footer.html" . .Layout .Kind (.Param "hideFooter") (.Param "ShowCodeCopyButtons") -}}
</body>
```

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

