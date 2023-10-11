import type { CurrentWritable, createRawEventDispatcher } from '@threlte/core'

export type ComputeFunction = (context: Context, handContext: HandContext) => void

export type Context = {
  interactiveObjects: THREE.Mesh[]
  surfaces: Map<string, THREE.Mesh>
  blockers: Map<string, THREE.Mesh>
  dispatchers: WeakMap<THREE.Mesh, ReturnType<typeof createRawEventDispatcher>>
  raycaster: THREE.Raycaster
  compute: ComputeFunction
}

export type HandContext = {
  hand: 'left' | 'right'
  enabled: CurrentWritable<boolean>
  hovered: CurrentWritable<THREE.Intersection | undefined>
}
