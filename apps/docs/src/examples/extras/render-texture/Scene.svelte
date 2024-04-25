<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, OrbitControls, RenderTexture } from '@threlte/extras'
  import TextureScene from './TextureScene.svelte'
</script>

<T.PerspectiveCamera
  position={[10, 10, 10]}
  makeDefault
  fov={15}
>
  <OrbitControls enableZoom={false} />
</T.PerspectiveCamera>

<T.DirectionalLight
  position={[0, 10, 10]}
  intensity={1.5}
/>
<T.AmbientLight intensity={1} />

<T.GridHelper args={[5]} />

<T.Mesh position.y={0.5}>
  <T.BoxGeometry />
  <T.MeshStandardMaterial>
    <RenderTexture
      anisotropy={16}
      width={256}
      height={256}
    >
      <TextureScene />
    </RenderTexture>
  </T.MeshStandardMaterial>
</T.Mesh>

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>
