/** @typedef {Record<string, unknown>} Props */

/**
 * Create a shallowly reactive props object.
 *
 * This allows us to update props on `rerender`
 * without turning `props` into a deep set of Proxy objects.
 *
 * @param {Props} initialProps
 * @returns {[Props, (nextProps: Partial<Props>) => void]}
 */
const createProps = (initialProps = {}) => {
  let currentProps = $state(initialProps)

  const props = new Proxy(/** @type {Props} */ (initialProps), {
    get(_, key) {
      return currentProps[/** @type {string} */ (key)]
    },
    set(_, key, value) {
      currentProps[/** @type {string} */ (key)] = value
      return true
    },
    has(_, key) {
      return Reflect.has(currentProps, key)
    },
    ownKeys() {
      return Reflect.ownKeys(currentProps)
    },
  })

  /** @param {Partial<Props>} nextProps */
  const update = (nextProps) => {
    for (const key in nextProps) {
      currentProps[key] = nextProps[key]
    }
  }

  return [props, update]
}

export { createProps }
