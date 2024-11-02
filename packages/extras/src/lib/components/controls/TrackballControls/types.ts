import type { Props } from '@threlte/core'
import type { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'

export type TrackballControlsProps = Props<TrackballControls> & {
  onchange?: Parameters<TrackballControls['addEventListener']>[1]
}
