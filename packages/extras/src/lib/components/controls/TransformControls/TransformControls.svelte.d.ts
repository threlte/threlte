import type { Props, Events } from '@threlte/core'
import type { Snippet, SvelteComponent } from 'svelte'
import type { Group, Object3D } from 'three'
import type { TransformControls as TC } from 'three/examples/jsm/controls/TransformControls.js'

export type TransformControlsProps = Props<Group> &
  Props<TC> & {
    autoPauseOrbitControls?: boolean
    object?: Object3D
    group?: Group
    controls?: TC
    children?: TransformControlsSnippet
  }

export type TransformControlsEvents = Events<TC>

export type TransformControlsSnippet = Snippet<[{ ref: Group }]>

export default class TransformControls extends SvelteComponent<
  TransformControlsProps,
  TransformControlsEvents
> {}
