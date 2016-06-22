import deep from './deep'
import shallow from './shallow'

export default function setupListeners() {
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendMessage) {
      console.log("message received", request)
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
      }
    }
  )
}

function submitQuery(queryParams) {
  clearMarks()
  const searchType = queryParams.isDeep ? deep : shallow
  console.log("searchType: ", searchType)
  searchType.search(queryParams)
}

function clearMarks() {
  shallow.clearMarks()
  // deep.clearMarks()
}

