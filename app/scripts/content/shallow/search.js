import findAndReplaceDomText from "findandreplacedomtext"
import buildRegex from "../../shared/buildRegex"

export default function search($elem, queryParams) {
  const html = $elem[0]
  findAndReplaceDomText(html, {
    find: buildRegex(queryParams),
    replace: createHighlight,
    preset: "prose",
  })
  return html
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

