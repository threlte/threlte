<script lang="ts">
  import { onDestroy } from 'svelte'
  import { BoxBufferGeometry, GridHelper, MeshStandardMaterial } from 'three'
  import {
    DirectionalLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera,
    TransformControls,
    useThrelte
  } from '@threlte/core'

  const gridHelper = new GridHelper(10, 10)
  const { scene } = useThrelte()
  scene.add(gridHelper)
  onDestroy(() => {
    scene.remove(gridHelper)
  })
</script>

<PerspectiveCamera position={{ y: 5, z: 10, x: 10 }} lookAt={{ y: 0.5 }}>
  <OrbitControls />
</PerspectiveCamera>

<DirectionalLight position={{ y: 10, z: 10 }} />

<Mesh
  position={{ y: 1 }}
  geometry={new BoxBufferGeometry(2, 2, 2)}
  material={new MeshStandardMaterial()}
>
  <TransformControls translationSnap={1} showY={false} />
</Mesh>
