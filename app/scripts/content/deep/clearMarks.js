import $ from 'jquery'

export default function clearMarks() {
  $('.deepSearch-link-found, .deepSearch-link-not-found').remove()
  global.deepSearchMatches = {}
  chrome.runtime.sendMessage({ message: "clear_queue" })
}
