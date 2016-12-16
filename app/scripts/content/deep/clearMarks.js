import $ from 'jquery'

export default function clearMarks() {
  // If the previous search hasn't finished running, results will continue
  // coming in unless the queue is cleared.
  chrome.runtime.sendMessage({ message: "clear_queue" })

  const $body = $("body")
  const $bodyDouble = $body.clone()
  $bodyDouble
    .find(".deepSearch-link-found, .deepSearch-link-not-found")
    .remove()
  $body.replaceWith($bodyDouble)

  global.deepSearchMatches = {}
}
