<script lang="ts">
  import { MeshStandardMaterial, SphereBufferGeometry } from 'three'
  import {
    AmbientLight,
    DirectionalLight,
    InstancedMesh,
    OrthographicCamera,
    useThrelte
  } from '@threlte/core'
  import Sphere from './Sphere.svelte'

  const geometry = new SphereBufferGeometry(0.5)
  const material = new MeshStandardMaterial()

  const positions: { x: number; z: number }[] = []
  const rows = 30
  for (let x = 0; x < rows; x += 1) {
    for (let z = 0; z < rows; z += 1) {
      positions.push({
        x,
        z
      })
    }
  }

  const { size } = useThrelte()
  let zoom = $size.width / 50
  $: zoom = $size.width / 50
</script>

<OrthographicCamera position={{ x: 50, y: 50, z: 50 }} {zoom} lookAt={{}} />

<InstancedMesh {geometry} {material} interactive position={{ x: -rows / 2, z: -rows / 2 }}>
  {#each positions as position}
    <Sphere {position} />
  {/each}
</InstancedMesh>

<DirectionalLight position={{ y: 10, z: 5 }} />

<AmbientLight intensity={0} />
