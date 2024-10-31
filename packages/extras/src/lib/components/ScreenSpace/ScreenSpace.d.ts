import type { Camera, Group } from 'three'
import type { Component } from 'svelte'
import type { Props } from '@threlte/core'

export type ScreenSpaceProps = Props<Group> & {
  /**
   * distance from camera
   * @default 1
   */
  depth?: number
  /**
   * camera to position and rotate the group relative to.
   * @default useCamera().camera.current
   */
  camera?: Camera
  position?: never
  quaternion?: never
}

declare const ScreenSpace: Component<ScreenSpaceProps>

export default ScreenSpace
