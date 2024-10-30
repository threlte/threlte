import type { Component } from 'svelte'
import type { Group } from 'three'
import type { Props } from '@threlte/core'

export type ScreenSpaceProps = Props<Group> & {
  /**
   * distance from camera
   */
  depth?: number
}

declare const ScreenSpace: Component<ScreenSpaceProps>
