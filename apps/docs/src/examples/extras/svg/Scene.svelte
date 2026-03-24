<script lang="ts">
  import { T } from '@threlte/core'
  import { SVG, OrbitControls } from '@threlte/extras'
  import url from './ordering.svg?url'

  interface Props {
    selection: number
  }
  let { selection }: Props = $props()
</script>

<T.PerspectiveCamera
  makeDefault
  position.z={5}
  position.y={1}
>
  <OrbitControls
    autoRotate
    enablePan={false}
    enableZoom={false}
  />
</T.PerspectiveCamera>

{#if selection == 0}
  <SVG
    src="/icons/svelte.svg"
    scale={0.005}
    position.x={-1.2}
    position.y={1.5}
  />
{:else}
  <SVG
    src={url}
    scale={0.005}
    position.x={-1.2}
    position.y={1.5}
  />
{/if}
