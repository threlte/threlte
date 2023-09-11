<script lang="ts">
  import { Group } from 'three'
  import { useYoga } from '../hooks/useYoga'
  import { T } from '@threlte/core'
  import { Direction, type Yoga } from 'yoga-layout'
  import { createFlexContext } from '$lib/context/createFlexContext'
  import { onDestroy } from 'svelte'

  const { yoga } = useYoga()

  export let root:
    | {
        size: {
          width: number
          height: number
        }
        plane: 'xy' | 'xz' | 'yz'
      }
    | undefined = undefined

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
      context.node.calculateLayout(root?.size.width, root?.size.height, Direction.LTR)
      context.emit('layout:change')
    },
    removeChild(child) {
      context.node.removeChild(child)
      context.node.calculateLayout(root?.size.width, root?.size.height, Direction.LTR)
      context.emit('layout:change')
    }
  })

  const initNode = (yoga: Yoga) => {
    context.yoga = yoga
    context.node = yoga.Node.create()
    context.node?.setWidth(root?.size.width || 'auto')
    context.node?.setHeight(root?.size.height || 'auto')
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
