// receive message from `popup/default.js:26`
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "submit_query" && !request.fields.isDeep) {
      console.log("receive shallow submit_query: ", request)
      highlightMatches(request.fields)
    }
  }
)

// highlightMatches({
//   search: 'and\\s\\w+',
//   isRegex: true
// })

function highlightMatches(queryParams) {
  var find = queryParams.isRegex
    ? new RegExp(queryParams.search, 'g')
    : queryParams.search

  var wrapper = document.createElement("span")
  wrapper.setAttribute('class', 'deepSearch-highlight')

  findAndReplaceDOMText($('body')[0], {
    find: find,
    wrap: wrapper
  })
}

console.log("hightlightMatches file initialized")
