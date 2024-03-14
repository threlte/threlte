import type { Props, Events, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Group, Object3D } from 'three'
import type { TransformControls as TC } from 'three/examples/jsm/controls/TransformControls.js'

export type TransformControlsProps = Props<Group> &
  Props<TC> & {
    autoPauseOrbitControls?: boolean
    object?: Object3D
    group?: Group
    controls?: TC
  }

export type TransformControlsEvents = Events<TC>

export type TransformControlsSlots = Slots<Group>

export default class TransformControls extends SvelteComponent<
  TransformControlsProps,
  TransformControlsEvents,
  TransformControlsSlots
> {}
