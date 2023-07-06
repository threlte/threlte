import { useXrController } from './hooks'

/**
 * @deprecated
 */
export const useController = (handedness: XRHandedness) => {
  console.warn('`useController` is deprecated. use `useXrController` instead.')
  return useXrController(handedness)
}
