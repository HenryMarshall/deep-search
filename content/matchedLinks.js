function findLinks(queryParams) {
  $("a").each(function(index) {
    var href = $(this)[0].href
    var attr = $(this).attr("href")
    if (/^https?/.test(href) && /^[^#]/.test(attr) ) {
      console.log(attr);
      sendPageSearch(href, queryParams);
    }
  });
}


function sendPageSearch(url, queryParams) {
  chrome.runtime.sendMessage({
    message: "page_search",
    queryParams: queryParams, 
    url: url
  });
}

// findLinks({
//   search: "Retrieved 2016-[0-9]{2}-[0-9]{2}\.", 
//   isRegex: true, 
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