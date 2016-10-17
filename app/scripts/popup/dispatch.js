import { ui } from './interface'
import manageState from './manageState'
import buildRegex from '../shared/buildRegex'
import messageContent from '../shared/messageContent'

export default {
  updateSearch() {
    const queryParams = manageState.saveState()
    this.clearMarks()

    const isValid = queryParams.isRegex ? this.isRegexValid(queryParams) : true
    ui.toggleValidClass(isValid)

    if (isValid && !queryParams.isDeep && queryParams.search) {
      this.submitQuery(queryParams)
    }
  },

  isRegexValid(queryParams) {
    try {
      buildRegex(queryParams)
      return true
    }
    catch (error) {
      return false
    }
  },

  deepSearch() {
    const queryParams = manageState.readState()
    if (queryParams.isDeep) {
      this.submitQuery(queryParams)
    }
  },

  downloadCsv() {
    const queryParams = manageState.readState()
    messageContent({ message: "download_shallow_csv", queryParams })
  },

  changeHighlight(direction) {
    messageContent({
      message: "change_highlight",
      direction
    })
  },

  submitQuery(queryParams) {
    messageContent({
      message: "submit_query",
      queryParams
    })
  },

  clearState() {
    const state = manageState.clearState()
    ui.setUiState(state)
    this.clearMarks()
  },

  clearMarks() {
    messageContent({ message: "clear_marks" })
  }
}
