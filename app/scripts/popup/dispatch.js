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
      updateProgress(queryParams, "")
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
    manageState.readState(state => {
      messageContent({
        message: "change_highlight",
        direction,
      }, updateProgress.bind(this, state))
    })
  },

  clearState(callback) {
    messageContent({ message: "clear_marks" })
    const state = manageState.clearState(callback)
    // This resetst progress implicitly
    ui.setUiState(state)
  },
}

function submitQuery(queryParams) {
  messageContent({
    message: "submit_query",
    queryParams,
  }, updateProgress.bind(this, queryParams))
}

function updateProgress(state, progress) {
  ui.updateProgress(progress.label)
  const newState = Object.assign({}, state, { progress: progress.label })
  manageState.saveState(newState)
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
