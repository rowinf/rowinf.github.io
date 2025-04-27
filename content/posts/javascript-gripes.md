+++
date = '2025-04-24T21:11:36+12:00'
draft = false
title = 'My critique on the state of JavaScript'
+++

Before I can move on to writing about other things, down the line I will want to reference my critique of the JavaScript ecosystem.

I've been a JavaScript developer for a long time, my head was spinning after the CommonJS to ESModules change,
and then React Server Components were released.

## Starting all over again

Even though I had worked on React and Next.js for a long time, if I started a new project,
it would look nothing like the ones I had been working on up until recently.
The packages I worked with before could become abandoned in the post-RSC world.
Most recently, it happend to [styled components](https://github.com/orgs/styled-components/discussions/5568).
I felt like I was starting over again, and might as well learn something new.

I've worked on several React projects and they had almost nothing in common.
Calling something a React app is a bit weird because React is just one part of a patchwork solution.
Every couple of years, a big change in React is released, and the patchwork comes apart in places.
There is then a period of uncertainty and invention as a new patchwork comes together.

I have used React with class components, higher order components, function components, Redux/normalize, Thunks, Sagas, and Redux form. Also hook form, GraphQL, useSWR, Styled Components (!) TypeScript, JavaScript.
For the backend, I've had Firebase, Node/Express, Spring Boot, Fastify (for GraphQL), and Next.js.

Someone with a lot of React experience might find that React alone just isn't good enough anymore, and having worked on a hodgepodge of other technologies doesn't help either.

## Path to production

As far as I can tell, deploying a JavaScript application is tricky, and many people choose specialized cloud platforms and back-end as a service platforms. There are lots of them. I'm not familiar with the ins and outs of these platforms, and they all do very similar things, many with generous free tiers. I haven't personally gone very far down this route, but it feels like vendor lock-in everywhere I look.

## The JavaScript 'Future'

I nod my head in approval as I read the [Epic stack](https://www.epicweb.dev/epic-stack) essay.
An opinionated, prescriptive JavaScript stack that gives you everything you might possibly need?
Analysis paralysis is a big problem in JS world, and Epic stack looks great as a solution to that.
I like Remix and Epic Stack, but it's hard to gauge how that project will go.
A framework is only as strong as the community behind it.
The JavaScript community moves fast, and it's important to keep up or be left behind, but keep up with what? Whom?

## Framework as Community

The productivity boost of a framework helps, but really a framework is a way to build community in the software world.
People come together to share knowledge, stories, and work together. Frameworks give us a shared context to work from.
The framework I choose is going in its own direction, and my project is just along for the ride. Choosing well and sharing
the same journey with others is what makes software development rewarding.
Years of experience with a framework are a proxy for skill that employers use to evaluate candidates,
so they write job ads using this shared context. Frameworks have an organizational role in the software industry.

## Communities Fracture and Vanish

When a community changes too much it starts to fracture. The left-behind members should find different communities.

A community can suffer from a lack of differentiation and dissolve into the ecosystem like jQuery.

This post is more diagnosis than prescription. It's an odd thing to have my niche vanish, but I am currently looking for other communities and ways to stand out as a developer.