import $ from 'jquery'

export default function search(queryParams) {
  $("a").each(function() {
    const href = $(this)[0].href
    if (href && !isCurrentPageDeepLink(this)) {
      chrome.runtime.sendMessage({
        message: "page_search",
        queryParams,
        url: href
      })
    }
  })
}

// Note: Don't confuse "deep link" with "deep search", the former is where
// `<a href="#some_section">Some Section</a>`. Crawling these entails
// searching the very page you are currently on (which should be done with
// a shallow search).
function isCurrentPageDeepLink(link) {
  const attr = $(link).attr("href")
  return (attr.slice(0,1) === "#")
}
