import { getHtml, searchHtml } from './searchUrl'

export default setupListener;

function setupListener() {
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      const { message, queryParams, url, href } = request
      if (queryParams && queryParams.isDeep && message === "page_search") {
        getHtml(url, sendResponse, searchHtml(url, href, queryParams))
      }
    }
  )
}
