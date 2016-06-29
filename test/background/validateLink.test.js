import { expect } from 'chai'
import { stripHtml } from '../../app/scripts/background/searchUrl'

describe('stripHtml', function() {
  it('should remove tags from properly formatted html', function() {
    const html = "<p>foo<span>bar</span></p>"
    const actual = stripHtml(html)
    const expected = "foobar"
    expect(actual).to.equal(expected)
  })

  it("should remove all scripts", function() {
    const html = `<script type='text/javascript'>alert('foo')</script>
                  <script src='/script.js'/>
                  <p>plain text</p>`
    const actual = stripHtml(html)
    const expected = "plain text"
    expect(actual.trim()).to.equal(expected)
  })

  it("should remove everything outside the body", function() {
    const html = `
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Some title</title>
      </head>
      <body>
        <p>foo</p>
      </body>
      </html>`
    const actual = stripHtml(html)
    const expected = "foo"
    expect(actual.trim()).to.equal(expected)
  })
})

