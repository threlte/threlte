export const isProxy = (value) => {
  return typeof value === 'object' && value !== null && value.constructor.name === 'Proxy'
}
