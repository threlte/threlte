import MagicString from 'magic-string'

export const toMagicString = (markup: string): MagicString => {
  return new MagicString(markup)
}

export const recreateMagicString = (markup: MagicString): MagicString => {
  return new MagicString(markup.toString())
}

export const isMagicString = (object: unknown): object is MagicString => {
  return object instanceof MagicString
}
