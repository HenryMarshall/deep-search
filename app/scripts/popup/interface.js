import $ from 'jquery'
import debounce from "lodash.debounce"
import manageState from "./manageState"
import dispatch from './dispatch'

export default function initialize() {
  // Restores the state from the last time the popup was open
  ui.setUiState()

  $("#is-regex, #is-case-insensitive").click(onChange)
  $("#search").keyup(onChange)
  $("#clear-search").click(onClear)
  $("#find, #find-prev").click(onFind)
  $("#deep-search").click(onDeepSearch)
  $("#download-shallow-csv").click(onDownloadCsv)
  $("#query").submit((e) => { e.preventDefault() })
  $("#is-deep").click(onDeepToggle)
}

// A 175ms debounce time was determined by experimentation. In a long-ish query
// it sometimes triggers more than once, but that is pretty acceptable.
const debouncedUpdateSearch = debounce(dispatch.updateSearch, 175)

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
  else if (![16, 17, 18, 91].includes(event.keyCode)) {
    debouncedUpdateSearch()
  }
}

function onDeepToggle(event) {
  const $this = $(this)
  const isDeep = $this.prop("checked")
  ui.toggleDeep(isDeep)
  onChange(event)
}

function onFind(event) {
  event.preventDefault()

  if (!$(this).hasClass("disabled")) {
    const direction = $(this).attr('data-direction')
    dispatch.changeHighlight(direction)
  }
}

function onClear(event) {
  event.preventDefault()
  dispatch.clearState(window.close)
}

function onDeepSearch(event) {
  event.preventDefault()

  if (!$(this).hasClass("disabled")) {
    dispatch.deepSearch()
  }
}

function onDownloadCsv(event) {
  event.preventDefault()

  if (!$(this).hasClass("disabled")) {
    dispatch.downloadCsv()
  }
}

export const ui = {
  setUiState(state) {
    const doWork = state => {
      $("#search").val(state.search)
      $("#is-regex").prop('checked', state.isRegex)
      $("#is-deep").prop('checked', state.isDeep)
      $("#is-case-insensitive").prop('checked', state.isCaseInsensitive)

      const $query = $("#query")
      this.toggleValid(state.isValid, $query)
      this.toggleDeep(state.isDeep, $query)
      this.toggleDisableable(state.search)
    }

    if (state === undefined) {
      manageState.readState(doWork)
    }
    else {
      doWork(state)
    }
  },

  toggleValid(isValid, $query = $("#query")) {
    $query.toggleClass("invalid-regex", !isValid)
  },

  toggleDeep(isDeep, $query = $("#query")) {
    $query.toggleClass("deep-query", isDeep)
  },

  toggleDisableable(isDisabled) {
    $(".disableable").toggleClass("disabled", isDisabled)
  },
}
