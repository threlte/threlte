<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh } from 'three'
  import Api from './Api.svelte'

  import type { InstancedMeshProps } from './types'

  let {
    id = 'default',
    limit = 1000,
    range = 1000,
    update = true,
    ref = $bindable(),
    children,
    ...props
  }: InstancedMeshProps = $props()

  const mesh = new InstancedMesh(undefined, undefined, 0)

  const useInstancedMesh = (callback: (instancedMesh: InstancedMesh) => void) => {
    callback(mesh)
  }
</script>

<T
  is={mesh}
  bind:ref
  raycast={() => null}
  matrixAutoUpdate={false}
  {...props}
>
  <Api
    instancedMesh={mesh}
    {id}
    {limit}
    {range}
    {update}
    {useInstancedMesh}
  >
    {@render children?.({ ref: mesh })}
  </Api>
</T>
