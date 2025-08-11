import { getContext, setContext } from 'svelte'
import type { InstancedMesh2 } from '@three.ez/instanced-mesh'

type InstancedMesh2Context = {
  readonly instancedMesh2: InstancedMesh2 | undefined
}

export const createInstancedMesh2Context = (
  getInstancedMesh2: () => InstancedMesh2 | undefined
): InstancedMesh2Context => {
  const context: InstancedMesh2Context = {
    get instancedMesh2() {
      return getInstancedMesh2()
    }
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
