import $ from "jquery"
import findAndReplaceDomText from "findandreplacedomtext"

import buildRegex from "../../shared/buildRegex"
import isInViewport from "./isInViewport"
import scrollToElement from "./scrollToElement"


export default function search(queryParams, $elem = $("body")) {
  const regex = buildRegex(queryParams)
  findAndReplaceDomText($elem[0], {
    find: regex,
    replace: createHighlight,
    preset: "prose",
  })

  const $current = chooseCurrent()
  $current.addClass("deepSearch-current-highlight")
  scrollToElement($current)
}

function createHighlight(portion, match) {
  var wrapped = document.createElement("span")
  wrapped.setAttribute("class", "deepSearch-highlight")
  wrapped.setAttribute("data-highlight-index", match.index)
  wrapped.appendChild(document.createTextNode(portion.text))
  return wrapped
}

function chooseCurrent($highlights = $(".deepSearch-highlight")) {
  const $viewportHighlights = $highlights.filter(isInViewport)
                                         .filter(":visible")

  const $relevantHighlights = $viewportHighlights.length === 0 ?
                              $highlights.filter(":visible") :
                              $viewportHighlights

  return firstVisible($relevantHighlights)
}

// A single highlight can be composed of multiple elements. We can't
// simply use .first() as that would only get a single portion.
function firstVisible($elements) {
  const targetIndex = $elements.first().attr("data-highlight-index")
  return $elements.filter(`[data-highlight-index=${targetIndex}]`)
}
