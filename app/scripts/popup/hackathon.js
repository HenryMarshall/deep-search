import $ from 'jquery'
import messageContent from '../shared/messageContent'
import manageState from './manageState'

export default initialize

function initialize() {
  manageState.setUiState()
  registerSubmitClick()
  registerEvent("#filter", "submit", "submit_search", "save")
  registerEvent("#clear-search", "click", "clear_search", "clear")
  registerEvent("#next", "click", "next_highlight")
  registerEvent("#prev", "click", "prev_highlight")
}

function registerSubmitClick() {
  $("#deepSearch-submit").click(function() {
    const queryParams = manageState.extractUiState()
    clearVisuals()
    manageState.saveState(queryParams)
    messageContent({
      message: "submit_search",
      queryParams
    })
  })
}

function registerEvent(target, action, message, changeState) {
  $(target).on(action, function(e) {
    console.log("something happened")
    e.preventDefault()
    const queryParams = manageState.extractUiState()
    // FIXME: This smells -- totally not "registering event"
    if(changeState === "save") {
      clearVisuals()
      manageState.saveState(queryParams)
    }
    else if(changeState === "clear") {
      manageState.clearState()
    }
    messageContent({
      message: message,
      queryParams
    })
  })
}

function clearVisuals() {
  messageContent({ message: "clear_search" })
}

