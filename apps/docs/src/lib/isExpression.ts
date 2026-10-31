/**
 * Whether `text` is a JavaScript expression, such as `[20, 20]` or
 * `Math.PI / 3`, rather than a description like "the camera's position".
 * The text is only compiled, never run.
 */
export const isExpression = (text: string) => {
  try {
    new Function(`return (${text})`)
    return true
  } catch {
    return false
  }
}
