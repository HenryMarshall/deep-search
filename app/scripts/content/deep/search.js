import $ from 'jquery'
import { saveMatch } from './matches'
import setMark from './setMark'

export default function search(queryParams) {
  $("a").each(function() {
    const url = $(this)[0].href
    const href = $(this).attr("href")
    if (href && !isCurrentPageDeepLink(href)) {
      chrome.runtime.sendMessage({
        message: "page_search",
        queryParams,
        url,
        href
      }, onSearched)
    }
  })
}

// Note: Don't confuse "deep link" with "deep search", the former is where
// `<a href="#some_section">Some Section</a>`. Crawling these entails
// searching the very page you are currently on (which should be done with
// a shallow search).
function isCurrentPageDeepLink(href) {
  return (href.slice(0,1) === "#")
}

function onSearched(response) {
  if (response) { 
    const { status, href, matches } = response
    saveMatch(href, matches)
    setMark(href, matches)
  }
  else {
    // TODO: Sometimes `sendResponse` is called implicitly. Why?
    console.error("sendResponse implicitly called")
  }
}
