import $ from 'jquery'

import setupListeners from './content/messageListener'
import deep from './content/deep'

$(document).on('ready', function() {
  setupListeners()
  deep.initialize()
})
