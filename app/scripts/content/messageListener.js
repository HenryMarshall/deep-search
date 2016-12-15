import deep from './deep'
import shallow from './shallow'

export default function setupListeners() {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      // console.log("message received", request)
      const { queryParams } = request

      switch(request.message) {
        case "submit_query":
          submitQuery(queryParams)
          break
        case "clear_marks":
          clearMarks()
          break
        case "change_highlight":
          shallow.changeHighlight(request.direction)
          break
        case "download_shallow_csv":
          shallow.downloadCsv(queryParams)
          break
        case "save_state":
          window.deepSearchState = request.state
          console.log("save_state", global.deepSearchState)
          break
        case "read_state":
          console.log("read_state", global.deepSearchState)
          sendResponse(global.deepSearchState)
          break
      }
    }
  )
}

function submitQuery(queryParams) {
  clearMarks()
  const searchType = queryParams.isDeep ? deep : shallow
  searchType.search(queryParams)
}

function clearMarks() {
  shallow.clearMarks()
  deep.clearMarks()
}

