<script lang="ts">
  import CursorLine from './CursorLine.svelte'
  import type { Vector3Tuple } from 'three'
  import { MeshLineGeometry, MeshLineMaterial } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'

  interactivity()

  const cursorPosition = new Spring<Vector3Tuple>([0, 0, 0])

  const colors = ['#0000ff', '#00ff00', '#00ffff', '#ff0000', '#ff00ff', '#ffff00']
  const m = (2 * Math.PI) / colors.length
</script>

{#each colors as color, i}
  {@const a = m * i}
  <CursorLine
    {color}
    cursorPosition={cursorPosition.current}
    position.x={0.5 * Math.cos(a)}
    position.y={0.5 * Math.sin(a)}
  >
    {#snippet children({ getPoints })}
      <MeshLineGeometry
        points={getPoints()}
        shape="taper"
      />
      <MeshLineMaterial
        width={10}
        {color}
        attenuate={false}
      />
    {/snippet}
  </CursorLine>
{/each}

<T.OrthographicCamera
  zoom={50}
  makeDefault
/>

<T.Mesh
  visible={false}
  onpointermove={(event) => {
    cursorPosition.set(event.point.toArray())
  }}
  position.z={-10}
  scale={100}
>
  <T.PlaneGeometry />
</T.Mesh>
