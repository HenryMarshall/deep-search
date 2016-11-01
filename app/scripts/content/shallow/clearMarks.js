import $ from 'jquery'

export default function clearMarks() {
  $(".deepSearch-highlight").parent().each(function() {
    const contents = []
    const $parent = $(this)
    $parent.contents().each(function() {
      const $node = $(this)
      let html

      if ($node.hasClass("deepSearch-highlight")) {
        html = $node.html()
      }
      else if (this.nodeName === "#text") {
        html = this.data
      }
      else {
        html = this.outerHTML
      }
      contents.push(html)
    })
    $parent.html(contents.join(""))
  })
}
