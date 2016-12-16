import $ from 'jquery'
import getActiveTabId from "../shared/getActiveTabId"

export default {
  extractUiState() {
    return {
      search: $("#search").val(),
      isRegex: $("#is-regex").prop('checked'),
      isDeep: $("#is-deep").prop('checked'),
      isCaseInsensitive: $("#is-case-insensitive").prop('checked'),
      isValid: !$("#query").hasClass("invalid-regex"),
    }
  },

  saveState(state = this.extractUiState()) {
    this.getState().set(getActiveTabId(), state)
    return state
  },

  readState() {
    return this.getState().get(getActiveTabId()) || this.defaultState
  },

  clearState() {
    this.getState().delete(getActiveTabId())
    return this.defaultState
  },

  getState() {
    return chrome.extension.getBackgroundPage().savedState
  },

  defaultState: {
    search: '',
    isRegex: false,
    isDeep: false,
    isCaseInsensitive: true,
    isValid: true,
  },
}

