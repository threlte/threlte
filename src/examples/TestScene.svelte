<script lang="ts">
  import InstancedMeshInstance from '$lib/internal/InstancedMeshInstance.svelte'
  import InstancedMesh from '$lib/objects/InstancedMesh.svelte'
  import Mesh from '$lib/objects/Mesh.svelte'
  import { BoxBufferGeometry, MeshBasicMaterial, SphereBufferGeometry } from 'three'
  import { PerspectiveCamera, useFrame } from 'threlte'

  const geometry = new BoxBufferGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({
    color: 'black',
    wireframe: true
  })

  let posY = 1
  useFrame(() => {
    posY = Math.sin(Date.now() / 1000)
  })

  let showA = false
  let showB = false

  window.addEventListener('keypress', (e) => {
    const key = e.key
    if (key === 'a') showA = !showA
    if (key === 'b') showB = !showB
  })
</script>

<PerspectiveCamera position={{ z: 5 }} />

<InstancedMesh {geometry} {material}>
  <svelte:fragment slot="instances">
    {#if showA}
      <InstancedMeshInstance position={{ y: -1 }} />
    {/if}
    {#each new Array(3).fill(0) as item, index}
      <InstancedMeshInstance position={{ x: index }} />
    {/each}
    {#if showB}
      <InstancedMeshInstance position={{ y: 1 }} />
    {/if}
  </svelte:fragment>
</InstancedMesh>
