function getActiveTabId(callback) {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tabId = tabs[0].id
    callback(tabId)
  })
}

export default getActiveTabId
