import type { Props, Events, Slots } from '@threlte/core'
import { SvelteComponentTyped } from 'svelte'
import type { Group, Object3D } from 'three'
import type { TransformControls } from 'three/examples/jsm/controls/TransformControls'

export type TransformControlsProps = Props<Group> &
  Props<TransformControls> & {
    autoPauseOrbitControls?: boolean
    object?: Object3D
  }

export type TransformControlsEvents = Events<TransformControls>

export type TransformControlsSlots = Slots<Group>

export default class Grid extends SvelteComponentTyped<
  TransformControlsProps,
  TransformControlsEvents,
  TransformControlsSlots
> {}
