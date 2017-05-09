import getActiveTabId from "./getActiveTabId"

function messageContent(message, callback) {
  getActiveTabId(tabId => chrome.tabs.sendMessage(tabId, message, callback))
}

export default messageContent
