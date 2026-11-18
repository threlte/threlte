export const isExpression = (text: string) => {
  try {
    new Function(`return (${text})`)
    return true
  } catch {
    return false
  }
}
