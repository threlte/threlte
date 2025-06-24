export const easeInExpo = (x: number): number => {
  return +(x !== 0) * 2 ** (10 * x - 10)
}
