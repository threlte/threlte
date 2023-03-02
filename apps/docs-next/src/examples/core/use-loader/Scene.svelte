<script lang="ts">
  import { T, Three, useLoader } from '@threlte/core'
  import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

  const { load } = useLoader(GLTFLoader)
</script>

<T.PerspectiveCamera
  position={[1, 1, 1]}
  on:create={({ ref }) => ref.lookAt(0, 0, 0)}
  makeDefault
/>

<T.DirectionalLight
  position.y={10}
  position.z={10}
/>

<T.AmbientLight intensity={0.3} />

{#await load('/models/Flower.glb') then gltf}
  <Three type={gltf.scene} />
{/await}
