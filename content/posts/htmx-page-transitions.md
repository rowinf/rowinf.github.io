+++
date = '2025-01-04T13:52:03+13:00'
draft = false
title = 'Htmx Page Transitions'
+++

How I added page transitions to this blog with htmx.

I found a [helpful blog](https://brandonrozek.com/blog/progressive-enhancement-page-transitions-hugo-htmx/) but ultimately this is about how I did it.

In Hugo, when you want to customize your theme, you usually need to find the part of the theme you want to customize. You then copy that file into your `layouts` directory. Then add your customizations to the copied file. Hugo has a lookup order to layout files so your copied file will receive higher priority in the load order.

When navigating between pages on a website, there is an optimization technique that makes page changes a little bit faster originally known as pjax, but used in htmx by adding `hx-boost="true"` to the body tag of the html document. Doing this optimizes page navigation by swapping out the document body instead of loading the entire page. [htmx documents](https://htmx.org/docs/#boosting) exactly what this does. The idea is this avoids re-requesting a lot of the page resources found in the `<head></head>` of the document.

The layout file I'm customizing for PaperMod is named `baseof.html` and it looks like this:
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

To add a simple opacity transition for page navigation, I added this to my main css file. I only want the `main` element to receive the transition here, since the header and footer aren't changing between pages in my case. The aim is to keep it simple here.

```css
main {
  transition: opacity 200ms ease-in;
}

main.htmx-added {
  opacity: 0;
}
```

That's it! My blog feels like it navigates a little faster and the UX gets a little boost with the page transition.
