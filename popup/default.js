$(document).on('ready', function(e) {
  registerQuery()
})

function registerQuery() {
  $("#filter").submit(function(e) {
    e.preventDefault();
    notifyContentOfQuery(readFields())
  })
}

function readFields() {
  return {
    search: $("#deepSearch-search").val(),
    isRegex: $("#is-regex").prop('checked'),
    isDeep: $("#is-deep").prop('checked')
  }
}

function notifyContentOfQuery(fields) {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function(tabs) {
      var activeTab = tabs[0]
      // send message to `content/highlightMatches.js:1`
      console.log("message sent")
      chrome.tabs.sendMessage(
        activeTab.id,
        {
          message: "submit_query",
          fields: fields
        }
      )
    }
  )
}

