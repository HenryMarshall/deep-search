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
    console.groupCollapsed("message received");
    console.log(res);
    //console.log(response);
    console.groupEnd();
  }
}

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
