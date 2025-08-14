import { PointsMaterial } from 'three'
import type { Props } from '@threlte/core'
import type { Snippet } from 'svelte'

export interface PointsMaterialProps extends Props<typeof PointsMaterial> {
  children?: Snippet
}
