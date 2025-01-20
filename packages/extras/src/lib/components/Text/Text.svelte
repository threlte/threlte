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
    ...props
  }: TextProps = $props()

  const text3d = new Text()

  const { invalidate } = useThrelte()

  const onUpdate = async () => {
    await tick()
    text3d.sync(() => {
      invalidate()
      onsync?.()
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
  is={text3d}
  bind:ref
  {...props}
  {font}
  {characters}
  {sdfGlyphSize}
>
  {@render children?.({ ref: text3d })}
</T>
