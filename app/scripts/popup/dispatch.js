import { ui } from './interface'
import manageState from './manageState'
import buildRegex from '../shared/buildRegex'
import messageContent from '../shared/messageContent'

export default {
  shallowSearch() {
    const queryParams = manageState.saveState()
    if (!queryParams.isDeep) {
      this.clearMarks()
      if (queryParams.isRegex) {
        let regex
        try {
          regex = buildRegex(queryParams)

          // in the event of success...
          ui.toggleValidClass(true)
          this.submitQuery(queryParams)
        }
        catch (error) {
          ui.toggleValidClass(false)
        }
      }
      else {
        this.submitQuery(queryParams)
      }
    }
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
    manageState.clearState()
    this.clearMarks()
  },

  clearMarks() {
    messageContent({ message: "clear_marks" })
  }
}
