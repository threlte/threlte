const escape = (text: string) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const SAFE_HREF = /^(?:https?:\/\/|\/|#|\.\.?\/)/

const renderLinks = (text: string) => {
  let output = ''
  let index = 0
  while (index < text.length) {
    const open = text.indexOf('[', index)
    if (open === -1) break
    const close = text.indexOf('](', open)
    if (close === -1) break
    const label = text.slice(open + 1, close)
    let depth = 1
    let end = close + 2
    for (; end < text.length && depth > 0; end++) {
      const char = text[end]
      if (/\s/.test(char)) break
      if (char === '(') depth++
      else if (char === ')') depth--
    }
    const href = text.slice(close + 2, end - 1)
    if (depth !== 0 || label.includes('[') || label.includes(']') || !SAFE_HREF.test(href)) {
      output += text.slice(index, open + 1)
      index = open + 1
      continue
    }
    output += `${text.slice(index, open)}<a href="${href}">${label}</a>`
    index = end
  }
  return output + text.slice(index)
}

export const inlineMarkdown = (text = '') =>
  renderLinks(escape(text).replace(/`([^`]+)`/g, '<code>$1</code>'))
