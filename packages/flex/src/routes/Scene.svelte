<script lang="ts">
  import { T } from '@threlte/core'
  import Flex from '../lib/Flex/Flex.svelte'
  import Box from '../lib/Box/Box.svelte'
</script>

<T.PerspectiveCamera
  makeDefault
  position={[3, 3, 3]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
/>

<Flex>
  <Box>
    <T.Mesh position.y={1}>
      <T.MeshStandardMaterial
        transparent
        color="white"
      />
      <T.SphereGeometry />
    </T.Mesh>
  </Box>
</Flex>
