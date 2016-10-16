import json2csv from "json2csv"

export default function buildCsv(matches) {
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

