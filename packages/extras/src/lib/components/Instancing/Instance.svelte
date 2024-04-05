<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { PositionMesh } from './PositionMesh'
  import { useApi } from './api'
  import type { InstanceProps, InstanceEvents, InstanceSlots } from './Instance.svelte'

  type $$Props = InstanceProps
  type $$Events = InstanceEvents
  type $$Slots = InstanceSlots

  let { id = 'default', ...props }: InstanceProps = $props()

  const { addInstance, removeInstance, instancedMesh, instances } = useApi(id)

  export const ref = new PositionMesh(instancedMesh, instances)

  addInstance(ref)

  onDestroy(() => {
    removeInstance(ref)
  })
</script>

<T
  is={ref}
  {...props}
>
  <slot {ref} />
</T>
