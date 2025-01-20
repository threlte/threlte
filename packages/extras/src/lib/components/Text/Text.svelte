<script lang="ts">
  import { observe, T, useThrelte } from '@threlte/core'
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

  const text = new Text()

  const { invalidate } = useThrelte()

  const onUpdate = async () => {
    await tick()
    text.sync(() => {
      invalidate()
      onsync?.()
    })
  }

  const propsToListenTo = [
    'text',
    'anchorX',
    'anchorY',
    'curveRadius',
    'direction',
    'font',
    'fontSize',
    'letterSpacing',
    'lineHeight',
    'maxWidth',
    'overflowWrap',
    'textAlign',
    'textIndent',
    'whiteSpace',
    'material',
    'color',
    'depthOffset',
    'clipRect',
    'glyphGeometryDetail',
    'sdfGlyphSize',
    'outlineWidth',
    'outlineColor',
    'outlineOpacity',
    'outlineBlur',
    'outlineOffsetX',
    'outlineOffsetY',
    'strokeWidth',
    'strokeColor',
    'strokeOpacity',
    'fillOpacity',
    'characters',
    'colorRanges'
  ]

  observe(
    () => propsToListenTo.map((key) => props[key]) as [any, ...any[]],
    () => {
      onUpdate()
    }
  )

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
  {@render children?.({ ref: text })}
</T>
