import type { Group } from 'three'
import { headset } from '../internal/setupHeadset.svelte.js'

export const useHeadset = (): Readonly<Group> => {
  return headset
}
