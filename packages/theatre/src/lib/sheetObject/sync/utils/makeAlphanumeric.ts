export const makeAlphanumeric = (label: string) => {
  // make the label alphanumeric by first removing dots (fundamental feature for pierced props) and make the following characters uppercase
  label = label.replace(/\./g, '-').replace(/-([a-z])/g, (g) => g[1].toUpperCase())

  // finally, convert to safe alphanumeric characters without dashes
  label = label.replace(/[^a-zA-Z0-9]/g, '')

  return label
}
