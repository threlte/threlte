import { getContext, setContext } from 'svelte'
import type { InstancedMesh2 } from '@three.ez/instanced-mesh'
import { InstancedMesh2Interactivity } from './InstancedMesh2Interactivity.svelte'

export type InstancedMesh2Context = {
  readonly instancedMesh2: InstancedMesh2 | undefined
  interactivity: InstancedMesh2Interactivity
}

export const createInstancedMesh2Context = (
  getInstancedMesh2: () => InstancedMesh2 | undefined
): InstancedMesh2Context => {
  const context: InstancedMesh2Context = {
    get instancedMesh2() {
      return getInstancedMesh2()
    },
    interactivity: new InstancedMesh2Interactivity()
  }

  setContext<InstancedMesh2Context>('instancedMesh2', context)

  return context
}

export const useInstancedMesh2 = (): InstancedMesh2Context => {
  const context = getContext<InstancedMesh2Context>('instancedMesh2')

  if (!context) {
    throw new Error('useInstancedMesh2 can only be used within an <InstancedMesh2> component.')
  }

  return context
}
