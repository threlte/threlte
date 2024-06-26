<script lang="ts">
  import { T } from '@threlte/core'
  import { onDestroy } from 'svelte'
  import { PositionMesh } from './PositionMesh'
  import { useApi } from './api'
  import type { InstanceProps } from './Instance.svelte'
  import { useInstanceId } from './useInstanceId'

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
