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
  const $currentHighlight = $viewportHighlights.length === 0 ?
                            $highlights.first() :
                            $viewportHighlights.first()

  return $currentHighlight
}
