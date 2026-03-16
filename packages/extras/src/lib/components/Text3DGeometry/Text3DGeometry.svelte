<script lang="ts">
  import { T, asyncWritable, useLoader, type AsyncWritable } from '@threlte/core'
  import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
  import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js'
  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
  import { useSuspense } from '../../suspense/useSuspense.js'
  import type { Text3DProps } from './types.js'

  let {
    text,
    font = 'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json',
    size,
    depth,
    curveSegments,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelOffset,
    bevelSegments,
    smooth,
    extrudePath,
    steps,
    UVGenerator,
    ref = $bindable(),
    children,
    ...props
  }: Text3DProps = $props()

  const suspend = useSuspense()
  const loader = useLoader(FontLoader)

  let loadedFont = $derived(
    suspend<AsyncWritable<Font>>(
      typeof font === 'string'
        ? loader.load(font)
        : asyncWritable<Font>(new Promise((resolve) => resolve(font as Font)))
    )
  )

  let baseGeometry = $derived.by(() => {
    if (!$loadedFont) return

    return new TextGeometry(text, {
      font: $loadedFont,
      size,
      depth,
      curveSegments,
      bevelEnabled,
      bevelThickness,
      bevelSize,
      bevelOffset,
      bevelSegments,
      extrudePath,
      steps,
      UVGenerator
    })
  })

  let creasedGeometry = $derived.by(() => {
    if (!baseGeometry) return
    if (smooth === 0) return baseGeometry
    return toCreasedNormals(baseGeometry, smooth) as TextGeometry
  })
</script>

{#if creasedGeometry}
  <T
    is={creasedGeometry}
    bind:ref
    {...props}
  >
    {@render children?.({ ref: creasedGeometry })}
  </T>
{/if}
