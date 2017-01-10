export default function clearMarks() {
  const reverter = global.deepSearch.get("reverter")
  if (reverter) {
    reverter.revert()
  }

  for (let key of global.deepSearch.keys()) {
    global.deepSearch.delete(key)
  }
}
