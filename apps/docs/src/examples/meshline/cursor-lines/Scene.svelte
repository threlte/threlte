<script lang="ts">
  import CursorLine from './CursorLine.svelte'
  import { T } from '@threlte/core'
  import type { Vector3Tuple } from 'three'
  import { interactivity } from '@threlte/extras'

  interactivity()

  let cursorPosition: Vector3Tuple = $state.raw([0, 0, 0])
  const colors = ['#fc6435', '#ff541f', '#f53c02', '#261f9a', '#1e168d']
</script>

{#each colors as color, i}
  <CursorLine
    {color}
    {cursorPosition}
    position.y={5 - i}
    stiffness={0.02 * i + 0.02}
    damping={0.25 - 0.04 * i}
    width={15 + i * 10}
  />
{/each}

<T.OrthographicCamera
  zoom={50}
  makeDefault
  position.y={10}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<T.Mesh
  visible={false}
  onpointermove={(event) => {
    cursorPosition = event.point.toArray()
  }}
  scale={100}
  rotation.x={-1 * 0.5 * Math.PI}
>
  <T.PlaneGeometry />
</T.Mesh>
