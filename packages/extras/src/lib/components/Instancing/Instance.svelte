<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy, untrack } from 'svelte'
  import { PositionMesh } from './PositionMesh.js'
  import { useApi } from './api.js'
  import type { InstanceProps } from './types.js'
  import { useInstanceId } from './useInstanceId.js'

  let { id = useInstanceId(), ref = $bindable(), children, ...props }: InstanceProps = $props()

  const initialId = untrack(() => id)
  const { addInstance, removeInstance, instancedMesh, instances } = useApi(initialId)

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
  {@render children?.({ ref: mesh })}
</T>
