<script lang="ts">
  import { T } from '@threlte/core'
  import Api from './Api.svelte'
  import { InstancedMesh } from 'three'

  import type {
    InstancedMeshProps,
    InstancedMeshEvents,
    InstancedMeshSlots
  } from './InstancedMesh.svelte'

  type $$Props = InstancedMeshProps
  type $$Events = InstancedMeshEvents
  type $$Slots = InstancedMeshSlots

  export let id = 'default'
  export let limit = 1000
  export let range = 1000
  export let update = true

  export const ref = new InstancedMesh(null as any, null as any, 0)

  const args = [null as any, null as any, 0]
</script>

<T
  is={ref}
  raycast={() => null}
  matrixAutoUpdate={false}
  {args}
  {...$$restProps}
>
  <Api
    instancedMesh={ref}
    {id}
    {limit}
    {range}
    {update}
  >
    <slot {ref} />
  </Api>
</T>
