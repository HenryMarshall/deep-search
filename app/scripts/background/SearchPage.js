import $ from "jquery"
import search from "../shared/searchHtml"

export default class SearchPage {
  constructor(props) {
    this.url = props.url
    this.href = props.href
    this.sendResponse = props.sendResponse
    this.queryParams = props.queryParams
  }

  process(callback) {
    $.ajax({
      url: this.url,
      datatype: "html",
      success: this.onSuccess.bind(this),
      error: this.onError.bind(this),
      complete: callback
    })
  }

  onSuccess(response) {
    const matches = search(response, this.queryParams)
    this.sendResponse({ status: "received_response", href: this.href, matches })
  }

  onError(jqXHR, textStatus, error) {
    this.sendResponse({ status: "not_found", href: this.href })
  }
}
