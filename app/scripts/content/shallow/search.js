import $ from "jquery"
import findAndReplaceDomText from "findandreplacedomtext"

import buildRegex from "../../shared/buildRegex"
/* import scrollToElement from "./scrollToElement"
 * */

export default function search(queryParams, $elem = $("body")) {
  const regex = buildRegex(queryParams)
  findAndReplaceDomText($elem[0], {
    find: regex,
    replace: createHighlight,
    preset: "prose",
  })

  highlightCurrent()
  /* scrollToElement($(".deepSearch-current-highlight"))*/
}

function createHighlight(portion, match) {
  var wrapped = document.createElement("span")
  wrapped.setAttribute("class", "deepSearch-highlight")
  wrapped.setAttribute("data-highlight-index", match.index)
  wrapped.appendChild(document.createTextNode(portion.text))
  return wrapped
}

function highlightCurrent($highlights = $(".deepSearch-highlight")) {
  const $viewportHighlights = $highlights.filter(isInViewport)
  const $currentHighlight = $viewportHighlights.length === 0 ?
                            $highlights.first() :
                            $viewportHighlights.first()

  $currentHighlight.addClass("deepSearch-current-highlight")
  return $currentHighlight
}

function isInViewport(idx, elem) {
  const viewportHeight = document.documentElement.clientHeight
  const { top, bottom } = elem.getBoundingClientRect()
  return (top >= 0 && bottom < viewportHeight)
}
