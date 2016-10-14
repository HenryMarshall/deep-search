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

function scrollToElement(elements) {
  const targetPosition = elements.first().offset().top
  const viewportTop = $("body").scrollTop()
  const viewportBottom = viewportTop + $(window).height()

  const isElementAboveViewport = viewportTop > targetPosition
  const isElementBelowViewport = targetPosition > viewportBottom
  if (isElementAboveViewport || isElementBelowViewport) {
    window.scrollTo(0, targetPosition)
  }
}
