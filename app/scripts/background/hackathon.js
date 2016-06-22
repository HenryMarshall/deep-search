import $ from 'jquery'
import { stripHtml } from './searchUrl'
import messageContent from '../shared/messageContent'

export default setupListener;

function setupListener() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      const { message, queryParams, url, href } = request
      if (queryParams && queryParams.isDeep && message === "page_search") {
        getHTML(url, sendResponse, searchHTML(url, href, queryParams))
      }
    }
  )
}

function getHTML(url, sendResponse, callback) {
  $.ajax({
    url: url,
    datatype: "html",
    success: callback,
    error: (err) => { console.error(url, err) },
    complete: () => { sendResponse() }
  })
}

function searchHTML(url, href, queryParams) {
  const { isCaseInsensitive, isRegex, search } = queryParams

  return function(response) {
    const text = stripHtml(response)
    const regex = isRegex ? search : regexEscape(search)
    const regexFlags = isCaseInsensitive ? "gi" : "g";

    const matches = text.match(new RegExp(regex, regexFlags))
    messageContent({ message: "checked_url", url, href, matches })
  }
}

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

