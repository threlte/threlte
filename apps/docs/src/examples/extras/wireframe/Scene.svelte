<script lang="ts">
  import type { InstancedMesh as ThreeInstancedMesh } from 'three'
  import { T, useTask } from '@threlte/core'
  import Character from './Character.svelte'
  import { InstancedMesh, Instance, Wireframe, Outlines, Float } from '@threlte/extras'
  import { Vector3, Quaternion } from 'three'

  let { wireframeProps } = $props()

  let boxes = $state.raw<ThreeInstancedMesh>()

  const numCubes = 70

  useTask((delta) => {
    if (boxes) boxes.rotation.y += delta / 60
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={[-0.8, 1.2, 1.7]}
  oncreate={(ref) => {
    ref.lookAt(0, 1, 0)
  }}
/>

<T.AmbientLight />
<T.DirectionalLight
  position={[10, 5, 5]}
  castShadow
/>

<Character {wireframeProps} />

<T.Mesh
  rotation.x={-90 * (Math.PI / 180)}
  receiveShadow
>
  <T.CircleGeometry args={[3, 72]} />
  <T.MeshStandardMaterial color={'white'} />

  <Outlines
    color="red"
    thickness={10}
  />
</T.Mesh>

<InstancedMesh
  bind:ref={boxes}
  castShadow
>
  <T.BoxGeometry args={[0.07, 0.07, 0.07]} />
  <T.MeshStandardMaterial />

  <Wireframe {...wireframeProps} />
  {#each { length: numCubes }, index}
    {@const height = new Vector3(0, 1.2, 0)}
    {@const position = new Vector3().randomDirection().add(height).toArray()}
    {@const quaternion = new Quaternion().random().toArray()}
    {@const scale = new Vector3().randomDirection().multiplyScalar(2).toArray()}

    <Float seed={Math.random() * index}>
      <Instance
        {position}
        {quaternion}
        {scale}
      />
    </Float>
  {/each}
</InstancedMesh>
