import buildRegex from "./buildRegex"

export default function search(html, queryParams) {
  const regex = buildRegex(queryParams)
  const text = innerText(html)

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
  const body = html.match(/<\s*body[^>]*>([\s\S]*)<\s*\/\s*body\s*>/)
  return (
    // Accepts both html fragments or html with a head
    (body ? body[1] : html)
      // inline scripts and their tags
      .replace(/<\s*script[^>]*>[\s\S]*<\s*\/\s*script\s*>/g, "")
      // all tags (including external scripts)
      .replace(/<[^>]+>/g, "")
      // line breaks
      .replace(/(\r?\n){2,}/g, "\n")
      .trim()
  )
}

