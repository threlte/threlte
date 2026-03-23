let currentIs: unknown | undefined

export const setIs = <T>(is: T) => {
  currentIs = is
}

export const useIs = <T>(): T => {
  const is = currentIs
  currentIs = undefined
  return is as T
}
