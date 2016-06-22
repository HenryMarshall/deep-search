import $ from 'jquery'
import findAndReplaceDomText from 'findandreplacedomtext'

export default function search(queryParams) {
  const { isCaseInsensitive, isRegex, search } = queryParams
  const flags = isCaseInsensitive ? 'gi' : 'g'
  const reg = new RegExp(isRegex ? search : regexEscape(search), flags)

  findAndReplaceDomText($('body')[0], {
    find: reg,
    replace: createHighlight
  })
}

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}

function createHighlight(portion, match) {
  var wrapped = document.createElement("span")
  var wrappedClasses = 'deepSearch-highlight'
  if (match.index === 0) {
    wrappedClasses += ' deepSearch-current-highlight'
  }
  wrapped.setAttribute('class', wrappedClasses)
  wrapped.setAttribute('data-highlight-index', match.index)
  wrapped.appendChild(document.createTextNode(portion.text))
  return wrapped
}
