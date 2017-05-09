import $ from "jquery"

// This is a jquery function. It is to be included thusly:
//   import groupBy from "./groupBy"
//   $.fn.groupBy = groupBy
// It assumes you have a jquery object containing elements already
// sorted by a given attribute. It returns an array of jquery objects
// with these sets of elements as seperate jquery objects within an
// array.

// Given:
//   jquery{<p data-foo="0">, <p data-foo="1">, <p data-foo="1">}
// it returns:
//   [jquery{<p data-foo="0">}, jquery{<p data-foo="1">, <p data-foo="1">}]

export default function groupBy(attribute) {
  const that = this
  const groups = []
  let startingIndexOfCurrentGroup = 0
  let currentGroupHighlightIndex = null

  if (this.length === 0) {
    return []
  }

  this.each(function(idx) {
    const highlightIndex = $(this).attr(attribute)

    if (idx === 0) {
      currentGroupHighlightIndex = highlightIndex
    }

    if (currentGroupHighlightIndex !== highlightIndex) {
      groups.push(that.slice(startingIndexOfCurrentGroup, idx))
      startingIndexOfCurrentGroup = idx
      currentGroupHighlightIndex = highlightIndex
    }
  })

  // The final group was never succeeded, and thus never added to group
  // inside the .each loop.
  groups.push(this.slice(startingIndexOfCurrentGroup))

  return groups
}
