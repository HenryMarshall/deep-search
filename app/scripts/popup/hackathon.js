import $ from 'jquery'
import messageContent from '../shared/messageContent'

export default initialize

function initialize() {
  repopulateSettings()
  registerSubmitClick()
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

function registerSubmitClick() {
  $("#deepSearch-submit").click(function() {
    var fields = readFields()
    clearVisuals()
    saveFields(fields)
    messageContent({
      message: "submit_search",
      queryParams: fields
    })
  })
}

function registerEvent(target, action, message, changeState) {
  $(target).on(action, function(e) {
    console.log("something happened")
    e.preventDefault()
    var fields = readFields()
    // FIXME: This smells -- totally not "registering event"
    if(changeState === "save") {
      clearVisuals()
      saveFields(fields)
    }
    else if(changeState === "clear") {
      clearSearch()
    }
    messageContent({
      message: message,
      queryParams: fields
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

function clearVisuals() {
  messageContent({ message: "clear_search" })
}

function clearSearch() {
  // Reset the search field in the state
  var currentSearch = chrome.extension.getBackgroundPage().currentSearch
  currentSearch["#deepSearch-search"] = ""
  // Reset the field in the UI
  $("#deepSearch-search").val("")
}

var currentSearch = {}
