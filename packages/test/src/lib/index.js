if (typeof window !== 'undefined') {
  const { warn: originalWarn } = console

  /**
   * @TODO Is this an issue on our end / cleanup / or JSDOM?
   * @param  {...unknown} args
   */
  const warn = (...args) => {
    if (args[0] === 'WARNING: Multiple instances of Three.js being imported.') {
      return
    }

    originalWarn.call(console, ...args)
  }

  console.warn = warn
}

export { act, cleanup, render } from './pure'
