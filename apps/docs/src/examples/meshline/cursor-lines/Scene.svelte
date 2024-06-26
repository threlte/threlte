<script lang="ts">
  import { T } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import CursorLine from './CursorLine.svelte'

  interactivity()

  let cursorPosition = { x: 0, z: 0 }
  let colors = ['#fc6435', '#ff541f', '#f53c02', '#261f9a', '#1e168d']
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
  oncreate={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.Mesh
  visible={false}
  onpointermove={(event) => {
    cursorPosition.x = event.point.x
    cursorPosition.z = event.point.z
  }}
>
  <T.BoxGeometry args={[20, 0.1, 20]} />
  <T.MeshBasicMaterial />
</T.Mesh>
