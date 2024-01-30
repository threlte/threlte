<script lang="ts">
  import { T, forwardEventHandlers } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { PositionMesh } from './PositionMesh'
  import { useApi } from './api'
  import type { InstanceProps, InstanceEvents, InstanceSlots } from './Instance.svelte'

  type $$Props = InstanceProps
  type $$Events = InstanceEvents
  type $$Slots = InstanceSlots

  export let id = 'default'

  const { addInstance, removeInstance, instancedMesh, instances } = useApi(id)

  export const ref = new PositionMesh(instancedMesh, instances)

  addInstance(ref)
  onDestroy(() => {
    removeInstance(ref)
  })

  const dispatchingComponent = forwardEventHandlers()
</script>

<T
  is={ref}
  bind:this={$dispatchingComponent}
  {...$$restProps}
>
  <slot {ref} />
</T>
