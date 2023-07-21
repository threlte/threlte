<script lang='ts'>

import * as THREE from 'three'
import { T, useThrelte } from '@threlte/core'
import { XR, Controllers, Hands } from '$lib'

const { camera } = useThrelte()

camera.current.position.z = 1.75
camera.current.lookAt(0, 1.75, 1)

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

const handlePinchEnd = () => {

}

</script>

<XR foveation={1}>
  <Controllers />

  <Hands
    on:pinchstart={handlePinchStart}
    on:pinchend={handlePinchEnd}
  />
</XR>

<T.Mesh rotation={[-Math.PI / 2, 0, 0]}>
  <T.CircleGeometry args={[1]} />
  <T.MeshBasicMaterial />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />

{#each boxes as box, index (index)}
  <T is={box} />
{/each}
