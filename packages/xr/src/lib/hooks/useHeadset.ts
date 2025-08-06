import type { Group } from 'three'
import { headset } from '../internal/setupHeadset.svelte'

export const useHeadset = (): Readonly<Group> => {
  return headset
}
