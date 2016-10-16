import $ from "jquery"
import search from "../shared/searchHtml"

export default function searchAddress({
  queryParams,
  href,
  url,
  sendResponse,
  callback,
}) {
  $.ajax({
    url,
    datatype: "html",
    success(response) {
      const matches = search(response, queryParams)
      sendResponse({ status: "received_response", href, matches })
    },
    error(jqXHR, textStatus, error) {
      sendResponse({ status: "not_found", href })
    },
    complete: callback,
  })
}

