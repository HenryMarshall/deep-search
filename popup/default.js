$(document).on('ready', function(e) {
  registerQuery()
})

function registerQuery() {
  $("#filter").submit(function(e) {
    e.preventDefault();

    var fields = readFields()
    if (fields.isDeep) {
      // TODO
    }
    else {
      // Use library
    }
  })
}

function readFields() {
  return {
    search: $("#deepSearch-search").val(),
    isRegex: $("#is-regex").prop('checked'),
    isDeep: $("#is-deep").prop('checked')
  }
}

