module.exports = {
  meta: {
    title: "My Github Portfolio",
    description: "My Github projects",
    lang: "en",
    siteUrl: "https://rowinf.github.io/gh-portfolio/",
  },
  feed: { // used in feed.xml.njk
    subtitle: "My Github projects",
    filename: "atom.xml",
    path: "/atom.xml",
    id: "https://rowinf.github.io/gh-portfolio",
    authorName: "Rob Irwin",
    authorEmail: "robert.irwin@outlook.co.nz"
  },
  hero: { // used in hero section of main page ie. index.html.njk
    title: "Welcome to my Github portfolio",
    description: "A list of my Github projects"
  }
}
