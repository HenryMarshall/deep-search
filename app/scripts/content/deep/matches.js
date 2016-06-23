import $ from 'jquery'

export function initialize() {
  global.deepSearchMatches = {}
  listenForMarkClick()
}

export function saveMatch(href, matches) {
  if (matches) {
    global.deepSearchMatches[href] = matches
  }
}

function listenForMarkClick() {
  // TODO: rename to `.deep-search-match`
  $("body").on('click', '.deepSearch-link-found', onLinkMarkClick)
  // TODO: rename to `.deep-search-no-match`
  // TODO: create `.deep-search-error`
  $('body').on('click', '.deepSearch-link-not-found', e => e.preventDefault())
}

function onLinkMarkClick(event) {
  event.preventDefault()
  const href = $(this).parent().attr('href')
  const matchString = global.deepSearchMatches[href]
    .slice(0,10)
    .map(match => match.replace(/\s/, ' '))
    .join('\n')

  alert(matchString)
}
