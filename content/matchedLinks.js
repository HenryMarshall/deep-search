function findLinks(queryParams) {
  $("a").each(function(index) {
    var href = $(this).attr("href");
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
    url: url
  });
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "submit_query" && request.fields.isDeep) {
      findLinks(request.fields)
    }
  }  
);
