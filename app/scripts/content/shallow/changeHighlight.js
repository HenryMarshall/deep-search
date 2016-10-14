import $ from 'jquery'
import scrollToElement from "./scrollToElement"

export default function changeHighlight(direction) {
  direction = (direction === "next") ? 1 : -1
  const newFocused = getNewFocused(direction)

  removeFocused()
  setFocused(newFocused)
  scrollToElement(newFocused)
}

function getNewFocused(direction) {
  var oldIndex = $(".deepSearch-current-highlight").attr('data-highlight-index')
  var maxIndex = $(".deepSearch-highlight").last().attr('data-highlight-index')

  var newIndex = Number(oldIndex) + direction
  if (newIndex < 0) {
    newIndex = maxIndex
  }
  else if (newIndex > maxIndex) {
    newIndex = 0
  }
  return getHighlightByIndex(newIndex)
}

function getHighlightByIndex(index) {
  const element = $(`.deepSearch-highlight[data-highlight-index='${index}']`)

  if (!element) {
    throw new RangeError("Next/Prev highlight not found!")
  }
  else {
    return element
  }
}

function removeFocused() {
  $(".deepSearch-current-highlight").removeClass('deepSearch-current-highlight')
}

function setFocused(element) {
  element.addClass('deepSearch-current-highlight')
}
