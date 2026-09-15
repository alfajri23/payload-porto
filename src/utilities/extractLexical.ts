export function extractTextFromLexical(node: unknown): string {
  if (!node) return ''
  if (typeof node === 'string') return node
  if (typeof node === 'object') {
    const obj = node as Record<string, unknown>
    if (obj.text && typeof obj.text === 'string') {
      return obj.text
    }
    if (Array.isArray(obj.children)) {
      return obj.children.map(extractTextFromLexical).filter(Boolean).join(' ')
    }
    if (obj.root) {
      return extractTextFromLexical(obj.root)
    }
  }
  return ''
}

export function summaryLexicalContent(node: unknown): string | undefined {
  const rawText = extractTextFromLexical(node)
  return rawText.length > 160 ? rawText.slice(0, 160).trim() + '...' : rawText || undefined
}
