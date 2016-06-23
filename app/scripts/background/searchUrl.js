import $ from 'jquery'
import messageContent from '../shared/messageContent'

export function getHtml(url, sendResponse, callback) {
  $.ajax({
    url: url,
    datatype: "html",
    success: callback,
    error: (err) => { console.error(url, err) },
    complete: () => { sendResponse() }
  })
}

export function searchHtml(href, queryParams) {
  const { isCaseInsensitive, isRegex, search } = queryParams

  return function(response) {
    const text = stripHtml(response)
    const regex = isRegex ? search : regexEscape(search)
    const regexFlags = isCaseInsensitive ? "gi" : "g";

    const matches = text.match(new RegExp(regex, regexFlags))
    messageContent({ message: "checked_url", href, matches })
  }
}

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// exported for testing purposes
export function stripHtml(html) {
  const body = html.match(/<\s*body[^>]*>([\s\S]*)<\s*\/\s*body\s*>/)
  return (
    (body ? body[1] : html)
      .replace(/<\s*script[^>]*>[\s\S]*<\s*\/\s*script\s*>/g, "")
      .replace(/<\s*script[^>]*\/\s*>/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/(\r?\n){2,}/g, "\n")
      .trim()
  )
}

