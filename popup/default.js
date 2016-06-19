$(document).on('ready', initialize)

function initialize() {
  registerQuery()
  registerClear()
}

function registerQuery() {
  $("#filter").submit(function(e) {
    e.preventDefault();
    // send message to `content/highlightMatches.js:1`
    notifyContentOfMessage({
      message: "submit_query",
      fields: readFields()
    })
  })
}

function registerClear() {
  $("#clear-search").click(function(e) {
    e.preventDefault()
    notifyContentOfMessage({ 
      message: "clear_query",
      fields: read_fields()
    })
  })
}

function readFields() {
  return {
    search: $("#deepSearch-search").val(),
    isRegex: $("#is-regex").prop('checked'),
    isDeep: $("#is-deep").prop('checked')
  }
}

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
