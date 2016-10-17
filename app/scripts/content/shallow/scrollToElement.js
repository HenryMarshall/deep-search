import $ from "jquery"

export default function scrollToElement(elements) {
  if (elements.length) {
    const targetPosition = elements.first().offset().top
    const viewportTop = $("body").scrollTop()
    const viewportBottom = viewportTop + $(window).height()

    const isElementAboveViewport = viewportTop > targetPosition
    const isElementBelowViewport = targetPosition > viewportBottom
    // don't scroll if element is already in the viewport
    if (isElementAboveViewport || isElementBelowViewport) {
      window.scrollTo(0, targetPosition)
    }
  }
}
