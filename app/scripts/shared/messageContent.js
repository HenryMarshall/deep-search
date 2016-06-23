function messageContent(message) {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function(tabs) {
      var activeTab = tabs[0]
      chrome.tabs.sendMessage(activeTab.id, message)
    }
  )
}

export default messageContent
