import $ from 'jquery'
// import { saveMatch } from './matches'
// import setMark from './setMark'


export default function search(queryParams) {
  const links = []
  const hrefs = new Set()

  $("a").each(function() {
    const href = $(this).attr("href")

    if (href && !isCurrentPageDeepLink(href) && isFirstInstance(href, hrefs)) {
      links.push({
        url: $(this)[0].href,
        href,
      })
    }
  })

  if (links.length) {
    chrome.runtime.sendMessage({
      message: "deep_search_links",
      queryParams,
      links,
    }, deepSearchFinished)
  }
}

// We don't want to download and search a single url twice.
function isFirstInstance(href, hrefs) {
  const isFirst = !hrefs.has(href)
  hrefs.add(href)
  return isFirst
}

// Note: Don't confuse "deep link" with "deep search", the former is where
// `<a href="#some_section">Some Section</a>`. Crawling these entails
// searching the very page you are currently on (which should be done with
// a shallow search).
function isCurrentPageDeepLink(href) {
  return (href.slice(0, 1) === "#")
}

// TODO: Create and deactivate spinner
function deepSearchFinished(response) {
  console.info("deep search finished", response)
}
