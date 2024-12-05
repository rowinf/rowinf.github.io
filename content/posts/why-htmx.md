+++
date = '2024-12-05T13:33:11+13:00'
draft = false
title = 'Why Htmx'
+++

I was asked why I like htmx as a JavaScript library. I like it because it is simple. The killer features are as follows.

## Small Library with a Big Idea
As it closely follows concepts from the REST and HTTP specs, it encourages you to learn the specs. This raises your developer chops, increasing your knowledge of how the web works. Since it adheres to standards, it is backend agnostic, making it useful across projects.  I see htmx as an entirely new class of web application, and htmx is not the only player in this space. These [hypermedia driven applications](https://htmx.org/essays/hypermedia-driven-applications/) require less code and are more aligned with the web in general. The free introductory [htmx book](https://hypermedia.systems) is a good read too.

## JavaScript Friendly
A lot of the JavaScript normally written to asynchronously fetch, display data, and show loading indicators can be replaced with declarative htmx attributes. This results in nice readable code that we've grown used to in the JSX syntax, except in plain html.

While less JavaScript gets written overall, there's likely to be some JavaScript to write. You can use other JavaScript libraries, and that's okay. You don't need to choose from an ecosystem of specially-crafted htmx-compatible JavaScript libraries. You can use Alpine.js, _hyperscript, or even jQuery alongside htmx. Htmx works well with most other JavaScript libraries.

## Stability
The htmx project is older than it looks. It's a rewrite of another library, so the author has worked out many of the issues before creating htmx. The other source of its stability is that it has zero dependencies. The source code is in one file, you can just [go read it](https://github.com/bigskysoftware/htmx/blob/master/src/htmx.js).

## Incrementally Adoptable
Single page applications tended to be all-or-nothing. If you thought you could just embed a React app as an island in a working application, that app tends to grow and take over the whole thing. With htmx, less is more. You can use as much or as little of it as you want.

## Great for Generalists
It takes courage to admit that many specialist JavaScript frameworks in use today are optional. You may want your team to spend time solving business problems instead of framework problems. You might find your whole team will be able to work on the entire stack. You might find that your team can stay small while keeping complexity low. You might find your stack is more beginner friendly and easier to [explain to new developers](https://www.youtube.com/watch?v=aWfYxg-Ypm4). Actual results may vary.

I wish you luck with htmx, I hope you give it a try.
