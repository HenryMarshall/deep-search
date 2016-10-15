import { expect } from "chai"

import SearchPage from "./SearchPage"

describe("contextualize", function() {
  let text = "the quick brown fox jumped over the lazy dog"
  let page, queryParams, match
  beforeEach(function() {
    queryParams = {
      search: "fox",
      isRegex: false,
      isCaseInsensitive: true,
    }

    page = new SearchPage({ queryParams })
    match = page.regex.exec(text)
  })
  
  it("should add a context property", function() {
    const contextualized = page.contextualize(text, match, 0)
    expect(contextualized).to.be.an("array")
    expect(contextualized.context).not.to.equal(undefined)
  })
})
