<script lang='ts'>
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { Text } from '@threlte/extras'
  import { XR, Controller, Hand, EstimatedLight, useHitTest } from '@threlte/xr'
  
  const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0);
  
  let meshes: THREE.Mesh[] = []
  let reticle: THREE.Mesh
  
  const handleSelect = () => {
    if (!reticle.visible) return

    const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random() })
    const mesh = new THREE.Mesh(geometry, material)
    reticle.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale)
    mesh.scale.y = Math.random() * 2 + 1
    meshes.push(mesh)
    meshes = meshes
  }
  
  useHitTest((hitMatrix, hit) => {
    if (hit) {
      reticle.visible = true
      reticle.matrix.copy(hitMatrix)
    } else {
      reticle.visible = false
    }
  })

  let estimating = false
</script>

<XR>
  <Controller left on:select={handleSelect} />
  <Controller right on:select={handleSelect} />
  <Hand left on:pinchend={handleSelect} />
  <Hand right on:pinchend={handleSelect} />
</XR>

<EstimatedLight
  on:estimationstart={() => (estimating = true)}
  on:estimationend={() => (estimating = false)}
>
  <T.HemisphereLight
    args={[0xffffff, 0xbbbbff, 1]}
    position={[0.5, 1, 0.25]}
  />

  <T.AmbientLight intensity={0.5} />
</EstimatedLight>

{#if estimating}
<Text position={[0, 1.7, -1]} text='Estimating' />
{:else}
<Text position={[0, 1.7, -1]} text='Not estimating' />
{/if}

<T.Mesh
  bind:ref={reticle}
  matrixAutoUpdate={false}
  visible={false}
>
  <T.RingGeometry
    args={[0.15, 0.2, 32]}
    on:create={({ ref }) => ref.rotateX(-Math.PI / 2)}
  />
  <T.MeshBasicMaterial />
</T.Mesh>

{#each meshes as mesh, index (index)}
  <T is={mesh} />
{/each}
