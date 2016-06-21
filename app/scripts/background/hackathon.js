import $ from 'jquery'
import { stripHtml } from './searchUrl'

export default setupListener;

function setupListener() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.queryParams && 
          request.queryParams.isDeep && 
          request.message === "page_search") {
        console.log("receive getHTML message", request)
        getHTML(
          request.url,
          searchHTML(request.href, request.queryParams, sendResponse)
        );
      }
    }
  );
}

function getHTML(url, callback) {
  $.ajax({
    url: url,
    datatype: "html",
    success: callback,
    error: function(err) {
      console.error(url, err);
    }
  });
}

function searchHTML(href, queryParams, sendResponse) {
  return function(response) {
    const { isCaseInsensitive, isRegex, search } = queryParams

    const text = stripHtml(response)
    const regex = isRegex ? search : regexEscape(search)
    const regexFlags = isCaseInsensitive ? "gi" : "g";

    const found = text.match(new RegExp(regex, regexFlags))

    sendResponse()
    notifyContentOfMessage({ 
      message: "checked_url", 
      href: href,
      matchesFound: found
    })
  }
}

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


// FIXME: DRY me out
function notifyContentOfMessage(message) {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function(tabs) {
      var activeTab = tabs[0]
      console.log("message sent")
      chrome.tabs.sendMessage(activeTab.id, message)
    }
  )
}
