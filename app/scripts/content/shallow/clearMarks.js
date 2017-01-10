export default function clearMarks() {
  const reverter = global.deepSearch.get("reverter")
  if (reverter) {
    reverter.revert()
  }
}
