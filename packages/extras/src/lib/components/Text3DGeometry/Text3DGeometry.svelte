<script lang="ts">
  import {
    T,
    asyncWritable,
    forwardEventHandlers,
    useLoader,
    type AsyncWritable
  } from '@threlte/core'
  import { derived, writable } from 'svelte/store'
  import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
  import { FontLoader, type Font } from 'three/examples/jsm/loaders/FontLoader.js'
  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
  import { useSuspense } from '../../suspense/useSuspense'
  import type { Text3DEvents, Text3DProps, Text3DSlots } from './Text3DGeometry.svelte'

  type $$Props = Text3DProps
  type $$Events = Text3DEvents
  type $$Slots = Text3DSlots

  export let text: $$Props['text']
  export let font: $$Props['font'] =
    'https://cdn.jsdelivr.net/npm/three/examples/fonts/helvetiker_regular.typeface.json'
  export let size: $$Props['size'] = undefined
  export let height: $$Props['height'] = undefined
  export let curveSegments: $$Props['curveSegments'] = undefined
  export let bevelEnabled: $$Props['bevelEnabled'] = undefined
  export let bevelThickness: $$Props['bevelThickness'] = undefined
  export let bevelSize: $$Props['bevelSize'] = undefined
  export let bevelOffset: $$Props['bevelOffset'] = undefined
  export let bevelSegments: $$Props['bevelSegments'] = undefined
  export let smooth: $$Props['smooth'] = undefined
  export let depth: $$Props['depth'] = undefined
  export let extrudePath: $$Props['extrudePath'] = undefined
  export let steps: $$Props['steps'] = undefined
  export let UVGenerator: $$Props['UVGenerator'] = undefined

  const suspend = useSuspense()

  $: loadedFont = suspend(
    typeof font === 'string'
      ? useLoader(FontLoader).load(font)
      : asyncWritable<Font>(new Promise((resolve) => resolve(font as Font)))
  ) as AsyncWritable<Font>

  $: options = writable({
    text,
    size,
    height,
    curveSegments,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelOffset,
    bevelSegments
  })
  $: baseGeometry = derived([loadedFont, options], ([font, options]) => {
    if (!font) return
    return new TextGeometry(options.text, {
      font,
      size: options.size,
      height: options.height,
      curveSegments: options.curveSegments,
      bevelEnabled: options.bevelEnabled,
      bevelThickness: options.bevelThickness,
      bevelSize: options.bevelSize,
      bevelOffset: options.bevelOffset,
      bevelSegments: options.bevelSegments,
      depth,
      extrudePath,
      steps,
      UVGenerator
    })
  })

  $: smoothStore = writable(smooth)
  $: creasedGeometry = derived([baseGeometry, smoothStore], ([baseGeometry, smooth]) => {
    if (!baseGeometry) return
    if (smooth === 0) return baseGeometry
    return toCreasedNormals(baseGeometry, smooth) as TextGeometry
  })

  const component = forwardEventHandlers()

  $: console.log($creasedGeometry)
</script>

{#if $creasedGeometry}
  <T
    is={$creasedGeometry}
    bind:this={$component}
    let:ref
  >
    <slot {ref} />
  </T>
{/if}
