import searchHtml from "../../shared/searchHtml"
import buildCsv from "../../shared/buildCsv"
import initiateDownload from "../../shared/initiateDownload"

export default function onDownload(queryParams) {
  const body = document.body.innerHTML
  const matches = searchHtml(body, queryParams)
  const csv = buildCsv(matches)
  initiateDownload(csv)
}
