<script lang="ts">
  import { forwardEvents, T, useThrelte } from '@threlte/core'
  import { createEventDispatcher, tick } from 'svelte'
  import { Text } from 'troika-three-text'
  import type { TextMesh } from './Text.svelte'

  export const ref = new Text() as TextMesh

  const { invalidate } = useThrelte()

  const dispatch = createEventDispatcher<{
    sync: void
  }>()

  const component = forwardEvents()

  const onUpdate = async () => {
    await tick()
    ref.sync(() => {
      invalidate('Text: sync finished')
      dispatch('sync')
    })
  }

  $: $$restProps && onUpdate()
</script>

<T is={ref} let:ref {...$$restProps} bind:this={$component}>
  <slot {ref} />
</T>
