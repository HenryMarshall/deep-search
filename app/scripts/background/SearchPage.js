import $ from 'jquery'
import buildRegex from '../shared/buildRegex'

export default class SearchPage {
  constructor({
    url,
    href,
    queryParams,
    sendResponse,
  }) {
    this.url = url
    this.href = href
    this.sendResponse = sendResponse

    // Is this the best way? Should I use a getter?
    this.regex = buildRegex(queryParams)
  }

  search(callback) {
    const url = this.url
    const success = this.onSuccess.bind(this)
    const error = this.onError.bind(this)

    $.ajax({
      url,
      datatype: "html",
      success,
      error,
      complete: callback
    })
  }

  onSuccess(response) {
    const text = this.innerText(response)
    let matches = this.globalRegexMatch(text, this.regex)

    this.sendResponse({ status: "received_response", href: this.href, matches })
  }

  globalRegexMatch(text, regex) {
    const matches = []
    let match

    while (match = regex.exec(text)) {
      // TODO: maxContent should be a settable value
      const maxContext = 32
      const contextualized = this.contextualize(text, match, maxContext)
      matches.push(contextualized)
    }

    return matches
  }

  contextualize(text, match, chars) {
    ++chars
    const startingIndex = match.index - chars
    const lastMatchCharacter = match.index + match[0].length
    const endingIndex = lastMatchCharacter + chars

    // Chrome seems to be stripping non-standard properties off arrays when
    // passing them back through `sendResponse`. As such, I wrap the object in 
    // this contextualized object.
    const contextualized = { match }

    // If leadingContext brings us to the beginning, include it all
    contextualized.preceedingContext = startingIndex <= 0 ?
      text.slice(0, match.index) :
      text
        // We grab one extra character to ensure we can cut *around* words
        .slice(startingIndex - 1, match.index)
        .split(/\b/)
        .slice(2)
        .join("")

    // If followingContext brings us to the end, include it all
    contextualized.followingContext = endingIndex + 1 >= text.length ?
      text.slice(endingIndex) :
      text
        .slice(lastMatchCharacter, endingIndex + 1)
        .split(/\b/)
        .slice(0, -2)
        .join("")

    return contextualized
  }

  onError(jqXHR, textStatus, error) {
    this.sendResponse({ status: "not_found", href: this.href })
  }

  innerText(html) {
    // remove head
    const body = html.match(/<\s*body[^>]*>([\s\S]*)<\s*\/\s*body\s*>/)
    return (
      (body ? body[1] : html)
        // inline scripts and their tags
        .replace(/<\s*script[^>]*>[\s\S]*<\s*\/\s*script\s*>/g, "")
        // all tags (including external scripts)
        .replace(/<[^>]+>/g, "")
        // line breaks
        .replace(/(\r?\n){2,}/g, "\n")
        .trim()
    )
  }
}
