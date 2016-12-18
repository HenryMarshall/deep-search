import $ from "jquery"
import deep from "./deep"
import shallow from "./shallow"

export default function setupListeners() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendMessage) {
      // console.log("message received", request)
      const { queryParams } = request

      switch (request.message) {
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
      }
    }
  )
}

function submitQuery(queryParams, $elem = $("body")) {
  clearMarks($elem)
  const searchType = queryParams.isDeep ? deep : shallow
  searchType.search(queryParams, $elem)
}

function clearMarks($elem = $("body")) {
  shallow.clearMarks($elem)
  deep.clearMarks($elem)
}

