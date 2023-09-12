<script lang="ts">
  import { T, useRender } from '@threlte/core'
  import { Grid, OrbitControls, Suspense, Text } from '@threlte/extras'
  import { tick } from 'svelte'
  import { MOUSE } from 'three'
  import Node from '../lib/Node/Node.svelte'
  import Root from '../lib/Root/Root.svelte'
  import Gizmo from './Gizmo.svelte'
  import Sphere from './Sphere.svelte'
  import Box from './Box.svelte'

  useRender(async ({ renderer, scene, camera }) => {
    await tick()
    renderer.render(scene, camera.current)
  })

  let boxes = 0
</script>

<svelte:window
  on:keypress={(e) => {
    if (e.key === '+') {
      boxes += 1
    } else if (e.key === '-') {
      boxes -= 1
    }
  }}
/>

<T.OrthographicCamera
  makeDefault
  position={[0, 0, 10]}
  zoom={160}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls
    mouseButtons={{
      LEFT: MOUSE.PAN,
      RIGHT: MOUSE.ROTATE
    }}
    zoomToCursor
  />
</T.OrthographicCamera>

<T.DirectionalLight />

<Grid
  sectionSize={1}
  cellSize={0.1}
  cellColor="#838383"
  sectionColor="#838383"
  axes="xyz"
/>

<Gizmo arrows />

<Suspense>
  <Root
    flexDirection="Row"
    flexWrap="Wrap"
    width={50}
    scaleFactor={10000}
    gap={0.1}
  >
    <Node centerAnchor>
      <Sphere />
    </Node>

    <Node
      flexDirection="Column"
      flexWrap="NoWrap"
      gap={0.1}
    >
      <Node centerAnchor>
        <Sphere />
      </Node>

      <Node
        dir="Row"
        gap={0.1}
      >
        {#each new Array(boxes) as _, i (i)}
          <Node centerAnchor>
            <Box />
          </Node>
        {/each}
      </Node>
    </Node>
  </Root>
</Suspense>
