<script lang="ts">
  import { Group } from 'three'
  import { useYoga } from '../hooks/useYoga'
  import { T } from '@threlte/core'
  import { Direction, type Yoga } from 'yoga-layout'
  import { createFlexContext } from '../context/createFlexContext'
  import { onDestroy } from 'svelte'

  const { yoga } = useYoga()

  export let size: { width: number; height: number } | undefined = undefined

  const group = new Group()

  const context = createFlexContext({
    node: undefined as any,
    yoga: undefined as any,
    order: [],
    addChild(child) {
      // find the first available order or insert at end
      let index = context.order.findIndex((c) => !c)
      index = index === -1 ? context.order.length : index
      context.order[index] = index
      context.node.insertChild(child, index)
      context.node.calculateLayout(size?.width, size?.height, Direction.LTR)
    },
    removeChild(child) {
      context.node.removeChild(child)
    }
  })

  const initNode = (yoga: Yoga) => {
    context.yoga = yoga
    context.node = yoga.Node.create()
    context.node?.setWidth(size?.width || 'auto')
    context.node?.setHeight(size?.height || 'auto')
  }

  $: $yoga && initNode($yoga)

  onDestroy(() => {
    context.node?.freeRecursive()
  })
</script>

<T is={group}>
  {#if context.yoga}
    <slot />
  {/if}
</T>
