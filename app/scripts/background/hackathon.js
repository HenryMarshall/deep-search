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
    response = response.replace(/[\s\S]*<\s*body[^>]*>([\s\S]*)<\s*\/\s*body\s*>[\s\S]*/, "$1");
    response = response.replace(/<\s*script[^>]*>[\s\S]*<\s*\/\s*script\s*>/g, "");
    response = response.replace(/<\s*script[^>]*\/\s*>/g, "");
    response = response.replace(/<[^>]+>/g, "");
    response = response.replace(/(\r?\n){2,}/g, "$1");

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

var defaultSearch = {
  "#deepSearch-search": "",
  "#is-regex": false,
  "#is-deep": false,
  "#is-case-insensitive": false
}
var currentSearch = cloneObj(defaultSearch)

function cloneObj(obj) {
  console.log("clonedObj")
  var clone = {}
  Object.keys(obj).forEach(function(key) {
    clone[key] = obj[key]
  })
  return clone
}

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
