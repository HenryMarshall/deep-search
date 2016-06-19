function findLinks(queryParams) {
  $("a").each(function(index) {
    var href = $(this)[0].href
    if (/^https?/.test(href)) {
      console.log(href);
      sendPageSearch(href, queryParams);
    }
  });
}


function sendPageSearch(url, queryParams) {
  chrome.runtime.sendMessage({
    message: "page_search",
    queryParams: queryParams, 
    url: url,
  });
}

// findLinks({
//   search: "a(n unconventional) love story.", 
//   isRegex: false, 
//   isDeep: true,
//   isCaseInsensitive: true
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "submit_query" && request.fields.isDeep) {
      findLinks(request.fields)
    }
  }  
);