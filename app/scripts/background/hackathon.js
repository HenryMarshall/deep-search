import $ from 'jquery'
import { stripHtml } from './searchUrl'

export default setupListener;

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

function searchHTML(href, queryParams, sendResponse) {
  return function(response) {
    var res = {
      found: {}
    }
    // response = response.replace(/<\s*body[^>]*>([\s\S]*)<\s*\/\s*body\s*>/, "$1");
    // response = response.replace(/<\s*script[^>]*>[\s\S]*<\s*\/\s*script\s*>/g, "");
    // response = response.replace(/<\s*script[^>]*\/\s*>/g, "");
    // response = response.replace(/<[^>]+>/g, "");
    // response = response.replace(/(\r?\n){2,}/g, "\n");
    
    response = stripHtml(response)

    var regexFlags = queryParams.isCaseInsensitive ? "gi" : "g";
    if (queryParams.isRegex) {
      var regExp = new RegExp(queryParams.search, regexFlags);
      res.found = response.match(regExp);
    } 
    else {
      var plainSearch = new RegExp(regexEscape(queryParams.search), regexFlags);
      res.found = response.match(plainSearch);
    }

    sendResponse()
    notifyContentOfMessage({ 
      message: "checked_url", 
      href: href,
      matchesFound: res.found 
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
