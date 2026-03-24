<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMesh } from 'three'
  import Api from './Api.svelte'

  import type { InstancedMeshProps } from './types.js'

  let {
    id = 'default',
    limit = 1000,
    range = 1000,
    update = true,
    ref = $bindable(),
    children,
    ...props
  }: InstancedMeshProps = $props()

  const instancedMesh = new InstancedMesh(undefined, undefined, 0)
</script>

<T
  is={instancedMesh}
  bind:ref
  raycast={() => null}
  matrixAutoUpdate={false}
  {...props}
>
  <Api
    {instancedMesh}
    {id}
    {limit}
    {range}
    {update}
  >
    {@render children?.({ ref: instancedMesh })}
  </Api>
</T>
