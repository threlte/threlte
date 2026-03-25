<script lang="ts">
  import { Mesh, PerspectiveCamera } from 'three'
  import { T, useThrelte } from '@threlte/core'
  import { XR, Controller, type XRControllerEvent } from '@threlte/xr'
  import { setupHands } from './setupHands'

  const { renderer } = useThrelte();
  const boxes = $state<Mesh[]>([])

  const handleControllerEvent = (event: XRControllerEvent) => {
    console.log('Controller', event)
  }

  const hands = ['left', 'right'] as const

  const { leftHand, rightHand, handFactory} = setupHands(renderer);

</script>

<XR {handFactory}>

<T is={leftHand}/>
<T is={rightHand}/>

  {#each hands as hand (hand)}   

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
      oncreate={(ref: PerspectiveCamera) => ref.lookAt(0, 1.8, 0)}
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
