<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { useFlex } from '../hooks/useFlex'
  import { Group, Box3, Vector3 } from 'three'
  import { T } from '@threlte/core'

  const { addChild, yoga, removeChild } = useFlex()

  const boxNode = yoga.Node.create()

  const group = new Group()
  const box = new Box3()
  const size = new Vector3()

  onMount(() => {
    box.setFromObject(group)
    box.getSize(size)
    boxNode.setWidth(size.x)
    boxNode.setHeight(size.y)
    addChild(boxNode)
  })

  onDestroy(() => {
    removeChild(boxNode)
    boxNode.freeRecursive()
  })
</script>

<T is={group}>
  <slot />
</T>
