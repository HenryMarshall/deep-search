import $ from "jquery"
import json2csv from "json2csv"

export default function listenForDownload() {
  $("body").on("click", ".csv-link", handleDownload)
}

function handleDownload(event) {
  event.preventDefault()

  const href = $(this).attr("href")
  const matches = global.deepSearchMatches[href]

  buildOutput(matches)
}

function buildOutput(matches) {
  let output = {
    fields: buildFields(matches),
    data: buildData(matches),
  }

  output = json2csv(output)

  console.log(output)

  return output
}

function buildFields(matches) {
  // The number of captured groups is variable, so we slice it
  const captured = matches[0].match.slice(1).map(
    (captureGroup, idx) => `$${idx}`
  )
  const context = ["preceeding_context", "following_context"]
  return ["match"].concat(captured, context)
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
