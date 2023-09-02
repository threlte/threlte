<script lang='ts'>
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { XR, Hand } from '@threlte/xr'

  let boxes: THREE.Object3D[] = []

  const handlePinchStart = (event: any) => {
    const controller = event.target
    const size = 0.05
    const geometry = new THREE.BoxGeometry(size, size, size)
    const material = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff })
    const spawn = new THREE.Mesh(geometry, material)

    const indexTip = controller.joints['index-finger-tip']
    spawn.position.copy(indexTip.position)
    spawn.quaternion.copy(indexTip.quaternion)
    boxes.push(spawn)
    boxes = boxes
  }
</script>

<XR>
  <Hand left on:pinchstart={handlePinchStart} />
  <Hand right on:pinchstart={handlePinchStart} />
</XR>

<T.Mesh rotation={[-Math.PI / 2, 0, 0]}>
  <T.CircleGeometry args={[1]} />
  <T.MeshBasicMaterial />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />

{#each boxes as box (box.uuid)}
  <T is={box} />
{/each}
