import { headset } from '../internal/headset'

export const useHeadset = (): Readonly<THREE.Group> => {
  return headset
}
