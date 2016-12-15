import $ from "jquery"
import messageContent from "../shared/messageContent"

export default {
  extractUiState() {
    return {
      search: $("#search").val(),
      isRegex: $("#is-regex").prop("checked"),
      isDeep: $("#is-deep").prop("checked"),
      isCaseInsensitive: $("#is-case-insensitive").prop("checked"),
      isValid: !$("#query").hasClass("invalid-regex")
    }
  },

  saveState(state = this.extractUiState()) {
    messageContent({ message: "save_state", state })
    return state
  },

  readState() {
    const msg = messageContent({ message: "read_state" })
    console.log("read_state", msg)
    return msg || defaultState
  },

  clearState() {
    return this.saveState(Object.assign({}, defaultState))
  }
}

export const defaultState = {
  search: '',
  isRegex: false,
  isDeep: false,
  isCaseInsensitive: true,
  isValid: true,
}
