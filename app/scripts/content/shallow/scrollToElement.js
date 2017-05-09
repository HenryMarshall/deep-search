import isInViewport from "./isInViewport"

export default function scrollToElement($target) {
  const target = $target[0]

  if (target && !isInViewport(target)) {
    const viewportTopAbsolute = window.scrollY
    const targetTopRelativeToViewport = target.getBoundingClientRect().top
    const targetTopAbsolute = targetTopRelativeToViewport + viewportTopAbsolute

    const viewportHeight = document.documentElement.clientHeight
    const centeredPosition = targetTopAbsolute - (viewportHeight / 2)

    window.scrollTo(0, centeredPosition)
  }
}
