import $ from 'jquery'

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

  var newIndex = Number(oldIndex) + moveDirection
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
  $element.addClass('deepSearch-current-highlight')
}

function scrollToElement(elements) {
  const targetPosition = $elements.first().offset().top
  const viewportTop = $("html").scrollTop()
  const viewportBottom = top + $(window).height()

  if (bottom < targetPosition) {
    // give a negative offset?
    window.scrollTo(0, targetPosition)
  }
  else if (targetPosition < viewportTop) {
    // positive offset?
    window.scrollTo(0, targetPosition)
  }
}
