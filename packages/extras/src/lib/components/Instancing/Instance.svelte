<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { PositionMesh } from './PositionMesh.js'
  import { useApi } from './api.js'
  import type { InstanceProps } from './types.js'
  import { useInstanceId } from './useInstanceId.js'

  let { id = useInstanceId(), ref = $bindable(), children, ...props }: InstanceProps = $props()

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
  {@render children?.({ ref: mesh })}
</T>
