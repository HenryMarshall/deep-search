import queue from 'queue'
import { getHtml, searchHtml } from './searchUrl'

let q

export function initializeQueue(concurrency = 8, timeout = 750) {
  q = queue({ concurrency, timeout })
  q.on('timeout', onTimeout)
}

export function enqueue(request, sendResponse) {
  const { url, href, queryParams } = request

  q.push((callback) => {
    const onSuccess = searchHtml(href, queryParams)
    const onCompletion = () => {
      sendResponse()
      callback()
    }
    getHtml(url, onSuccess, onCompletion)
  })
  initialStart()
}

let running = false
function initialStart() {
  if (!running) {
    running = true
    q.start(() => { running = false })
  }

}

function onTimeout(next, job) {
  console.error("job timed out")
  next()
}
