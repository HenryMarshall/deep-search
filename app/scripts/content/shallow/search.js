import $ from "jquery"
import findAndReplaceDomText from "findandreplacedomtext"

import buildRegex from "../../shared/buildRegex"
import scrollToElement from "./scrollToElement"


export default function search(queryParams) {
  const $body = $("body")
  const bodyDouble = $body.clone(true)[0]
  findAndReplaceDomText(bodyDouble, {
    find: buildRegex(queryParams),
    replace: createHighlight,
    preset: "prose",
    // filterElements,
  })
  $body.replaceWith(bodyDouble)
  scrollToElement($(".deepSearch-current-highlight"))
}

function createHighlight(portion, match) {
  var wrapped = document.createElement("span")
  var wrappedClasses = "deepSearch-highlight"
  if (match.index === 0) {
    wrappedClasses += " deepSearch-current-highlight"
  }
  wrapped.setAttribute("class", wrappedClasses)
  wrapped.setAttribute("data-highlight-index", match.index)
  wrapped.appendChild(document.createTextNode(portion.text))
  return wrapped
}

function filterElements(elem) {
  const $elem = $(elem)
  return $elem.is(":visible") && !$elem.attr("aria-hidden")
}
