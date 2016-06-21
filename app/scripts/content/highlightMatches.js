import $ from 'jquery'
import findAndReplaceDOMText from 'findandreplacedomtext'

export default initialize

function initialize() {
  console.log("highlightMatches initialized")
  // receive message from `popup/default.js:30`
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      // Where `isDeep` is true is handled in `content/matchedLinks.js`
      switch(request.message) {
        case "clear_search":
          clearHighlights()
          break
        case "next_highlight":
          moveCurrentHighlight(1)
          break
        case "prev_highlight":
          moveCurrentHighlight(-1)
          break
        case "submit_search":
          if (request.queryParams && !request.queryParams.isDeep) {
            highlightMatches(request.queryParams)
          }
          break
      }
    }
  )
}

function highlightMatches(queryParams) {
  clearHighlights()

  var flags = 'g'
  if (queryParams.isCaseInsensitive) {
    flags += 'i'
  }
  var find = queryParams.isRegex
    ? new RegExp(queryParams.search, flags)
    : new RegExp(regexEscape(queryParams.search), flags)

  findAndReplaceDOMText($('body')[0], {
    find: find,
    replace: createHighlight
  })

  function regexEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  };
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
  var $newHighlight =
    $(".deepSearch-highlight[data-highlight-index='" + newCurrentIndex() + "']")

  $newHighlight.addClass("deepSearch-current-highlight")
  scrollToHighlight($newHighlight)

  function newCurrentIndex() {
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
    return newIndex
  }

  function scrollToHighlight(highlight) {
    if (highlight.length === 0) {
      return
    }

    var highlight = highlight.first()

    var jumpTo = scrollDestination(highlight)
    if (jumpTo) {
      window.scrollTo(0, jumpTo)
    }

    function scrollDestination(highlight) {
      var top = $("html").scrollTop()
      var bottom = top + $(window).height()
      var highlightPosition = Math.max(highlight.first().offset().top - 36, 0)

      var jumpTo = null
      if (bottom < highlightPosition || highlightPosition < top) {
        jumpTo = highlightPosition
      }
      return jumpTo
    }
  }
}

