import queue from 'queue'
import SearchPage from './SearchPage'

let q
let running
let queuedHrefs

export function initializeQueue(concurrency = 8, timeout = 750) {
  q = queue({ concurrency, timeout })
  running = false
  queuedHrefs = []
  q.on('timeout', onTimeout)
}

export function enqueue(request, sendResponse) {
  const { url, href, queryParams } = request

  if(!isAlreadyQueued(href)) {
    queuedHrefs.push(href)

    q.push((advanceQueue) => {
      const page = new SearchPage({ url, href, queryParams, sendResponse })
      // `advanceQueue` bombs if called with args, hence the anonymous function
      const callback = () => { advanceQueue() }
      page.search(callback)
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
