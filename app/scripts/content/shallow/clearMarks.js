import $ from "jquery"

export default function clearMarks($elem = $("body")) {
  const $highlights = $elem.find(".deepSearch-highlight")
  const $parents = $highlights.parent()

  $highlights.replaceWith(function() {
    return $(this).contents()
  })

  $parents.replaceWith(function() {
    this.normalize()
    return this
  })

  return $elem
}
