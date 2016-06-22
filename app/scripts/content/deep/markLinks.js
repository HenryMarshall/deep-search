export default function markLinks(linkData) {
  var link = $(`a[href='${linkData.href}']`)

  clearMarksFromLink(link)
  const marker = buildMarker(linkData.matchesFound)
  link.append(marker)
}

// If a link is on the page multiple times, it will (currently) be checked
// independently and results will be appended to the matching link *each*
// time. This hack causes any markers already appended to the link to be
// removed before one is re-added.
function clearMarksFromLink(link) {
  const selector = '.deepSearch-link-found, .deepSearch-link-not-found'
  link.children(selector).each(function() {
    $(this).remove()
  })
}

function buildMarker(matches) {
  // FIXME: Accidental camelCase class names
  return $(`<span class='deepSearch-link${matches ? '' : '-not'}-found'>
           <span class='matchCountWrapper'>
           <span='matchCount'>${matchCount(matches)}</span>
           </span>
           </span>`)
}

function matchCount(matches) {
  if (matches) {
    return ((matches.length < 10) ? matches.length : '+')
  }
  else {
    return '&times;'
  }
}
