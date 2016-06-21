'use strict';
import $ from 'jquery'
import initializeMatchedLinks from './content/matchedLinks'
import initializeHighlightMatches from './content/highlightMatches'

$(document).on('ready', function() {
  initializeMatchedLinks()
  initializeHighlightMatches()
})
