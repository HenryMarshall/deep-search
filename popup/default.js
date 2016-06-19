$(document).on('ready', initialize)

function initialize() {
  repopulateSettings()
  registerEvent("#filter", "submit", "submit_search")
  registerEvent("#clear-search", "click", "clear_search")
  registerEvent("#next", "click", "next_highlight")
  registerEvent("#prev", "click", "prev_highlight")
}

function repopulateSettings() {
  var currentSearch = chrome.extension.getBackgroundPage().currentSearch
  console.log("currentSearch: ", currentSearch)
  debugger
  Object.keys(currentSearch).forEach(function(key) {
    if(key === "#deepSearch-search") {
      $(key).val(currentSearch[key])
    }
    $(key).prop('checked', currentSearch[key])
  })
}

function registerEvent(target, action, message) {
  $(target).on(action, function(e) {
    e.preventDefault()
    notifyContentOfMessage({
      message: message,
      fields: readFields()
    })
  })
}

function readFields() {
  return {
    search: $("#deepSearch-search").val(),
    isRegex: $("#is-regex").prop('checked'),
    isDeep: $("#is-deep").prop('checked'),
    isCaseInsensitive: $("#is-case-insensitive").prop('checked')
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


var currentSearch = {
  "#deepSearch-search": "",
  "#is-regex": false,
  "#is-deep": false,
  "#is-case-insensitive": false
}
