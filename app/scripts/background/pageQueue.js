import queue from "queue"
import searchAddress from "./searchAddress"

let q

export function initializeQueue(concurrency = 2, timeout = 1500) {
  q = queue({ concurrency, timeout })
  q.on("timeout", onTimeout)
  q.on("success", onSuccess)
  q.on("error", onError)
}

export function processLinks(queryParams, links, sendResponse) {
  // Abort already running searches
  q.end()

  links.forEach(link => {
    enqueue(queryParams, link)
  })

  q.start(() => {
    console.log("we processed every link!")
    sendResponse()
  })
}

function enqueue(queryParams, { href, url }) {
  q.push((advanceQueue) => {
    const callback = (response) => {
      console.log("omg! something completed", response)
      advanceQueue()
    }
    searchAddress({ queryParams, href, url, callback })
  })
}

export function clearQueue() {
  q.end()
}

function onSuccess(result, job) {
  console.group("success")
  console.log("result: ", result)
  console.log("job: ", job)
  console.groupEnd("success")
}

function onError(err, job) {
  console.group("error")
  console.log("err: ", err)
  console.log("job: ", job)
  console.groupEnd("error")
}

function onTimeout(next, job) {
  // TODO: notify main page of timeout with "exclamation in triangle"
  console.error("deepSearch page timed out")
  next()
}
