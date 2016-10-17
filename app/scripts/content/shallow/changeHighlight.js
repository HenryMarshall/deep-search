import $ from "jquery"
import scrollToElement from "./scrollToElement"
$.fn.reverse = [].reverse

export default function changeHighlight(direction) {
  const newFocused = getNewFocused(direction)

  removeFocused()
  setFocused(newFocused)
  scrollToElement(newFocused)
}

// Note: a highlight is considered visible if *any* sub element is :visible
function getNewFocused(direction) {
  const $highlights = $(".deepSearch-highlight")

  const oldIndex = Number(
    $highlights
      .filter(".deepSearch-current-highlight")
      .attr("data-highlight-index")
  )

  const [first, second] = (direction === "next") ?
    ["following", "preceeding"] :
    ["preceeding", "following"]

  const newIndex =
    firstInSubset(direction, oldIndex, $highlights, first) ||
    firstInSubset(direction, oldIndex, $highlights, second) ||
    oldIndex

  return getHighlightByIndex(newIndex, $highlights)
}

function firstInSubset(direction, oldIndex, $highlights, section) {
  let $subset = $highlights.filter(function() {
    const $this = $(this)
    const thisIndex = Number($this.attr("data-highlight-index"))
    return (
      $this.is(":visible") &&
      section === "following" ? thisIndex > oldIndex : thisIndex < oldIndex
    )
  })
  $subset = (direction === "next") ? $subset : $subset.reverse()

  return $subset.attr("data-highlight-index")
}

function getHighlightByIndex(index, $highlights = $("deepSearch-highlight")) {
  const $elements = $highlights.filter(`[data-highlight-index=${index}]`)

  if (!$elements) {
    throw new RangeError("Next/Prev highlight not found!")
  }
  else {
    return $elements
  }
}

function removeFocused() {
  $(".deepSearch-current-highlight").removeClass('deepSearch-current-highlight')
}

function setFocused($highlight) {
  $highlight.addClass('deepSearch-current-highlight')
}
