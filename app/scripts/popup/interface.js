import $ from 'jquery'
import dispatch from './dispatch'

export default function initialize() {
  // Restores the state from the last time the popup was open
  ui.setUiState()
  $("#search").keyup(onChange)
  $("#is-regex, #is-case-insensitive, #is-deep").click(onChange)

  $("#clear-search").click(clearMarks)
  $("#find, #find-prev").click(changeHighlight)
}

function onChange(event) {
  // KeyCode for Enter
  if (event.keyCode === 13) {
    const direction = event.shiftKey ? "prev" : "next"
    dispatch.changeHighlight(direction)
  }

  // Note: This `onChange` is also responsible for handling changes of the
  // options (is-regex etc). This negative `if` intentionally fires then.
  //
  // KeyCodes for Shift, Control, Alt, Meta respectively
  else if (![16,17,18,91].includes(event.keyCode)) {
    dispatch.shallowSearch()
  }
}

function changeHighlight(event) {
  event.preventDefault()
  const direction = $(this).attr('data-direction')
  dispatch.changeHighlight(direction)
}

function clearMarks(event) {
  event.preventDefault()
  dispatch.clearState()
}

export const ui = {
  setUiState(state = chrome.extension.getBackgroundPage().savedState) {
    $("#search").val(state.search)
    $("#is-regex").prop('checked', state.isRegex),
    $("#is-deep").prop('checked', state.isDeep),
    $("#is-case-insensitive").prop('checked', state.isCaseInsensitive)
    this.setValidState(state.isValid)
  },

  setValidState(isValid) {
    const query = $("#query")
    const wasValid = !query.hasClass("invalid-regex")

    if (wasValid && !isValid) {
      query.addClass("invalid-regex")
    }
    else if (!wasValid && isValid) {
      query.removeClass("invalid-regex")
    }
  }
}
