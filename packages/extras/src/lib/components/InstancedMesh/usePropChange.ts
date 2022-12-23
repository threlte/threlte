export const usePropChange = <T extends any>(
  prop: T,
  equalityFn?: (newValue: T, oldValue: T) => boolean
): {
  onChange: (newValue: T, callback: (newValue: T, oldValue: T) => void) => void
} => {
  let oldValue: T = prop

  const onChange = (newValue: T, callback: (newValue: T, oldValue: T) => void) => {
    if (equalityFn && !equalityFn(newValue, oldValue)) {
      callback(newValue, oldValue)
      oldValue = newValue
    } else if (!equalityFn && newValue !== oldValue) {
      callback(newValue, oldValue)
      oldValue = newValue
    }
  }

  return {
    onChange
  }
}
