import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Box3, Group, Object3D, Sphere, Vector3 } from 'three'

export type CenterProps = Props<Group> & {
  /** Center the object on the x-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the x-axis. */
  x?: false | number
  /** Center the object on the y-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the y-axis. */
  y?: false | number
  /** Center the object on the z-axis. If a number between -1 and 1 is provided, it will be used as the alignment on the z-axis. */
  z?: false | number
  /** See https://threejs.org/docs/index.html?q=box3#api/en/math/Box3.setFromObject */
  precise?: boolean
  /** Force a recalculation of the bounding box. */
  center?: () => void
  /** Injects a plugin in all child `<T>` components to automatically center whenever a component mounts or unmounts, defaults to false */
  autoCenter?: boolean
}

export type CenterEvents = Events<Group> & {
  center: {
    /** The outmost container group of the <Center> component */
    container: Object3D
    /** The width of the bounding box */
    width: number
    /** The height of the bounding box */
    height: number
    /** The depth of the bounding box */
    depth: number
    boundingBox: Box3
    boundingSphere: Sphere
    center: Vector3
    verticalAlignment: number
    horizontalAlignment: number
    depthAlignment: number
  }
}

export type CenterSlots = Slots<Group> & {
  default: {
    center: () => void
  }
}

export default class Center extends SvelteComponent<CenterProps, CenterEvents, CenterSlots> {}
