<script lang="ts">
  import { T, forwardEventHandlers } from '@threlte/core'
  import Api from './Api.svelte'
  import type { InstancedMesh } from 'three'

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

  // forward ref binding
  export let ref: InstancedMesh | undefined = undefined

  const dispatchingComponent = forwardEventHandlers()

  const args = [null as any, null as any, 0]
</script>

<T.InstancedMesh
  raycast={() => null}
  matrixAutoUpdate={false}
  {args}
  bind:ref
  let:ref
  {...$$restProps}
  bind:bind={$dispatchingComponent}
>
  <Api instancedMesh={ref} {id} {limit} {range} {update}>
    <slot {ref} />
  </Api>
</T.InstancedMesh>
