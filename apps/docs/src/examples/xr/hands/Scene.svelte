<script lang="ts">
  import { type Object3D, BoxGeometry, MeshStandardMaterial, Mesh } from 'three'
  import { T } from '@threlte/core'
  import { XR, Hand, Controller, type XRHandEvent, type XRControllerEvent } from '@threlte/xr'

  let boxes: Object3D[] = []

  const handleEvent = (event: XRHandEvent) => {
    console.log('Hand', event)
    if (event.type === 'pinchend') {
      createBox(event)
    }
  }

  const handleControllerEvent = (event: XRControllerEvent) => {
    console.log('Controller', event)
  }

  const createBox = (event: XRHandEvent) => {
    const controller = event.target
    const size = 0.05
    const geometry = new BoxGeometry(size, size, size)
    const material = new MeshStandardMaterial({ color: Math.random() * 0xffffff })
    const spawn = new Mesh(geometry, material)

    const indexTip = controller?.joints['index-finger-tip']

    if (!indexTip) return

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
