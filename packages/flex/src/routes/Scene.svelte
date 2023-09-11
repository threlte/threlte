<script lang="ts">
  import { T } from '@threlte/core'
  import Flex from '../lib/Flex/Flex.svelte'
  import Box from '../lib/Box/Box.svelte'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[10, 10, 10]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<T.DirectionalLight />

<Flex>
  <Box>
    <T.Mesh
      position.y={1}
      scale={2}
    >
      <T.BoxGeometry />
      <T.MeshStandardMaterial
        transparent
        color="white"
      />
    </T.Mesh>
  </Box>
</Flex>
