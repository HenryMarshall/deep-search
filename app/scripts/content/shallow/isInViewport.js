export default function isInViewport(elem) {
  // The popup covers the top bit of the viewport, so we fudge what counts
  // as being "in" the viewport by a comensurate amount.
  const heightOfPopup = 66
  const viewportHeight = document.documentElement.clientHeight
  const { top, bottom } = elem.getBoundingClientRect()
  return (top >= 0 + heightOfPopup && bottom < viewportHeight)
}
