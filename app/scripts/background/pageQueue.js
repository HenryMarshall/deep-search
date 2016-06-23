import queue from 'queue'
import { getHtml, searchHtml } from './searchUrl'

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
    console.log("about to queue")
    queuedHrefs.push(href)
    q.push((callback) => {
      const onSuccess = searchHtml(href, queryParams)
      const onCompletion = () => {
        sendResponse()
        callback()
      }
      getHtml(url, onSuccess, onCompletion)
    })
  }

  initialStart()
}

function initialStart() {
  if (!running) {
    running = true
    q.start(() => { 
      initializeQueue()
    })
  }
}

function isAlreadyQueued(href) {
  const isQueued = (queuedHrefs.indexOf(href) !== -1)
  return isQueued
}

function onTimeout(next, job) {
  console.error("job timed out")
  next()
}
