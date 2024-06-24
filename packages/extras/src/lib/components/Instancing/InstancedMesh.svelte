<script lang="ts">
  import { T } from '@threlte/core'
  import Api from './Api.svelte'
  import { InstancedMesh } from 'three'

  import type { InstancedMeshProps } from './InstancedMesh.svelte'

  let {
    id = 'default',
    limit = 1000,
    range = 1000,
    update = true,
    ref = $bindable(),
    children,
    ...props
  }: InstancedMeshProps = $props()

  const mesh = new InstancedMesh(null as any, null as any, 0)

  const args = [null as any, null as any, 0]
</script>

<T
  is={mesh}
  bind:ref
  raycast={() => null}
  matrixAutoUpdate={false}
  {args}
  {...props}
>
  <Api
    instancedMesh={mesh}
    {id}
    {limit}
    {range}
    {update}
  >
		{@render children?.({ref:mesh})}
  </Api>
</T>
