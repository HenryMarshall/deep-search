import $ from 'jquery'

export default function clearMarks() {
  const $body = $("body")
  const $bodyDouble = $("body").clone()
  const $highlights = $bodyDouble.find(".deepSearch-highlight")
  const $parents = $highlights.parent()

  $highlights.replaceWith(function() {
    return $(this).contents()
  })

  $parents.replaceWith(function() {
    this.normalize()
    return this
  })

  $body.replaceWith($bodyDouble)
}
