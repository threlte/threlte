import type { Props } from '@threlte/core'
import type { SvelteComponent } from 'svelte'
import type { Group, Object3D } from 'three'
import type { TransformControls as TC } from 'three/examples/jsm/controls/TransformControls.js'

export type TransformControlsProps = Props<Group> &
  Props<TC> & {
    autoPauseOrbitControls?: boolean
    object?: Object3D
    group?: Group
    controls?: TC
  }

export default class TransformControls extends SvelteComponent<TransformControlsProps> {}
