import $ from "jquery"
import search from "../shared/searchHtml"

export default function searchAddress({
  queryParams,
  href,
  url,
  callback,
}) {
  $.ajax({
    url,
    datatype: "html",
    success: success.bind(this, queryParams, href, callback),
    error(jqXHR, textStatus, error) {
      callback({ status: "not_found", href })
    },
  })
}

function success(queryParams, href, callback, html) {
  const matches = search(html, queryParams)
  callback({ status: "received_response", href, matches })
}


// function success(queryParams, href, callback, response) {
//   console.log("launching worker")

//   const workerUrl = chrome.extension.getURL("scripts/searchWorker.js")
//   let worker = new Worker(workerUrl)

//   worker.addEventListener("message", listener, false)

//   worker.postMessage({
//     message: "search_address",
//     payload: { html: response, queryParams },
//   })

//   const timeout = 1000
//   setTimeout(() => {
//     if (worker) {
//       console.error("worker times out in searchAddress")
//       cleanUp()
//       callback({ status: "search_timed_out", href })
//     }
//   }, timeout)

//   function listener(e) {
//     console.info("response from worker")
//     const { matches } = e.data
//     cleanUp()
//     callback({ status: "received_response", href, matches })
//   }

//   function cleanUp() {
//     worker.removeEventListener("message", listener, false)
//     worker.terminate()
//     worker = null
//   }
// }
