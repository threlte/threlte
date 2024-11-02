import type { Props } from '@threlte/core'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export type OrbitControlsProps = Props<OrbitControls> & {
  onchange?: Parameters<OrbitControls['addEventListener']>[1]
}
