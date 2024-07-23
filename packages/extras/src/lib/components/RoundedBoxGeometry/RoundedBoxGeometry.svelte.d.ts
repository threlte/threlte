import type { Props } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { ExtrudeGeometry } from 'three'

export type RoundedBoxGeometryProps = Props<ExtrudeGeometry> & {
  args?: [width?: number, height?: number, depth?: number] | []
  radius?: number
  smoothness?: number
  creaseAngle?: number
  steps?: number
}

export default class RoundedBoxGeometry extends SvelteComponent<RoundedBoxGeometryProps> {}
