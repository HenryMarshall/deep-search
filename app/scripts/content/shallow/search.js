import $ from "jquery"
import findAndReplaceDomText from "findandreplacedomtext"

import buildRegex from "../../shared/buildRegex"
import isInViewport from "./isInViewport"
import scrollToElement from "./scrollToElement"

import groupBy from "./groupBy"
$.fn.groupBy = groupBy
$.fn.every = function(predicate) {
  const filtered = this.filter(predicate)
  return this.length === filtered.length
}

export default function search(queryParams, $elem = $("body")) {
  const regex = buildRegex(queryParams)
  findAndReplaceDomText($elem[0], {
    find: regex,
    replace: createHighlight,
    preset: "prose",
  })

  const groups = $(".deepSearch-highlight")
    .groupBy("data-highlight-index")
    .filter($element => $element.is(":visible"))

  // When searching we give deference to results already in your viewport,
  // which is the same behavior as in the default chrome search.
  const $firstInViewport = groups.filter(allInViewport)[0]
  const currentResult =
    $firstInViewport ? groups.indexOf($firstInViewport) : 0
  const $current = groups[currentResult]

  $current.addClass("deepSearch-current-highlight")
  scrollToElement($current)

  return groups
}

function createHighlight(portion, match) {
  var wrapped = document.createElement("span")
  wrapped.setAttribute("class", "deepSearch-highlight")
  wrapped.setAttribute("data-highlight-index", match.index)
  wrapped.appendChild(document.createTextNode(portion.text))
  return wrapped
}

function allInViewport($group) {
  return $group.toArray().every(isInViewport)
}
