// receive message from `popup/default.js:30`
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // Where `isDeep` is true is handled in `content/matchedLinks.js`
    if (!request.fields.isDeep) {
      switch(request.message) {
        case "submit_search":
          highlightMatches(request.fields)
          break
        case "clear_search":
          clearHighlights()
          break
        case "next_highlight":
          moveCurrentHighlight(1)
          break
        case "prev_highlight":
          moveCurrentHighlight(-1)
          break
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

function moveCurrentHighlight(moveDirection) {
  var oldIndex = $(".deepSearch-current-highlight")
    .removeClass("deepSearch-current-highlight")
    .attr('data-highlight-index')

  var maxIndex = $(".deepSearch-highlight")
    .last()
    .attr('data-highlight-index')

  var newIndex = Number(oldIndex) + moveDirection
  if (newIndex < 0) {
    newIndex = maxIndex
  }
  else if (newIndex > maxIndex) {
    newIndex = 0
  }
  $(".deepSearch-highlight[data-highlight-index='" + newIndex + "']")
    .addClass("deepSearch-current-highlight")
}
