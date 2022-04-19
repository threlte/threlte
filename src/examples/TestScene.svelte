<script lang="ts">
  import OrbitControls from '$lib/controls/OrbitControls.svelte'
  import InstancedMeshInstance from '$lib/internal/InstancedMeshInstance.svelte'
  import InstancedMesh from '$lib/objects/InstancedMesh.svelte'
  import Mesh from '$lib/objects/Mesh.svelte'
  import { BoxBufferGeometry, MeshBasicMaterial, SphereBufferGeometry } from 'three'
  import { PerspectiveCamera, useFrame } from 'threlte'

  const geometry = new SphereBufferGeometry(1, 20, 20)
  const materialA = new MeshBasicMaterial({
    color: 'rgb(40, 40, 40)',
    wireframe: false
  })
  const materialB = new MeshBasicMaterial({
    color: 'rgb(120, 120, 120)',
    wireframe: false
  })
  let currentMaterial = materialA

  let showA = true
  let showB = true

  let x = 0
  let y = 0
  useFrame(() => {
    x = Math.sin(Date.now() / 1000)
    y = Math.cos(Date.now() / 1000)
  })

  window.addEventListener('keypress', (e) => {
    const key = e.key
    if (key === 'a') showA = !showA
    if (key === 'b') showB = !showB
    if (key === 'm') currentMaterial = currentMaterial === materialA ? materialB : materialA
  })
</script>

<PerspectiveCamera position={{ z: 10 }}>
  <OrbitControls />
</PerspectiveCamera>

<InstancedMesh {geometry} material={currentMaterial}>
  <svelte:fragment slot="instances">
    {#if showA}
      <InstancedMeshInstance color="rgb(240, 54, 18)" position={{ x, y }} />
    {/if}
    {#each new Array(5).fill(0) as item, index}
      <InstancedMeshInstance color="white" position={{ x: index }} />
    {/each}
    {#if showB}
      <InstancedMeshInstance color="rgb(0, 54, 18)" position={{ y: 1, x: 1.5 }} />
    {/if}
  </svelte:fragment>
</InstancedMesh>

<Mesh position={{ x: -2 }} {geometry} material={currentMaterial} />
