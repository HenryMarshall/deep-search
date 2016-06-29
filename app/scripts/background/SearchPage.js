import $ from 'jquery'

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
    this.regex = this.buildRegex(queryParams)
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

  buildRegex(queryParams) {
    const { isCaseInsensitive, isRegex, search } = queryParams
    const regex = isRegex ? search : this.regexEscape(search)
    const regexFlags = isCaseInsensitive ? "gi" : "g";
    return new RegExp(regex, regexFlags)
  }

  onSuccess(response) {
    const text = this.innerText(response)
    const matches = text.match(this.regex)
    this.sendResponse({ status: "received_response", href: this.href, matches })
  }

  onError(jqXHR, textStatus, error) {
    this.sendResponse({ status: "not_found", href: this.href })
  }

  innerText(html) {
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

  regexEscape(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
}
