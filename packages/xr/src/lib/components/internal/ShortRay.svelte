<script lang="ts">
  import { T } from '@threlte/core'
  import { pointerState, teleportState, teleportIntersection } from '../../internal/stores'
  import type { Snippet } from 'svelte'

  interface Props {
    handedness: 'left' | 'right'
    children?: Snippet
  }

  let { handedness, children }: Props = $props()

  let hovering = $derived($teleportState[handedness].hovering)
  let intersection = $derived(teleportIntersection[handedness])
  let visible = $derived(
    $pointerState[handedness].enabled || (hovering && $intersection === undefined)
  )

  const vertexShader = `
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    attribute vec2 uv;
    attribute vec3 position;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`

  const fragmentShader = `
    precision mediump float;
    varying vec2 vUv;
    void main() {
      gl_FragColor = vec4(1.0, 1.0, 1.0, pow(vUv.y - 1.0, 2.0));
    }`
</script>

<T.Group {visible}>
  {#if children}
    {@render children()}
  {:else}
    <T.Mesh
      rotation.x={-Math.PI / 2}
      position.z={-0.1}
    >
      <T.CylinderGeometry args={[0.002, 0.002, 0.2, 16, 1, false]} />
      <T.RawShaderMaterial
        transparent
        {vertexShader}
        {fragmentShader}
      />
    </T.Mesh>
  {/if}
</T.Group>
