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
        case "checked_url":
          checkedUrl(request.href, request.matches)
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

function checkedUrl(href, matches) {
  deep.saveMatch(href, matches)
  deep.setMark(href, matches)
}

