<script lang='ts'>

import * as THREE from 'three'
import { T } from '@threlte/core'
import { XR, Controllers, Hands, useHitTest } from '$lib'

const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0);
const meshes: THREE.Mesh[] = []

let reticle: THREE.Mesh

const handleSelect = () => {
  if (!reticle.visible) return

  const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random() })
  const mesh = new THREE.Mesh(geometry, material)
  reticle.matrix.decompose(mesh.position, mesh.quaternion, mesh.scale)
  mesh.scale.y = Math.random() * 2 + 1
  meshes.push(mesh)
}

useHitTest((hitMatrix, hit) => {
  if (hit) {
    reticle.visible = true
		reticle.matrix.copy(hitMatrix)
  } else {
    reticle.visible = false
  }
})

</script>

<XR foveation={1}>
  <Controllers on:select={handleSelect} />
  <Hands on:pinchend={handleSelect} />
</XR>

<T.HemisphereLight
  args={[0xffffff, 0xbbbbff, 1]}
  position={[0.5, 1, 0.25]}
/>

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
