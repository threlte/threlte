import type { Group } from 'three'
import { headset } from '../internal/setupHeadset'

export const useHeadset = (): Readonly<Group> => {
  return headset
}
