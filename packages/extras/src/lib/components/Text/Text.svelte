<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { tick } from 'svelte'
  import { preloadFont, Text } from 'troika-three-text'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { TextMesh } from './Text.svelte'
  import type { TextProps } from './Text.svelte'

  let {
    font,
    characters,
    sdfGlyphSize,
    ref = $bindable(),
    ...props
  }: TextProps & { ref: TextMesh } = $props()

  ref = new Text()

  const { invalidate } = useThrelte()

  const onUpdate = async () => {
    await tick()
    ref.sync(() => {
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
  is={ref}
  {...props}
  {font}
  {characters}
  {sdfGlyphSize}
>
  <slot {ref} />
</T>
