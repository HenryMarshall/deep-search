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
    getActiveTabId(tabId => {
      this.getState().set(tabId, state)
    })
    return state
  },

  readState(callback) {
    getActiveTabId(tabId => {
      const state = this.getState().get(tabId) || this.defaultState
      callback(state)
    })
  },

  clearState() {
    // Should I be watching for tab closing and deleting these values then or is
    // that unnecessary.
    getActiveTabId(tabId => {
      this.getState().delete(tabId)
    })
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

