import $ from 'jquery'
import ui from './interface'

export default {
  extractUiState() {
    return {
      search: $("#search").val(),
      isRegex: $("#is-regex").prop('checked'),
      isDeep: $("#is-deep").prop('checked'),
      isCaseInsensitive: $("#is-case-insensitive").prop('checked'),
      isValid: $("#query").hasClass("invalid-regex")
    }
  },

  saveState(state = this.extractUiState()) {
    const background = chrome.extension.getBackgroundPage()
    background.savedState = state
    return state
  },

  clearState() {
    const defaultState = chrome.extension.getBackgroundPage().defaultState
    setUiState(defaultState)
    this.saveState(defaultState)
  }
}
