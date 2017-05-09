import $ from 'jquery'

import messageListener from './content/messageListener'
import deep from './content/deep'

$(document).on('ready', function() {
  messageListener()
  deep.initialize()
  global.deepSearch = new Map()
})
