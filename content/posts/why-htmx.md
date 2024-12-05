+++
date = '2024-12-05T13:33:11+13:00'
draft = false
title = 'Why Htmx'
+++

I was asked why I like htmx as a JavaScript library. I like it because it is simple. The killer features are as follows.

## Stability
The htmx project is older than it looks. It's a rewrite of another library, so the author has worked out many of the issues before creating htmx. The other source of its stability is that it has zero dependencies. The source code is in one file, you can just [go read it](https://github.com/bigskysoftware/htmx/blob/master/src/htmx.js).

## Adheres to Standards
As it follows the specs in REST and HTTP specs, it encourages you to learn the specs. This raises your developer chops, increasing your knowledge of how the web works. Since it adheres to standards, it is backend agnostic, making it useful across projects.

## Incrementally Adoptable
Single page applications tended to be all-or-nothing. If you thought you could just embed a React app as an island in a working application, that app tends to grow and take over the whole thing. With htmx, less is more. You can use as much or as little of it as you want. 

## Cross Compatible
You will need to use other JavaScript libraries, and that's okay. The great thing is that you don't need to choose from specially-crafted htmx-compatible JavaScript libraries. You can use Alpine.js, _hyperscript, or even jQuery.

## Great for Generalists
You will not have to fill your team up with specialists. Because it's so simple, you might find your whole team will be able to work on the entire stack. Plain HTML is easy for beginners and becomes more powerful every year with some newer features like [dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) and [popover](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/popover). Newer JavaScript features like [moveBefore()](https://htmx.org/examples/move-before/) enable behavior that wasn't possible except with a JavaScript framework.
