import search from "./shared/searchHtml"

self.addEventListener("message", function({ data }) {
  console.log("inside worker")
  if (data.message === "search_address") {
    console.info("attempting search", data.payload)
    const { html, queryParams } = data.payload
    const matches = search(html, queryParams)
    self.postMessage({ matches })
    console.info("posted message", matches)
  }
})
