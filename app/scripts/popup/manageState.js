import $ from 'jquery'

export default {
  extractUiState() {
    return {
      search: $("#search").val(),
      isRegex: $("#is-regex").prop('checked'),
      isDeep: $("#is-deep").prop('checked'),
      isCaseInsensitive: $("#is-case-insensitive").prop('checked'),
      isValid: !$("#query").hasClass("invalid-regex")
    }
  },

  saveState(state = this.extractUiState()) {
    const background = chrome.extension.getBackgroundPage()
    background.savedState = state
    return state
  },

  // Note: You *cannot* simply import and use the initialization method from
  // the `background/savedState` page. This has a different global scope!
  clearState() {
    const background = chrome.extension.getBackgroundPage()
    const newState = Object.assign({}, background.defaultState)
    background.savedState = newState
    return newState
  }
}
