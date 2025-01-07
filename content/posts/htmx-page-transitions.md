+++
date = '2025-01-04T13:52:03+13:00'
draft = false
title = 'How I added page transitions to my hugo blog with htmx'
+++

## The Problem
Page navigation in static websites can be better. Typically, when a user clicks a link, the next page is fetched and the entire content is parsed and loaded, replacing the previous page entirely. Most of the content within the `<head></head>` tag of a web page doesn't change between pages of a website, but the browser will check anyway, and maybe we don't want that. Also, if the next page loads too fast, we may want to show a nice animation during a page transition.

## The Solution
One way of getting around this page navigation issue has been to write a single page application (SPA) instead of a static website. Since I just want to enhance an existing static website (this blog) I will not be changing it to a single page application.

Another popular solution is to change the behavior of links to asynchronously fetch the next page, updating the document `<body>` content without a full page load. This makes page navigation much faster. I'm going to use htmx to achieve that behavior for this blog. This solution can be done in just a few lines of code. Some [helpful blog posts](https://brandonrozek.com/blog/progressive-enhancement-page-transitions-hugo-htmx/) have been written about it, but this post is about how I did it for this blog.

{{< aside >}}
Earlier libraries that pioneered this kind of page navigation include pjax and turbolinks, so it's still common to refer to this navigation technique as *pjax-style* or *turbolinks* navigation.
{{< /aside >}}

I chose htmx as a solution because it is a small JavaScript library that enhances any website with SPA-like behavior. The [boosting](https://htmx.org/docs/#boosting) feature of htmx globally enables asynchronous requesting of body content. A great feature of the boost feature is that it "degrades gracefully", like how an escalator becomes stairs, if something goes wrong in the user's browser. I find htmx attributes easy to use and its conventions easy to follow.

## Customize Hugo Theme

I'm using the [PaperMod](https://adityatelange.github.io/hugo-PaperMod/) theme for my developer blog, so the steps to customize it are somewhat specific to this theme.

### Add htmx

The first step is to add htmx to the website's `<head>` section. I ran this command:

```
curl https://unpkg.com/htmx.org@2.0.4/dist/htmx.min.js > assets/vendor/htmx.min.js
```

This partial `layout/partials/extend_head.html` is automatically included by the theme in the `<head>` during the build process.

```go
// layouts/partials/extend_head.html
{{ with resources.Get "vendor/htmx.min.js" }}
<script src="{{ .RelPermalink }}"></script>
{{ end }}
```

### Edit the base template

Hugo uses a [lookup order](https://gohugo.io/templates/lookup-order/) to determine which layout files to render. In my project I copied the layout from the theme to my layouts folder, preserving the path, so Hugo will use it instead of rendering the theme's original layout file.

I added global boosting to `baseof.html` from the [PaperMod](https://adityatelange.github.io/hugo-PaperMod/) theme. It looks like this once I add `hx-boost` to it:
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

### Add the page transition with CSS

The boosted links will now "swap" asynchronously fetched content into the body. During the [swap process](https://htmx.org/attributes/hx-swap/), htmx adds and removes [CSS classes](https://htmx.org/reference/#classes) that we can use to add some animations.

I only want the `main` element to receive the transition here, so my <header> and <footer> do not flash in and out needlessly. The aim is to keep the transition simple and tasteful here.

```css
main {
  transition: opacity 200ms ease-in;
}

/* htmx automatically adds .htmx-added to new DOM elements when they are swapped in */
main.htmx-added {
  opacity: 0;
}
```

When the main tag is swapped in by htmx, it enters the DOM with `.htmx-added` class that is quickly removed.

## Hold Up
That should be it, right? Well, there is a problem with my theme. It adds a script for the "scroll to top" functionality. I see a strange error in Chrome:

```
Uncaught SyntaxError: Failed to execute 'insertBefore' on 'Node': Identifier 'menu' has already been declared
```

Firefox is a little more clear:
```
Uncaught SyntaxError: redeclaration of let menu
```

The error occurs in a script my theme PaperMod adds to the page in the body tag:
```HTML
<script>
let menu = document.getElementById('menu') // ERROR
if (menu) {
    menu.scrollLeft = localStorage.getItem("menu-scroll-position");
    menu.onscroll = function () {
        localStorage.setItem("menu-scroll-position", menu.scrollLeft);
    }
}
</script>
```
Mysteriously, another script further down the theme's code doesn't throw an error:

```HTML
<script>
var mybutton = document.getElementById("top-link"); // NO ERROR??
window.onscroll = function () {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        mybutton.style.visibility = "visible";
        mybutton.style.opacity = "1";
    } else {
        mybutton.style.visibility = "hidden";
        mybutton.style.opacity = "0";
    }
};
</script>
```

## What's going on?

Our script crashes when using `let` to redeclare a `window` scoped variable. Remember that any variable declared in a `<script></script>` tag is automatically scoped to the `window`. A little gotcha when using this page navigation technique is that the `window` still has the same variables we declared in the last page!

{{< aside >}}
**Gotcha**: Since *only* the body content changes between pages, any variables declared in the `window` scope from the previous page are still there.
{{< /aside >}}

In a normal page transition, this is not a problem, but in our case, the `menu` variable is already in the window scope and is being redeclared with `let` on every page navigation.

Moreover, `var` simply allows you to redeclare it in the same scope, but `let` is stricter and will throw an error if you try to redeclare it in the [same scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#redeclarations)! To fix this I simply copy the `footer.html` from my theme and fix the offending script.

```HTML
<script>
var menu = document.getElementById('menu') // no error!
if (menu) {
    menu.scrollLeft = localStorage.getItem("menu-scroll-position");
    menu.onscroll = function () {
        localStorage.setItem("menu-scroll-position", menu.scrollLeft);
    }
}
</script>
```
By changing the `let` to `var` we keep the code simple and avoid errors. Sometimes the simplest fix is the best one.

```JS
var menu = document.getElementById('menu') // no more error
```

## Conclusion

That's it! My blog gets a little UX boost with the slick page transition, and feels a little bit faster. An important difference between `let` and `var` was revealed in the process.
