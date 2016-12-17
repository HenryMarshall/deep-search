import $ from "jquery"

function updateInMemory(mutateDom, onCompletion, elem = "body") {
  const $elem = $(elem)
  const $cloned = $elem.clone(true)
  mutateDom($cloned)
  $elem.replaceWith($cloned)

  if (onCompletion) {
    onCompletion()
  }
}

export default updateInMemory
