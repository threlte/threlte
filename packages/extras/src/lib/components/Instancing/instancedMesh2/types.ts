import type { InstancedMesh2 } from '@three.ez/instanced-mesh'
import type { Props } from '@threlte/core'
import type { ColorRepresentation } from 'three'
import type { ThrelteEvents } from '../../../interactivity/types'

type Instance2InteractivityProps = {
  [K in keyof ThrelteEvents]?: (event: ThrelteEvents[K]) => void
}

export type InstanceProps = Props<{}> & {
  id?: string
  color?: ColorRepresentation
} & Instance2InteractivityProps

export type InstancedMesh2Props = Props<InstancedMesh2 | undefined> & {
  bvh?: boolean
}
