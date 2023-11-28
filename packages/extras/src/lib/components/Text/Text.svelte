<script lang="ts">
  import { forwardEventHandlers, T, useThrelte } from '@threlte/core'
  import { createEventDispatcher, tick } from 'svelte'
  import { preloadFont, Text } from 'troika-three-text'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { TextMesh } from './Text.svelte'
  import type { TextProps } from './Text.svelte'

  export let font: TextProps['font'] = undefined
  export let characters: TextProps['characters'] = undefined
  export let sdfGlyphSize: TextProps['sdfGlyphSize'] = undefined

  export const ref = new Text() as TextMesh

  const { invalidate } = useThrelte()

  const dispatch = createEventDispatcher<{
    sync: void
  }>()

  const component = forwardEventHandlers()

  const onUpdate = async () => {
    await tick()
    ref.sync(() => {
      invalidate()
      dispatch('sync')
    })
  }

  $: $$restProps && onUpdate()

  const suspend = useSuspense()
  $: suspend(new Promise<any>((res) => preloadFont({ font, characters, sdfGlyphSize }, res)))
</script>

<T
  is={ref}
  let:ref
  {...$$restProps}
  {font}
  {characters}
  {sdfGlyphSize}
  bind:this={$component}
>
  <slot {ref} />
</T>
