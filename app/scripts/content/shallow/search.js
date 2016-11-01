import $ from "jquery"
import findAndReplaceDomText from "findandreplacedomtext"

import buildRegex from "../../shared/buildRegex"
import scrollToElement from "./scrollToElement"


export default function search(queryParams) {
  const regex = buildRegex(queryParams)
  findAndReplaceDomText($('body')[0], {
    find: regex,
    replace: createHighlight,
    preset: "prose",
  })
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

