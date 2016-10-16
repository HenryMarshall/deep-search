import $ from 'jquery'
import resetState from '../background/savedState'
import manageState from './manageState'
import dispatch from './dispatch'

export default function initialize() {
  // Restores the state from the last time the popup was open
  ui.setUiState()
  $("#search").keyup(onChange)
  $("#is-regex, #is-case-insensitive, #is-deep").click(onChange)
  $("#is-deep").click(onDeepToggle)

  $("#clear-search").click(onClear)
  $("#find, #find-prev").click(onFind)
  $("#deep-search").click(onDeepSearch)
  $("#query").submit((e) => { e.preventDefault() })

  showFooterConditionally()
}

function showFooterConditionally(isDeep = $("#is-deep").prop("checked")) {
  $(".shallow-footer").toggle(!isDeep)
}

function onChange(event) {
  // KeyCode for Enter
  if (event.keyCode === 13) {
    if ($("#is-deep").prop("checked")) {
      dispatch.deepSearch()
    }
    else {
      const direction = event.shiftKey ? "prev" : "next"
      dispatch.changeHighlight(direction)
    }
  }

  // Note: This `onChange` is also responsible for handling changes of the
  // options (is-regex etc). This negative `if` intentionally fires then.
  //
  // KeyCodes for Shift, Control, Alt, Meta respectively
  else if (![16,17,18,91].includes(event.keyCode)) {
    dispatch.updateSearch()
  }
}

function onDeepToggle() {
  const isDeep = $(this).prop('checked')
  showFooterConditionally(isDeep)
  ui.toggleDeepClass(isDeep)
}

function onFind(event) {
  event.preventDefault()
  const direction = $(this).attr('data-direction')
  dispatch.changeHighlight(direction)
}

function onClear(event) {
  event.preventDefault()
  dispatch.clearState()
}

function onDeepSearch(event) {
  event.preventDefault()
  dispatch.deepSearch()
}

export const ui = {
  setUiState(state = chrome.extension.getBackgroundPage().savedState) {
    $("#search").val(state.search)
    $("#is-regex").prop('checked', state.isRegex),
    $("#is-deep").prop('checked', state.isDeep),
    $("#is-case-insensitive").prop('checked', state.isCaseInsensitive)

    this.toggleValidClass(state.isValid)
    this.toggleDeepClass(state.isDeep)
  },

  toggleValidClass(isValid) {
    $("#query").toggleClass("invalid-regex", !isValid)
  },

  toggleDeepClass(isDeep) {
    $("#query").toggleClass("deep-query", isDeep)
  }
}
