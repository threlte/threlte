import { onDestroy } from 'svelte'

type XRCallback = (frame: XRFrame, dt: number) => void

export const xrRenderCallbacks: XRCallback[] = []

/**
 *
 * @deprecated Use useFrame()
 * @param callback 
 * @param options 
 * @returns 
 */
export const useXRFrame = (callback: XRCallback, options: { autostart?: boolean } = {}) => {
  console.warn('Warning: useXRFrame is deprecated. It will be removed in an upcoming release. Use useFrame instead.')
  const start = () => xrRenderCallbacks.push(callback)
  const stop = () => xrRenderCallbacks.splice(xrRenderCallbacks.indexOf(callback), 1)

  if (options.autostart) {
    start()
  }

  onDestroy(stop)

  return {
    start,
    stop,
  }
}
