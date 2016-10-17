export default function buildRegex(queryParams) {
  const { isCaseInsensitive, isRegex, search } = queryParams
  if (!search) {
    throw new SyntaxError("Searching empty strings causes a memory explosion")
  }

  const regex = isRegex ? search : regexEscape(search)
  const regexFlags = isCaseInsensitive ? "gi" : "g";
  return new RegExp(regex, regexFlags)
}

function regexEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
}
