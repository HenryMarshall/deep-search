setupListener();

function getHTML(url, callback) {
	$.ajax({
		url: url,
		datatype: "html",
		success: callback,
		error: function(err) {
			console.error(url, error);
		}
	});
}

function setupListener() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "page_search") {
        getHTML(
          request.url,
          searchHTML(request.url, request.queryParams)
        );
      }
    }
  );
}

function searchHTML(url, queryParams) {
  return function(response) {
    var res = {
      url: url,
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

    if (res.found) {
      console.groupCollapsed("message received");
      console.log(window.location.href);
      console.log(res);
      //console.log(response);
      console.groupEnd();
    }
  }
}

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

// function getPageAddress() {
//   chrome.tabs.query(
//     { active: true, currentWindow: true },
//     function(tabs) {
//       var activeTab = tabs[0]
//       console.log("message sent")
//       chrome.tabs.sendMessage(activeTab.id, {message: "current_url", })
//     }
//   )
// }

var defaultSearch = {
  "#deepSearch-search": "lolwut",
  "#is-regex": true,
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

