export const debounce = <T extends (...args: any[]) => any>(
  callback: T,
  waitFor: number
): ((...args: any[]) => any) => {
  let timeout: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>): ReturnType<T> => {
    let result: any
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      result = callback(...args)
    }, waitFor)
    return result
  }
}
