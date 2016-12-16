import getActiveTabId from "./getActiveTabId"

function messageContent(message) {
  getActiveTabId(tabId => chrome.tabs.sendMessage(tabId, message))
}

export default messageContent

