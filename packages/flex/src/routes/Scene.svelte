<script lang="ts">
  import { T } from '@threlte/core'
  import { Grid, OrbitControls, Text, TransformControls } from '@threlte/extras'
  import Box from '../lib/Box/Box.svelte'
  import Flex from '../lib/Flex/Flex.svelte'
</script>

<T.OrthographicCamera
  makeDefault
  position={[0, 0, 10]}
  zoom={80}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
>
  <OrbitControls />
</T.OrthographicCamera>

<T.DirectionalLight />

<Grid
  sectionSize={1}
  cellSize={0.1}
  cellColor="#292A2D"
  sectionColor="#292A2D"
  axes="xyz"
/>

<T.AxesHelper args={[4]} />

<T.Mesh position={[2.5, -1.5, 1]}>
  <T.BoxGeometry args={[5, 3, 0]} />
  <T.MeshBasicMaterial wireframe />
</T.Mesh>

<Flex
  root={{
    size: {
      width: 5,
      height: 3
    },
    plane: 'xy',
    scaleFactor: 1000
  }}
  flexDirection="row"
  gap={0.1}
  wrap="wrap"
  let:reflow
>
  <Box centerAnchor>
    <TransformControls
      mode="scale"
      on:objectChange={reflow}
    >
      <T.AxesHelper args={[0.1]} />
      <T.Mesh scale={0.5}>
        <T.SphereGeometry />
        <T.MeshBasicMaterial
          transparent
          opacity={0.7}
          color="blue"
        />
      </T.Mesh>
    </TransformControls>
  </Box>

  <Box centerAnchor>
    <Text
      fontSize={0.3}
      text="Works great with <Text>"
      color="white"
      anchorX="50%"
      anchorY="50%"
      on:sync={reflow}
    />
  </Box>

  <Box centerAnchor>
    <T.AxesHelper args={[0.1]} />
    <T.Mesh scale={0.4}>
      <T.BoxGeometry />
      <T.MeshBasicMaterial
        transparent
        opacity={0.7}
        color="green"
      />
    </T.Mesh>
  </Box>

  <Box centerAnchor>
    <T.AxesHelper args={[0.1]} />
    <T.Mesh scale={2}>
      <T.BoxGeometry />
      <T.MeshBasicMaterial
        transparent
        opacity={0.7}
        color="red"
      />
    </T.Mesh>
  </Box>

  <Box centerAnchor>
    <T.AxesHelper args={[0.1]} />
    <T.Mesh scale={1}>
      <T.BoxGeometry />
      <T.MeshBasicMaterial
        transparent
        opacity={0.7}
        color="orange"
      />
    </T.Mesh>
  </Box>

  <Box centerAnchor>
    <T.AxesHelper args={[0.1]} />
    <T.Mesh scale={2}>
      <T.BoxGeometry />
      <T.MeshBasicMaterial
        transparent
        opacity={0.7}
        color="pink"
      />
    </T.Mesh>
  </Box>
</Flex>
