import scrollToElement from "./scrollToElement"

export default function changeHighlight(direction) {
  const matches = global.deepSearch.get("matches")
  const oldIndex = global.deepSearch.get("currentIndex")
  const newIndex = calculateNewIndex(matches, oldIndex, direction)

  const $oldMatch = matches[oldIndex]
  const $newMatch = matches[newIndex]

  $oldMatch.removeClass("deepSearch-current-highlight")
  $newMatch.addClass("deepSearch-current-highlight")
  scrollToElement($newMatch)

  global.deepSearch.set("currentIndex", newIndex)
}

function calculateNewIndex(matches, oldIndex, direction) {
  const maxIndex = Math.max(0, matches.length - 1)
  const naiveIndex = direction === "next" ? oldIndex + 1 : oldIndex - 1
  if (naiveIndex > maxIndex) {
    return 0
  }
  else if (naiveIndex < 0) {
    return maxIndex
  }
  else {
    return naiveIndex
  }
}
