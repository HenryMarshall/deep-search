import $ from 'jquery'

export default function clearMarks() {
  $('.deepSearch-link-found, .deepSearch-link-not-found').remove()
  console.log("global.deepSearchMatches: ", global.deepSearchMatches)
  global.deepSearchMatches = {}
  console.log("global.deepSearchMatches: ", global.deepSearchMatches)
}
