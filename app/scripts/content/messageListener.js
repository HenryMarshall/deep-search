import $ from "jquery"
import deep from "./deep"
import shallow from "./shallow"

export default function messageListener() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      const { queryParams } = request

      switch (request.message) {
        case "submit_query":
          submitQuery(queryParams, sendResponse)
          break
        case "clear_marks":
          clearMarks()
          break
        case "change_highlight":
          shallow.changeHighlight(request.direction, sendResponse)
          break
        case "download_shallow_csv":
          shallow.downloadCsv(queryParams)
          break
        case "deep_result":
          // TODO: implement approximately this:
          // saveMatch(href, matches)
          // setMark(href, matches)
          break
      }
    }
  )
}

function submitQuery(queryParams, sendResponse) {
  const $elem = $("body")
  clearMarks($elem)
  const searchType = queryParams.isDeep ? deep : shallow
  searchType.search(queryParams, sendResponse, $elem)
}

function clearMarks($elem = $("body")) {
  shallow.clearMarks()
  deep.clearMarks($elem)
  global.deepSearch = new Map()
}
