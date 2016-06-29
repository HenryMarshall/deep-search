import $ from 'jquery'

export default {
  extractUiState() {
    return {
      search: $("#search").val(),
      isRegex: $("#is-regex").prop('checked'),
      isDeep: $("#is-deep").prop('checked'),
      isCaseInsensitive: $("#is-case-insensitive").prop('checked')
    }
  },

  setUiState(state = chrome.extension.getBackgroundPage().savedState) {
    $("#search").val(state.search)
    $("#is-regex").prop('checked', state.isRegex),
    $("#is-deep").prop('checked', state.isDeep),
    $("#is-case-insensitive").prop('checked', state.isCaseInsensitive)
  },

  saveState(state = this.extractUiState()) {
    const background = chrome.extension.getBackgroundPage()
    background.savedState = state
    return state
  },

  clearState() {
    const defaultState = chrome.extension.getBackgroundPage().defaultState
    this.setUiState(defaultState)
    this.saveState(defaultState)
  }
}
