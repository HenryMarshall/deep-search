import $ from "jquery"
import deep from "./deep"
import shallow from "./shallow"
import updateInMemory from "./updateInMemory"

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

function submitQuery(queryParams) {
  queryParams.isDeep ?
    deepSearch(queryParams) :
    shallowSearch(queryParams)
}

function shallowSearch(queryParams) {
  updateInMemory(($elem) => {
    shallow.clearMarks($elem)
    deep.clearMarks($elem)

    shallow.search($elem, queryParams)
  }, () => {
    shallow.scrollToElement($(".deepSearch-current-highlight"))
  })
}

function deepSearch(queryParams) {
  clearMarks(() => {
    deepSearch(queryParams)
  })
}

function clearMarks(onCompletion) {
  updateInMemory(($elem) => {
    shallow.clearMarks($elem)
    deep.clearMarks($elem)
  }, onCompletion)
}

