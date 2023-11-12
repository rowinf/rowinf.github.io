---
layout: post
title: "Goldilocks makes a website"
date: 2023-11-03 21:30:00 +1200
---

It's not commonly part of the story, but while at the three bears house, Goldilocks tried to make a website.

First she tried Papa bear's computer. Papa bear makes websites with HTML, CSS, and JavaScript. It was a simple way to build, but seemed to fall apart when a website needed a lot of interactivity and had to do lots of fetching from JSON APIs to dynamically show new content in response to user interactions. Papa bear uses a simple backend that queries a database and renders HTML.

Then, she tried Mama bear's computer. Mama bear makes Single Page Applications (SPAs) with a modern JavaScript framework.
Mama bear writes her code for a framework, which in turn, updates the DOM using a highly optimised algorithm that diffs what her code should look like in the browser with the current state of the DOM and goes and updates everything automatically. It's a fine way to make a website and it handles interactivity really well, but it leaves something to be desired. The browser has become a very advanced piece of software and her framework has lagged behind. Mama bear's JavaScript payload is too high and she can never seem to find the time to properly do bundle splitting on her website. Furthermore, as browsers have advanced, much of the benefit to building Single Page Applications have become baked into the browser and are now redundant.

Finally, she tried Baby bear's computer. Baby bear builds Hypermedia Driven Applications (HDAs). Baby bear does not load his website with lots of JavaScript, but somehow he's able to handle bits of interactivity effortlessly, as the behaviour is coded directly into the HTML. Baby bear does not use JSON at all, he does AJAX requests with HTML fragments served from his simple backend server. Most of his code lives on the backend. Baby bear finds that HTMX does not do everything, so he uses the occasional native web component. Baby bear does not use a build process. Baby bear can build and ship effortlessly and does not find himself with lots of tech debt.

Baby bear's website is just right.

