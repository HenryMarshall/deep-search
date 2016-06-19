// receive message from `popup/default.js:30`
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Where `isDeep` is true is handled in `content/matchedLinks.js`
    if (!request.fields.isDeep) {
      if (request.message === "submit_query") {
        highlightMatches(request.fields)
      }
      else if (request.message === "clear_query") {
        clearHighlights()
      }
    }
  }
)

function highlightMatches(queryParams) {
  clearHighlights()

  var find = queryParams.isRegex
    ? new RegExp(queryParams.search, 'g')
    : queryParams.search

  findAndReplaceDOMText($('body')[0], {
    find: find,
    replace: createHighlight
  })
}

function createHighlight(portion, match) {
  var wrapper = document.createElement("span")
  var wrapperClasses = 'deepSearch-highlight'
  if (match.index === 0) {
    wrapperClasses += ' deepSearch-current-highlight'
  }
  wrapper.setAttribute('class', wrapperClasses)
  wrapper.setAttribute('data-highlight-index', match.index)
  wrapper.appendChild(document.createTextNode(portion.text))
  return wrapper
}

function clearHighlights() {
  $(".deepSearch-highlight").each(function() {
    $(this).replaceWith($(this).html())
  })
}
