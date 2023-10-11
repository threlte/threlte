import type { CurrentWritable, createRawEventDispatcher } from '@threlte/core'

export type Context = {
  surfaces: THREE.Mesh[]
  blockers: THREE.Mesh[]
  dispatchers: WeakMap<THREE.Mesh, ReturnType<typeof createRawEventDispatcher>>
}

export type HandContext = {
  hand: 'left' | 'right'
  enabled: CurrentWritable<boolean>
}
