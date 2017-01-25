import $ from "jquery"

export default function searchAddress({
  queryParams,
  href,
  url,
  sendResponse,
  callback,
}) {
  $.ajax({
    url,
    datatype: "html",
    success: success.bind(this, queryParams, href, sendResponse, callback),
    error(jqXHR, textStatus, error) {
      sendResponse({ status: "not_found", href })
      callback()
    },
  })
}

function success(queryParams, href, sendResponse, callback, response) {
  console.log("launching worker")

  const workerUrl = chrome.extension.getURL("scripts/searchWorker.js")
  let worker = new Worker(workerUrl)

  worker.addEventListener("message", listener, false)

  worker.postMessage({
    message: "search_address",
    payload: { html: response, queryParams },
  })

  const timeout = 750
  setTimeout(() => {
    if (worker) {
      console.error("worker times out in searchAddress")
      sendResponse({ status: "search_timed_out", href })
      cleanUp()
      callback()
    }
  }, timeout)

  function listener(e) {
    console.info("response from worker")
    const { matches } = e.data
    sendResponse({ status: "received_response", href, matches })
    cleanUp()
    callback()
  }

  function cleanUp() {
    worker.removeEventListener("message", listener, false)
    worker.terminate()
    worker = null
  }
}
