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

  let {
    id = 'default',
    limit = 1000,
    range = 1000,
    update = true,
    ref = $bindable(),
    ...props
  }: InstancedMeshProps & { ref: InstancedMesh } = $props()

  ref = new InstancedMesh(null as any, null as any, 0)

  const args = [null as any, null as any, 0]
</script>

<T
  is={ref}
  raycast={() => null}
  matrixAutoUpdate={false}
  {args}
  {...props}
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
