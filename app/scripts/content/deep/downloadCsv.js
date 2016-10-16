import $ from "jquery"
import json2csv from "json2csv"

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

function buildCsv(matches) {
  return json2csv({
    fields: buildFields(matches),
    data: buildData(matches),
  })
}

function buildFields(matches) {
  const fields = ["match", "preceeding_context", "following_context"]
  const captured = matches[0].match.slice(1).map(
    (captureGroup, idx) => `$${idx}`
  )

  fields.splice(1, 0, ...captured) // ["match", "$0", "$1", "preceeding...
  return fields
}

function buildData(matches) {
  return matches.map((match) => {
    const data = {
      "match": match.match[0],
      "preceeding_context": match.preceedingContext,
      "following_context": match.followingContext,
    }

    match.match.slice(1).forEach((str, idx) => data[`$${idx}`] = str)
    return data
  })
}

function initiateDownload(csv) {
  const href = encodeURI("data:csv;charset=utf-8," + csv)

  const link = document.createElement("a")
  link.setAttribute("href", href)
  link.setAttribute("download", "ds_export.csv")
  link.click()
}
