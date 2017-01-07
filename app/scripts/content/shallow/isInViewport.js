export default function isInViewport(idx, elem) {
  const viewportHeight = document.documentElement.clientHeight
  const { top, bottom } = elem.getBoundingClientRect()
  return (top >= 0 && bottom < viewportHeight)
}
