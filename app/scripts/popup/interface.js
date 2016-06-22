import $ from 'jquery'
import manageState from './manageState'
import messageContent from '../shared/messageContent'

export default function initialize() {
  // Restores the state from the last time the popup was open
  manageState.setUiState()
  $("#filter").submit(submitQuery)
  $("#deepSearch-submit").click(submitQuery)
  $("#clear-search").click(clearMarks)
  $("#next, #prev").click(changeHighlight)
}

function submitQuery(event) {
  event.preventDefault()
  const queryParams = manageState.extractUiState()
  manageState.saveState(queryParams)
  messageContent({
    message: "submit_query",
    queryParams
  })
}

function clearMarks(event) {
  event.preventDefault()
  manageState.clearState()
  messageContent({ message: "clear_marks" })
}

function changeHighlight(event) {
  event.preventDefault()
  const direction = $(this).prop('data-direction')
  messageContent({
    message: "change_highlight",
    direction
  })
}

