import $ from 'jquery'

export default function clearMarks() {
  $(".deepSearch-highlight").each(function() {
    $(this).replaceWith($(this).html())
  })
}
