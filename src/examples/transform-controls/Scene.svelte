<script lang="ts">
  import { onDestroy, onMount } from 'svelte'

  import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import {
    DirectionalLight,
    Mesh,
    PerspectiveCamera,
    useFrame,
    OrbitControls,
    TransformControls
  } from 'threlte'
</script>

<PerspectiveCamera position={{ y: 10, z: 10, x: 10 }} lookAt={{}}>
  <OrbitControls />
</PerspectiveCamera>

<DirectionalLight position={{ y: 10, z: 10 }} />

<Mesh geometry={new BoxBufferGeometry(2, 2, 2)} material={new MeshStandardMaterial()}>
  <TransformControls />
</Mesh>
