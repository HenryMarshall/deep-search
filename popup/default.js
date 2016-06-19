$(document).on('ready', initialize)

function initialize() {
  repopulateSettings()
  registerEvent("#filter", "submit", "submit_search", "save")
  registerEvent("#clear-search", "click", "clear_search", "clear")
  registerEvent("#next", "click", "next_highlight")
  registerEvent("#prev", "click", "prev_highlight")
}

function repopulateSettings() {
  var currentSearch = chrome.extension.getBackgroundPage().currentSearch
  Object.keys(currentSearch).forEach(function(key) {
    if(key === "#deepSearch-search") {
      $(key).val(currentSearch[key])
    }
    $(key).prop('checked', currentSearch[key])
  })
}

function registerEvent(target, action, message, changeState) {
  $(target).on(action, function(e) {
    e.preventDefault()
    var fields = readFields()
    // FIXME: This smells -- totally not "registering event"
    if(changeState === "save") {
      saveFields(fields)
    }
    else if(changeState === "clear") {
      clearSearch()
    }
    notifyContentOfMessage({
      message: message,
      fields: fields
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

function saveFields(fields) {
  var currentSearch = chrome.extension.getBackgroundPage().currentSearch
  currentSearch["#deepSearch-search"] = fields.search
  currentSearch["#is-regex"] = fields.isRegex
  currentSearch["#is-deep"] = fields.isDeep
  currentSearch["#is-case-insensitive"] = fields.isCaseInsensitive
}

function clearSearch() {
  // Reset the search field in the state
  var currentSearch = chrome.extension.getBackgroundPage().currentSearch
  currentSearch["#deepSearch-search"] = ""
  // Reset the field in the UI
  $("#deepSearch-search").val("")
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
