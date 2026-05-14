<script lang="ts">
  import { T } from '@threlte/core'
  import { InstancedMeshes, OrbitControls, Sky, useGltf } from '@threlte/extras'
  import { DoubleSide, Mesh, MathUtils, Vector3 } from 'three'
  import Flower from './Flower.svelte'

  const gltf = useGltf<{
    nodes: {
      Blossom: Mesh
      Stem: Mesh
    }
    materials: {}
  }>('/models/Flower.glb')

  const vec3 = new Vector3()

  const items = Array.from({ length: 500 }, () => {
    vec3.randomDirection().multiplyScalar(2.5)
    return {
      x: vec3.x,
      z: vec3.z,
      scale: Math.random() * 0.5 + 0.5,
      rotation: {
        x: Math.random() * 8,
        y: Math.random() * 360,
        z: Math.random() * 8
      }
    }
  })
</script>

{#if $gltf}
  <InstancedMeshes
    castShadow
    meshes={$gltf.nodes}
    oncreate={() => {
      $gltf.scene.traverse((child) => {
        child.castShadow = true
        child.receiveShadow = true
      })
    }}
  >
    {#snippet children({ components: { Blossom, Stem } })}
      {#each items as item}
        <Flower
          position.x={item.x}
          position.z={item.z}
          scale={item.scale}
          rotation.y={item.rotation.y * MathUtils.DEG2RAD}
          rotation.x={item.rotation.x * MathUtils.DEG2RAD}
          rotation.z={item.rotation.z * MathUtils.DEG2RAD}
        >
          <Blossom />
          <Stem />
        </Flower>
      {/each}
    {/snippet}
  </InstancedMeshes>
{/if}

<T.DirectionalLight
  position.y={3}
  position.z={-15}
  castShadow
  shadow.camera.left={-2.5}
  shadow.camera.right={2.5}
  shadow.camera.top={2.5}
  shadow.camera.bottom={-2.5}
  shadow.mapSize.width={2 ** 11}
  shadow.mapSize.height={2 ** 11}
/>

<T.Mesh
  receiveShadow
  rotation.x={-90 * MathUtils.DEG2RAD}
>
  <T.CircleGeometry args={[2.5]} />
  <T.MeshStandardMaterial
    color="#288278"
    side={DoubleSide}
  />
</T.Mesh>

<Sky elevation={2} />

<T.AmbientLight intensity={0.5} />

<T.PerspectiveCamera
  position={[0.5, 0.8, 6.2]}
  makeDefault
  fov={20}
  oncreate={(ref) => ref.lookAt(0, 0.7, 0)}
>
  <OrbitControls
    autoRotate
    enableZoom={false}
    enableDamping
    autoRotateSpeed={0.1}
    enablePan={false}
    target={[0, 0.7, 0]}
  />
</T.PerspectiveCamera>
