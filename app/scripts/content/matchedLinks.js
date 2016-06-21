import $ from 'jquery'
export default initialize

var linksData = {}

function initialize() {
  console.log("matchedLinks initialized")
  listenForMessages()
  listenForMatchedLinkClicks()

  // // TODO: undo for production
  // processLinks({
  //   // search: "Retrieved 2016-[0-9]{2}-[0-9]{2}\.",
  //   // isRegex: true,
  //   search: 'north\\s(\\w+)',
  //   isRegex: true,
  //   isDeep: true,
  //   isCaseInsensitive: true
  // });
}

function listenForMatchedLinkClicks() {
  $("body").on('click', ".deepSearch-link-found", function(e) {
    e.preventDefault()
    // Using `prop` gets you the absolute path -- we store with as written
    var href = $(this).parent().attr('href')
    var matchString = linksData[href]
      .slice(0,10)
      .map(match => match.replace(/\s/, ' '))
      .join('\n')
    alert(matchString)
  })

  // just prevent default for consistency
  $("body").on('click', ".deepSearch-link-not-found", function(e) {
    e.preventDefault()
  })
}

function listenForMessages() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if (request.message === "checked_url") {
        console.log("markLink Request: ", request)
        markLink(request)
      }
      else if (request.message === "clear_search") {
        unmarkLinks()
      }
      else if (request.message === "submit_search" &&
               request.queryParams &&
               request.queryParams.isDeep)
      {
        processLinks(request.queryParams)
      }
    }
  )
}

function checkLink(queryParams, link) {
  var href = $(link)[0].href
  var attr = $(link).attr("href")
  if (/^https?/.test(href) && /^[^#]/.test(attr) ) {
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

function processLinks(queryParams) {
  $("a").each(function(index) {
    checkLink(queryParams, this)
  })
}

function markLink(linkData) {
  storeLinkData(linkData)

  var $link = $("a[href='" + linkData.href + "']")

  $link.children('.deepSearch-link-found, .deepSearch-link-not-found').each(function() {
    $(this).remove()
  })
  var matchCount = linkData.matchesFound && linkData.matchesFound.length
  if (matchCount >= 10) {
    matchCount = "+"
  }

  if (matchCount) {
    $link.append(
      $("<span class='deepSearch-link-found'><span class='matchCountWrapper'><span='matchCount'>" + matchCount + "</span></span></span>")
    )
  }
  else {
    $link.append($("<span class='deepSearch-link-not-found'><span class='matchCountWrapper'><span class='matchCount'>&times;</span></span></span>"))
  }
}

function unmarkLinks() {
  $('.deepSearch-link-found, .deepSearch-link-not-found').remove()
}

function storeLinkData(linkData) {
  linksData[linkData.href] = linkData.matchesFound
}
