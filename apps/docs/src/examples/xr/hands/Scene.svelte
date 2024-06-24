<script lang="ts">
  import * as THREE from 'three'
  import { T } from '@threlte/core'
  import { XR, Hand, Controller, type XRHandEvent, type XRControllerEvent } from '@threlte/xr'

  let boxes: THREE.Object3D[] = []

  const handleEvent = (event: XRHandEvent) => {
    console.log('Hand', event)
  }

  const handleControllerEvent = (event: XRControllerEvent) => {
    console.log('Controller', event)
  }

  const handlePinchStart = (event: XRHandEvent) => {
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

  const hands = ['left', 'right'] as const
</script>

<XR>
  {#each hands as hand (hand)}
    <Hand
      {hand}
      onconnected={handleEvent}
      ondisconnected={handleEvent}
      onpinchstart={handleEvent}
      onpinchend={handleEvent}
    />

    <Controller
      {hand}
      onconnected={handleControllerEvent}
      ondisconnected={handleControllerEvent}
      onselect={handleControllerEvent}
      onsqueeze={handleControllerEvent}
      onselectstart={handleControllerEvent}
      onselectend={handleControllerEvent}
      onsqueezestart={handleControllerEvent}
      onsqueezeend={handleControllerEvent}
    />
  {/each}
</XR>

<T.Mesh rotation={[-Math.PI / 2, 0, 0]}>
  <T.CircleGeometry args={[1]} />
  <T.MeshBasicMaterial />
</T.Mesh>

<T.PerspectiveCamera
  makeDefault
  position={[0, 1.8, 1]}
  oncreate={({ ref }) => ref.lookAt(0, 1.8, 0)}
/>

<T.AmbientLight />
<T.DirectionalLight />

{#each boxes as box (box.uuid)}
  <T is={box} />
{/each}
