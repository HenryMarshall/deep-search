const $ = require("jquery")
require("tooltipster")

export function initialize() {
  global.deepSearchMatches = {}
  listenForHover()
}

export function saveMatch(href, matches) {
  if (matches) {
    global.deepSearchMatches[href] = matches
  }
}

function listenForHover() {
  $("body").on(
    "mouseenter",
    ".deepSearch-link-found:not(.tooltipstered)",
    handleMouseEnter
  )

  $('body').on("click", ".deepSearch-link-not-found", e => e.preventDefault())
  // TODO: create `.deepSearch-error`
}

function handleMouseEnter(event) {
  event.preventDefault()

  const $this = $(this)
  const href = $this.prev("a").first().attr('href')

  $this.tooltipster({ content: buildMessage(href) }).tooltipster("open")
}

function buildMessage(href) {
  const matches = global.deepSearchMatches[href]

  let message = `<table>`

  matches.slice(0,10).forEach((match, idx) => {
    if (idx === 0) {
      message +=
        `<tr>
          <th>Match</th>
          ${match.slice(1).map((captureGroup, idx) => (
            `<th>$${idx}</th>`
          )).join("")}
          <th>Context</th>
        </tr>`
    }

    message +=
      `<tr>
        ${match.map(captureGroup => {
          `<td>$${escapeHTML(captureGroup)}</td>`
        }).join("")}
        <td>
          ${match.preceedingContext}
          <strong>${escapeHTML(match[0])}</strong>
          ${match.followingContext}
        </td>
      </tr>`
  })

  message += `</table>`
      
  if (matches.length > 10) {
    message += `<p>Plus ${matches.length - 10} more</p>`
  }

  return $(message)
}

function escapeHTML(text) {
  text
    .replace(/\s/, ' ')
    .replace("<", "&lt;")
    .replace(">", "&gt;")
}
