import { expect } from "chai"

import { contextualize } from "./searchHtml"

describe("contextualize", function() {
  let match, text
  beforeEach(function() {
    const regex = /fox/
    text = "the quick brown fox jumps over the lazy dog"
    match = regex.exec(text)
  })

  it("should add a context property", function() {
    const contextualized = contextualize(text, match, 0)
    expect(contextualized.preceedingContext).not.to.equal(undefined)
    expect(contextualized.followingContext).not.to.equal(undefined)
  })

  it("should have a length corresponding to the char limit", function() {
    const contextLimit = 9
    const matchLength = match[0].length

    const contextualized = contextualize(text, match, contextLimit)
    expect(contextualized.preceedingContext.length).to.be.at.most(contextLimit)
  })

  describe("context", function() {
    it("should have an empty context if chars is too small", function() {
      const contextLimit = 4
      const contextualized = contextualize(text, match, contextLimit)

      expect(contextualized.preceedingContext).to.equal("")
      expect(contextualized.followingContext).to.equal("")
    })

    it("should chunk by words when exact number is a boundary", function() {
      const contextLimit = 6
      const contextualized = contextualize(text, match, contextLimit)

      expect(contextualized.preceedingContext).to.equal("brown ")
      expect(contextualized.followingContext).to.equal(" jumps")
    })

    it("should chunk by words when number if *over* boundary", function() {
      const contextLimit = 8
      const contextualized = contextualize(text, match, contextLimit)

      // would be "k brown " if grabbing naively
      expect(contextualized.preceedingContext).to.equal("brown ")
      // would be " jumps o" if grabbing naively
      expect(contextualized.followingContext).to.equal(" jumps")
    })
  })
})
