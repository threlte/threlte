<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { tick } from 'svelte'
  import { preloadFont, Text } from 'troika-three-text'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { TextProps, TextEvents, TextSlots } from './Text.svelte'

  type $$Events = TextEvents
  type $$Slots = TextSlots

  let { font, characters, sdfGlyphSize, ref = $bindable(), ...props }: TextProps = $props()

  const text = new Text()

  const { invalidate } = useThrelte()

  const onUpdate = async () => {
    await tick()
    text.sync(() => {
      invalidate()
      props.$$events?.sync?.()
    })
  }

  $effect.pre(() => {
    props
    onUpdate()
  })

  const suspend = useSuspense()

  $effect.pre(() => {
    suspend(new Promise<any>((res) => preloadFont({ font, characters, sdfGlyphSize }, res)))
  })
</script>

<T
  is={text}
  bind:ref
  {...props}
  {font}
  {characters}
  {sdfGlyphSize}
>
  <slot ref={text} />
</T>
