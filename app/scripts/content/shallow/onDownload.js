import searchHtml from "../../shared/searchHtml"

export default function onDownload(queryParams) {
  const body = document.body.innerHTML
  const matches = searchHtml(body, queryParams)
}
