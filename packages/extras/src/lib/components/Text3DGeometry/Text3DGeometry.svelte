<script lang="ts">
  import {
    T,
    forwardEventHandlers,
    useLoader,
    type AsyncWritable,
    asyncWritable
  } from '@threlte/core'
  import { createEventDispatcher } from 'svelte'

  import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry'
  import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader'

  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils'

  import type { Text3DEvents, Text3DProps, Text3DSlots } from './Text3DGeometry.svelte'

  type $$Props = Required<Text3DProps>
  type $$Events = Text3DEvents
  type $$Slots = Text3DSlots

  export let font: $$Props['font']
  export let text: $$Props['text']

  export let size: $$Props['size'] = 100
  export let height: $$Props['height'] = 50
  export let curveSegments: $$Props['curveSegments'] = 12
  export let bevelEnabled: $$Props['bevelEnabled'] = false
  export let bevelThickness: $$Props['bevelThickness'] = 10
  export let bevelSize: $$Props['bevelSize'] = 8
  export let bevelOffset: $$Props['bevelOffset'] = 0
  export let bevelSegments: $$Props['bevelSegments'] = 3

  export let smooth: $$Props['smooth'] = 0.0

  let loadedFont: AsyncWritable<Font> =
    typeof font === 'string'
      ? useLoader(FontLoader).load(font)
      : asyncWritable<Font>(new Promise((resolve) => resolve(font as Font)))

  const component = forwardEventHandlers()

  let geometryRef: TextGeometry

  $: if (smooth > 0 && geometryRef) {
    geometryRef = toCreasedNormals(geometryRef, smooth) as TextGeometry
  }

  const dispatch = createEventDispatcher()

  $: if (geometryRef) {
    dispatch('rendered', geometryRef)
  }
</script>

{#await $loadedFont then _font}
  <T
    bind:ref={geometryRef}
    bind:this={$component}
    is={TextGeometry}
    args={[
      text,
      {
        font: _font,
        size,
        height,
        curveSegments,
        bevelEnabled,
        bevelThickness,
        bevelSize,
        bevelOffset,
        bevelSegments
      }
    ]}
  >
    <slot ref={geometryRef} />
  </T>
{/await}
