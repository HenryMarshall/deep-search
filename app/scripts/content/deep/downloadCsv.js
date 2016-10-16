import $ from "jquery"
import buildCsv from "../../shared/buildCsv"
import initiateDownload from "../../shared/initiateDownload"

export default function listenForDownload() {
  $("body").on("click", ".csv-link", handleDownload)
}

function handleDownload(event) {
  event.preventDefault()

  const href = $(this).attr("data-page-href")
  const matches = global.deepSearchMatches[href]

  const csv = buildCsv(matches)
  initiateDownload(csv)
}

