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

  let message = "<ul><li>"
  message += matches
    .slice(0,10)
    .map(match =>
      match
        .replace(/\s/, ' ')
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )
    .join("</li><li>")
  message += "</li></ul>"

  if (matches.length > 10) {
    message += `<p>Plus ${matches.length - 10} more</p>`
  }

  return $(message)
}
