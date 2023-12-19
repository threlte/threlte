import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { TrackballControls as ThreeTrackballControls } from 'three/examples/jsm/controls/TrackballControls'

export type TrackballControlsProps = Props<ThreeTrackballControls>
export type TrackballControlsEvents = Events<ThreeTrackballControls>
export type TrackballControlsSlots = Slots<ThreeTrackballControls>

export default class TrackballControls extends SvelteComponent<
  TrackballControlsProps,
  TrackballControlsEvents,
  TrackballControlsSlots
> {}
