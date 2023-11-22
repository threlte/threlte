import { headset } from '../internal/setupHeadset'

export const useHeadset = (): Readonly<THREE.Group> => {
  return headset
}
