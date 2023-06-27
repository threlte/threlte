import type { AnyProp } from '../AutoProps.svelte'

export const parsePropLabel = (key: string, value: AnyProp): string => {
  let label = key
  if (typeof value === 'string') {
    label = value
  } else if (typeof value !== 'boolean') {
    label = value.label ?? key
  }

  // make the label alphanumeric by first removing dots (fundamental feature for pierced props) and make the following characters uppercase
  label = label.replace(/\./g, '-').replace(/-([a-z])/g, (g) => g[1].toUpperCase())

  // finally, convert to safe alphanumeric characters without dashes
  label = label.replace(/[^a-zA-Z0-9]/g, '')

  return label
}
