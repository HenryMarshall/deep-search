// receive message from `popup/default.js:30`
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Where `isDeep` is true is handled in `content/matchedLinks.js`
    console.log("a message received", request)
    if (!request.fields.isDeep) {
      if (request.message === "submit_query") {
        console.log("submit_query received")
        highlightMatches(request.fields)
      }
      else if (request.message === "clear_query") {
        console.log("clear query received")
        clearHighlights()
      }
    }
  }
)

function highlightMatches(queryParams) {
  debugger
  clearHighlights()

  var find = queryParams.isRegex
    ? new RegExp(queryParams.search, 'g')
    : queryParams.search

  var wrapper = document.createElement("span")
  wrapper.setAttribute('class', 'deepSearch-highlight')

  findAndReplaceDOMText($('body')[0], {
    find: find,
    wrap: wrapper
  })
}

function clearHighlights() {
  $(".deepSearch-highlight").each(function() {
    $(this).replaceWith($(this).html())
  })
}
