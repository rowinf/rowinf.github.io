+++
date = '2025-01-04T13:52:03+13:00'
draft = false
title = 'How I added page transitions to my hugo blog with htmx'
+++

## The Problem
Page navigation in static websites can be better. Typically, when a user clicks a link, the next page is fetched and the entire content is parsed and loaded, replacing the previous page entirely. Most content in the `<head></head>` of a web page doesn't change between pages of a website, but the browser will check anyway, and maybe we don't want that. Also, if the next page loads too fast, we may want to show a nice animation during a page transition.

## The Solution
One way of getting around this page navigation issue has been to write a single page application (SPA) instead of a static website. I just want to enhance an existing static website (this blog) so I will not be changing it to a single page application.

Another popular solution is to change the behavior of links to make asynchronous requests, and only update the body content in the browser from the response. This makes page navigation much faster. I'm going to use htmx to achieve that behavior for this blog. This solution can be done in just a few lines of code. Some [helpful blog posts](https://brandonrozek.com/blog/progressive-enhancement-page-transitions-hugo-htmx/) have been written about it but this is about how I did it in this blog.

## Customize Hugo Theme

In Hugo, when you want to customize your theme, you usually need to find the part of the theme you want to customize. You then copy that file into your `layouts` directory. Then add your customizations to the copied file. Hugo has a lookup order to layout files so your copied file will receive higher priority in the load order.

I used the [boosting](https://htmx.org/docs/#boosting) feature of htmx to globally enable asynchronous requesting of body content. A great feature of the boost feature is that it "degrades gracefully", like how an escalator becomes stairs, if something goes wrong in the user's browser.

The layout file I'm customizing for [PaperMod](https://adityatelange.github.io/hugo-PaperMod/) is named `baseof.html` and it looks like this once I add `hx-boost` to it:
```go
<body class="
{{- if (or (ne .Kind `page` ) (eq .Layout `archives`) (eq .Layout `search`)) -}}
{{- print "list" -}}
{{- end -}}
{{- if eq site.Params.defaultTheme `dark` -}}
{{- print " dark" }}
{{- end -}}
" id="top"
hx-boost="true"
>
    {{- partialCached "header.html" . .Page -}}
    <main class="main">
        {{- block "main" . }}{{ end }}
    </main>
    {{ partialCached "footer.html" . .Layout .Kind (.Param "hideFooter") (.Param "ShowCodeCopyButtons") -}}
</body>
```

It's nice that it's a small file with exactly what I need to change to add global boosting.

To add a little opacity transition for page navigation, I added this to my main css file. I only want the `main` element to receive the transition here, since the header and footer aren't changing between pages in my case. The aim is to keep it simple and tasteful here.

```css
main {
  transition: opacity 200ms ease-in;
}

main.htmx-added {
  opacity: 0;
}
```

## Hold Up
That should be it, right? Well, there is a problem with my theme. It adds a script for the "scroll to top" functionality. I see a strange error in Chrome:

```
Uncaught SyntaxError: Failed to execute 'insertBefore' on 'Node': Identifier 'menu' has already been declared
```

Firefox is a little more clear:
```
Uncaught SyntaxError: redeclaration of let menu
```

The problem is a script my theme PaperMod adds to the page in the body tag:
```JS
let menu = document.getElementById('menu')
if (menu) {
    menu.scrollLeft = localStorage.getItem("menu-scroll-position");
    menu.onscroll = function () {
        localStorage.setItem("menu-scroll-position", menu.scrollLeft);
    }
}
```
This script runs every page transition. In a normal page transition, this is not a problem, but in our case, the `menu` variable is already declared and is being redeclared with `let` on every page navigation. The result of this error is degraded scroll to top behavior. More perplexing is that another script further down the theme's code looks like is not throwing any error because it is declaring a variable with `var`:

```JS
var mybutton = document.getElementById("top-link");
window.onscroll = function () {
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {
        mybutton.style.visibility = "visible";
        mybutton.style.opacity = "1";
    } else {
        mybutton.style.visibility = "hidden";
        mybutton.style.opacity = "0";
    }
};
```

It turns out that `var` simply allows you to redeclare it in the same scope, but `let` is stricter and will throw an error if you try to redeclare it in the [same scope](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#redeclarations)! To fix this I simply copy the `footer.html` from my theme and fix the offending script.

## Conclusion

That's it! My blog feels like it navigates a little faster and the UX gets a little boost with the slick page transition.
