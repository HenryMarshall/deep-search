function checkLink(queryParams, link) {
  var href = $(link)[0].href
  var attr = $(link).attr("href")
  if (/^https?/.test(href) && /^[^#]/.test(attr) ) {
    // console.log(attr);
    sendPageSearch(href, attr, queryParams);
  }
}


function sendPageSearch(url, href, queryParams) {
  chrome.runtime.sendMessage({
    message: "page_search",
    queryParams: queryParams, 
    url: url,
    href: href
  });
}

// processLinks({
//   search: "Retrieved 2016-[0-9]{2}-[0-9]{2}\.", 
//   isRegex: true, 
//   isDeep: true,
//   isCaseInsensitive: true
// });

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.fields && request.fields.isDeep) {
      switch(request.message) {
        case "submit_search":
          processLinks(request.fields)
          break
        case "clear_search":
          unmarkLinks()
          break
      }
    }
    if (request.message === "checked_url") {
      markLink(request)
    }
  }  
)

function processLinks(queryParams) {
  $("a").each(function(index) {
    checkLink(queryParams, this)
  })
}

function markLink(linkData) {
  var $link = $("a[href='" + linkData.href + "']")
  // $link
  //   .removeClass('deepSearch-link-found')
  //   .removeClass('deepSearch-link-not-found')
  if (linkData.matchesFound) {
    $link
      .append($("<span class='deepSearch-link-found'>Y</span>"))
      // .addClass('deepSearch-link-found')
  }
  else {
    $link
      .append($("<span class='deepSearch-link-not-found'>N</span>"))
      
      // .addClass('deepSearch-link-not-found')
  }
}

$("a").prepend()
