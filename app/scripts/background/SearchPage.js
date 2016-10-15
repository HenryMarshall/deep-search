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
    let matches = globalRegexMatch(text, this.regex)

    this.sendResponse({ status: "received_response", href: this.href, matches })
  }

  globalRegexMatch(text, regex) {
    const matches = []
    let match

    while (match = regex.exec(input)) {
      matches.push(matches)
    }

    return matches
  }

  contextualize(text, match, chars) {
    match.context = text
    return match
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
