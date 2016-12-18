import $ from "jquery"

export default function clearMarks($elem = $("body")) {
  // If the previous search hasn't finished running, results will continue
  // coming in unless the queue is cleared.
  chrome.runtime.sendMessage({ message: "clear_queue" })
  global.deepSearchMatches = {}

  $elem
    .find(".deepSearch-link-found, .deepSearch-link-not-found")
    .remove()

  return $elem
}
