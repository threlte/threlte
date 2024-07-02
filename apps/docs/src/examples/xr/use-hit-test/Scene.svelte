<script lang="ts">
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { XR, Controller, Hand, useHitTest } from '@threlte/xr'

  const geometry = new THREE.CylinderGeometry(0.1, 0.1, 0.2, 32).translate(0, 0.1, 0)

  let meshes: THREE.Mesh[] = []
  let cursors = { left: undefined! as THREE.Mesh, right: undefined! as THREE.Mesh }

  const hands = ['left', 'right'] as const
  type Hands = (typeof hands)[number]

  const handleSelect = (hand: Hands) => () => {
    if (!cursors[hand].visible) return

    const material = new THREE.MeshPhongMaterial({ color: 0xffffff * Math.random() })
    const mesh = new THREE.Mesh(geometry, material)
    cursors[hand].matrix.decompose(mesh.position, mesh.quaternion, mesh.scale)
    mesh.scale.y = Math.random() * 2 + 1
    meshes.push(mesh)
    meshes = meshes
  }

  const handleHitTest =
    (hand: Hands) => (hitMatrix: THREE.Matrix4, hit: XRHitTestResult | undefined) => {
      if (!cursors[hand]) return

      if (hit) {
        cursors[hand].visible = true
        cursors[hand].matrix.copy(hitMatrix)
      } else {
        cursors[hand].visible = false
      }
    }

  useHitTest(handleHitTest('left'), { source: 'leftInput' })
  useHitTest(handleHitTest('right'), { source: 'rightInput' })
</script>

<XR>
  {#each hands as hand}
    <Controller
      {hand}
      onselect={handleSelect(hand)}
    />
    <Hand
      {hand}
      onpinchend={handleSelect(hand)}
    />
  {/each}
</XR>

<T.Mesh
  bind:ref={cursors.left}
  matrixAutoUpdate={false}
>
  <T.RingGeometry
    args={[0.15, 0.2, 32]}
    oncreate={({ ref }) => ref.rotateX(-Math.PI / 2)}
  />
  <T.MeshBasicMaterial />
</T.Mesh>

<T.Mesh
  bind:ref={cursors.right}
  matrixAutoUpdate={false}
>
  <T.RingGeometry
    args={[0.15, 0.2, 32]}
    oncreate={({ ref }) => ref.rotateX(-Math.PI / 2)}
  />
  <T.MeshBasicMaterial />
</T.Mesh>

<T.HemisphereLight
  args={[0xffffff, 0xbbbbff, 1]}
  position={[0.5, 1, 0.25]}
/>

<T.AmbientLight intensity={0.5} />

{#each meshes as mesh, index (index)}
  <T is={mesh} />
{/each}
