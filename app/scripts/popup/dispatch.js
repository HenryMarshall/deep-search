import { ui } from './interface'
import manageState from './manageState'
import buildRegex from '../shared/buildRegex'
import messageContent from '../shared/messageContent'

export default {
  updateSearch() {
    const queryParams = manageState.saveState()
    const { search, isDeep } = queryParams

    const isValid = queryParams.isRegex ?
      isRegexValid(queryParams) :
      !!search

    ui.toggleValid(!search || isValid)
    ui.toggleDisableable(!search)

    // We check `!isDeep` because deep searches are very expensive so the user
    // must manually initiate them.
    if (isValid && !isDeep) {
      submitQuery(queryParams)
    }
    else {
      messageContent({ message: "clear_marks" })
    }
  },

  deepSearch() {
    manageState.readState(queryParams => {
      if (queryParams.isDeep) {
        submitQuery(queryParams)
      }
    })
  },

  downloadCsv() {
    manageState.readState(queryParams => {
      messageContent({ message: "download_shallow_csv", queryParams })
    })
  },

  changeHighlight(direction) {
    messageContent({
      message: "change_highlight",
      direction,
    })
  },

  clearState(callback) {
    const state = manageState.clearState(callback)
    ui.setUiState(state)
    messageContent({ message: "clear_marks" })
  },
}

function submitQuery(queryParams) {
  messageContent({
    message: "submit_query",
    queryParams,
  })
}

function isRegexValid(queryParams) {
  // `buildRegex` throws a RangeError when passed an empty string. This is
  // useful here because the highlighting engines blows up if you feed it an
  // empty string.
  try {
    buildRegex(queryParams)
    return true
  }
  catch (err) {
    return false
  }
}

