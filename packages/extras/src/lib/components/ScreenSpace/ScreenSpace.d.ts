import type { Camera, Group } from 'three'
import type { Component } from 'svelte'
import type { Props } from '@threlte/core'

export type ScreenSpaceProps = Omit<Props<Group>, 'position' | 'quaternion'> & {
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
}

declare const ScreenSpace: Component<ScreenSpaceProps>
