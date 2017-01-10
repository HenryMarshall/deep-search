// import { getHtml, searchHtml } from './searchUrl'
import { enqueue, clearQueue } from './pageQueue'

export default function messageListener() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      const { message, queryParams } = request
      if (queryParams && queryParams.isDeep && message === "page_search") {
        enqueue(request, sendResponse)
        // We `return true` to permit async sendResponse
        return true
      }

      if (message === "clear_queue") {
        clearQueue()
      }
    }
  )
}
