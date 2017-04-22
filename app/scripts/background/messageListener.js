import { processLinks, clearQueue } from "./pageQueue"

export default function messageListener() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      const { message, queryParams } = request

      if (queryParams &&
        queryParams.isDeep &&
        message === "deep_search_links") {
        processLinks(queryParams, request.links, sendResponse)
        return true
      }

      if (message === "clear_queue") {
        clearQueue()
      }
    }
  )
}
