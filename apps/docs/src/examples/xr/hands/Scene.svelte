<script lang="ts">
  import { Mesh } from 'three'
  import { T } from '@threlte/core'
  import { XR, Hand, Controller, type XRHandEvent, type XRControllerEvent } from '@threlte/xr'

  const boxes = $state<Mesh[]>([])

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
    const indexTip = controller?.joints['index-finger-tip']

    if (!indexTip) return

    const box = new Mesh()
    box.position.copy(indexTip.position)
    box.quaternion.copy(indexTip.quaternion)
    boxes.push(box)
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

  {#snippet fallback()}
    <T.PerspectiveCamera
      makeDefault
      position={[0, 1.8, 1]}
      oncreate={(ref) => ref.lookAt(0, 1.8, 0)}
    />
  {/snippet}
</XR>

<T.Mesh rotation={[-Math.PI / 2, 0, 0]}>
  <T.CircleGeometry args={[1]} />
  <T.MeshBasicMaterial />
</T.Mesh>

<T.AmbientLight />
<T.DirectionalLight />

{#each boxes as box (box.uuid)}
  <T is={box}>
    <T.BoxGeometry args={[0.05, 0.05, 0.05]} />
    <T.MeshStandardMaterial color={Math.random() * 0xffffff} />
  </T>
{/each}
