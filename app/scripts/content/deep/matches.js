const $ = require("jquery")
require("tooltipster")

export function saveMatch(href, matches) {
  if (matches) {
    global.deepSearch.set(href, matches)
  }
}

export function listenForHover() {
  $("body").on(
    "mouseenter",
    ".deepSearch-link-found:not(.tooltipstered)",
    handleMouseEnter
  )
}

function handleMouseEnter(event) {
  const $this = $(this)
  const href = $this.prev("a").first().attr('href')

  $this.tooltipster({
    content: buildMessage(href),
    interactive: true,
  }).tooltipster("open")
}

function buildMessage(href) {
  const matches = global.deepSearch.get(href)

  let message = `<table>`

  matches.slice(0, 10).forEach((match, idx) => {
    if (idx === 0) {
      message +=
        `<thead><tr>
          <th>Match</th>
          ${match.match.slice(1).map((captureGroup, idx) => (
            `<th>$${idx}</th>`
          )).join("")}
          <th>Context</th>
        </tr></thead><tbody>`
    }

    message +=
      // The long `td` line is necessary. Breaking it up causes a potential
      // space to be inserted when the search is for a word fragment. Consider:
      // "the preceeding " + "human" + "s are pretty cool" will render as
      // "the preceeding human s are pretty cool" if split across lines.
      `<tr>
        ${match.match.map(captureGroup => (
          `<td>${escapeHTML(captureGroup)}</td>`
        )).join("")}
        <td>${match.preceedingContext}
          <strong>${escapeHTML(match.match[0])}</strong>
          ${match.followingContext}
        </td>
      </tr>`
  })

  message += `</tbody></table><p>`

  if (matches.length > 10) {
    message += `<span>(Plus ${matches.length - 10} more)</span>`
  }
  message +=
    `<a data-page-href="${href}" href="#" class="csv-link">
      Download as CSV
    </a></p>`

  return $(message)
}

function escapeHTML(text) {
  return text
    .replace(/\s/, ' ')
    .replace("<", "&lt;")
    .replace(">", "&gt;")
}
