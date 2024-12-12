<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { tick } from 'svelte'
  import { preloadFont, Text } from 'troika-three-text'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { TextProps } from './types'

  let {
    font,
    characters,
    sdfGlyphSize,
    ref = $bindable(),
    onsync,
    children,
    text,
    ...props
  }: TextProps = $props()

  const t = new Text()

  const { invalidate } = useThrelte()

  const onUpdate = async () => {
    await tick()
    t.sync(() => {
      invalidate()
      onsync?.()
    })
  }

  $effect.pre(() => {
    text
    props
    onUpdate()
  })

  const suspend = useSuspense()

  $effect.pre(() => {
    suspend(new Promise<any>((res) => preloadFont({ font, characters, sdfGlyphSize }, res)))
  })
</script>

<T
  is={t}
  bind:ref
  {text}
  {...props}
  {font}
  {characters}
  {sdfGlyphSize}
>
  {@render children?.({ ref: t })}
</T>
