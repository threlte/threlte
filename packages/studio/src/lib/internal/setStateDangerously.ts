/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-console */

const originalWarn = console.warn
const originalTrace = console.trace

const noop = () => {}

const overrideConsole = () => {
  console.warn = noop
  console.trace = noop
}

const resetConsole = () => {
  console.warn = originalWarn
  console.trace = originalTrace
}

/**
 * Utility to set $state in Svelte 5 without annoying ownership warnings. For
 * grown-ups only.
 */
export const setStateDangerously = <Setter extends (...args: any[]) => any>(
  callback: Setter,
): ReturnType<Setter> => {
  overrideConsole()
  const result = callback()
  resetConsole()
  return result
}
