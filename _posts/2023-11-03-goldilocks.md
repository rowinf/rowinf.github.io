---
layout: post
title: "Goldilocks makes a website"
date: 2023-11-03 21:30:00 +1200
---

It's not commonly part of the story, but while at the three bears house, Goldilocks tried to make a website.

First she logged on to Papa bear's computer. Papa bear makes websites the old school way with HTML, CSS, and JavaScript. It was a simple way to build, but seemed to fall apart when a website needed a lot of interactivity and had to do lots of fetching from JSON APIs to dynamically show new content in response to user interactions.

Then, she tried Mama bear's computer. Mama bear uses a modern JavaScript framework to build Single Page Applications (SPAs).

Mama bear lets the framework handle a lot of work for her. It handles interactivity and JSON APIs really well, but still leaves something to be desired. Mama bear's website has a low Core Web Vitals score because she's shipping 2MBs of JavaScript, and the layout of her website shifts a lot while loading. She struggles to keep up with the constantly evolving framework concepts and build tools.

Finally, she tried Baby bear's computer. Baby bear builds Hypermedia Driven Applications (HDAs).

Baby bear uses HTML, CSS, and JS. Instead of working with a framework, he enhances the hypermedia with Web Components and HTMX. Baby bear does not use JSON, but loads HTML fragments from his backend server. Most of his code lives on the backend, in fact. Baby bear does not have a build pipeline like a modern framework might, and he doesn't need to load very much JavaScript.

Baby bear's website is just right.
