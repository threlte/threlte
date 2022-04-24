<script lang="ts">
  import { useRaf } from '$lib/hooks/useRaf'

  import { BoxBufferGeometry, MeshStandardMaterial } from 'three'

  import {
    Canvas,
    DirectionalLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera,
    type ThreltePointerEvent
  } from 'threlte'

  const material = new MeshStandardMaterial()
  const geometry = new BoxBufferGeometry(1, 1, 1)

  const eventCount = {}

  const onEvent = (e: CustomEvent<ThreltePointerEvent>) => {
    if (eventCount[e.type]) eventCount[e.type] += 1
    else eventCount[e.type] = 1
  }

  let translate = false
  let cubePosX = 0

  useRaf(() => {
    if (translate) cubePosX = Math.sin(Date.now() / 1000)
  })
</script>

<div class="canvas-wrapper">
  <Canvas>
    <PerspectiveCamera position={{ x: 10, y: 10, z: 10 }}>
      <OrbitControls />
    </PerspectiveCamera>

    <Mesh
      {geometry}
      {material}
      position={{ x: cubePosX }}
      interactive
      on:click={onEvent}
      on:contextmenu={onEvent}
      on:pointerdown={onEvent}
      on:pointerenter={onEvent}
      on:pointerleave={onEvent}
      on:pointermove={onEvent}
      on:pointerup={onEvent}
    />

    <DirectionalLight position={{ x: 10, y: 20, z: -10 }} />
  </Canvas>
</div>

<div class="test-details">
  <button on:click={() => (translate = !translate)}> translate cube </button>
  <p>events:</p>
  {#each Object.entries(eventCount) as [key, value]}
    <p>{key}: {value}</p>
  {/each}
</div>

<style>
  div.test-details {
    position: fixed;
    top: 0;
    left: 0;
  }

  div.canvas-wrapper {
    width: 100vw;
    height: 100vh;
  }
</style>
