import $ from 'jquery'

export default function clearMarks() {
  const $highlights = $(".deepSearch-highlight")
  const $parents = $highlights.parent()

  // Performance may be improved if you perform this replacement inside the
  // "$parents" that occurs later. This would reduce the number of times you
  // touch the DOM -- potentially by a large margin.
  $highlights.replaceWith(function() {
    return $(this).contents()
  })

  $parents.replaceWith(function() {
    this.normalize()
    return this
  })
}
