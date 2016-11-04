import $ from "jquery"
import buildRegex from "./buildRegex"

export default function search(html, queryParams) {
  const regex = buildRegex(queryParams)
  const text = innerText(html)

  console.log("text: ", text)

  const matches = []
  let match

  while (match = regex.exec(text)) {
    const contextualized = contextualize(text, match)
    matches.push(contextualized)
  }

  return matches
}

export function contextualize(text, match, maxContent = 32) {
  ++maxContent
  const startingIndex = match.index - maxContent
  const lastMatchCharacter = match.index + match[0].length
  const endingIndex = lastMatchCharacter + maxContent

  // Chrome seems to be stripping non-standard properties off arrays when
  // passing them back through `sendResponse`. As such, I wrap the object in
  // this contextualized object.
  const contextualized = { match }

  // If leadingContext brings us to the beginning, include it all
  contextualized.preceedingContext = startingIndex <= 0 ?
    text.slice(0, match.index) :
    text
      // We grab one extra character to ensure we can cut *around* words
      .slice(startingIndex - 1, match.index)
      .split(/\b/)
      .slice(2)
      .join("")

  // If followingContext brings us to the end, include it all
  contextualized.followingContext = endingIndex + 1 >= text.length ?
    text.slice(endingIndex) :
    text
      .slice(lastMatchCharacter, endingIndex + 1)
      .split(/\b/)
      .slice(0, -2)
      .join("")

    return contextualized
}

function innerText(html) {
  let $html = $(html)
  const $body = $html.find("body")
  $html = $body.length ? $body : $html

  // We can't use ":visible" because these elements aren't in the DOM
  const tagsToRemove = "script, img, link, style, meta, noscript"

  // We do this with a function instead of a selector because `not` doesn't
  // seem to like commas in a selector list. This works great.
  $html = $html.not(function() { return $(this).is(tagsToRemove) })

  $html.find(tagsToRemove).each(function() {
    this.remove()
  })

  const text = $html.text()
  // We use \s+ instead of \s{2,} to handle line returns etc
  const trimmed = text.replace(/\s+/g, " ")
  return trimmed
}

