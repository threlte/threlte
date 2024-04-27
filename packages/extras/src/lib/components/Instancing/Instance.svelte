<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { PositionMesh } from './PositionMesh'
  import { useApi } from './api'
  import type { InstanceProps, InstanceEvents, InstanceSlots } from './Instance.svelte'
  import { useInstanceId } from './useInstanceId'

  type $$Events = InstanceEvents
  type $$Slots = InstanceSlots

  let { id = useInstanceId(), ref = $bindable(), ...props }: InstanceProps = $props()

  const { addInstance, removeInstance, instancedMesh, instances } = useApi(id)

  const mesh = new PositionMesh(instancedMesh, instances)

  addInstance(mesh)

  onDestroy(() => {
    removeInstance(mesh)
  })
</script>

<T
  is={mesh}
  bind:ref
  {...props}
>
  <slot ref={mesh} />
</T>
