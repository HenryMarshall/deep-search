import queue from "queue"
import searchAddress from "./searchAddress"

let q
let running
let queuedHrefs

export function initializeQueue(concurrency = 8, timeout = 1500) {
  q = queue({ concurrency, timeout })
  running = false
  queuedHrefs = []
  q.on('timeout', onTimeout)
}

export function enqueue(request, sendResponse) {
  const { href, url, queryParams } = request

  if (!isAlreadyQueued(href)) {
    queuedHrefs.push(href)

    q.push((advanceQueue) => {
      // `advanceQueue` bombs if called with args, hence the anonymous function
      const callback = () => { advanceQueue() }
      searchAddress({ queryParams, href, url, sendResponse, callback })
    })
  }

  initialStart()
}

export function clearQueue() {
  if (running && q) {
    running = false
    q.end()
  }
}

function initialStart() {
  if (!running) {
    running = true
    q.start(() => {
      running = false
      queuedHrefs = []
    })
  }
}

function isAlreadyQueued(href) {
  const isQueued = (queuedHrefs.indexOf(href) !== -1)
  return isQueued
}

function onTimeout(next, job) {
  console.error("deepSearch page timed out")
  next()
}
