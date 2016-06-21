export function stripHtml(html) {
  const body = html.match(/<\s*body[^>]*>([\s\S]*)<\s*\/\s*body\s*>/)
  return (
    (body ? body[1] : html)
      .replace(/<\s*script[^>]*>[\s\S]*<\s*\/\s*script\s*>/g, "")
      .replace(/<\s*script[^>]*\/\s*>/g, "")
      .replace(/<[^>]+>/g, "")
      .replace(/(\r?\n){2,}/g, "\n")
      .trim()
  )
}

