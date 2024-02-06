<script lang="ts">
  import {
    T,
    forwardEventHandlers,
    useLoader,
    type AsyncWritable,
    asyncWritable
  } from '@threlte/core'
  import type { Text3DEvents, Text3DProps, Text3DSlots } from './Text3D.svelte'
  import { TextGeometry, FontLoader, Font } from 'three/examples/jsm/Addons.js'

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

  let loadedFont: AsyncWritable<Font> =
    typeof font === 'string'
      ? useLoader(FontLoader).load(font)
      : asyncWritable<Font>(new Promise((resolve) => resolve(font as Font)))

  const component = forwardEventHandlers()
</script>

{#await $loadedFont then f}
  <T.Mesh
    let:ref
    bind:this={$component}
    {...$$restProps}
  >
    <T
      is={TextGeometry}
      args={[
        text,
        {
          font: f,
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
    />
    <slot {ref} />
  </T.Mesh>
{/await}
