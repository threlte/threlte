<script lang='ts'>
  import * as THREE from 'three'
  import { onDestroy } from 'svelte'
  import { T, useFrame } from '@threlte/core'
  import { spring } from 'svelte/motion'
  import { interactivity } from '@threlte/extras'
  import { pointerControls, useXR } from '@threlte/xr'

  const { isPresenting } = useXR()
  const scale = spring(1)
  const eyeScale = spring(1, { stiffness: 0.5 })

  let ref: THREE.Mesh
  let lookIntervalId: number | undefined
  let happy = false
  let lookAt = new THREE.Vector3()
  let point = new THREE.Vector3()

  const handleEvent = (type: string) => (event: any): any => {
    console.log(type, event)
    switch (type) {
      case 'pointermove': {
        point.copy(event.point)
        return
      }
      case 'pointerenter': {
        happy = true
        scale.set(1.1)
        return
      }
      case 'pointerleave': {
        happy = false
        scale.set(1)
        return
      }
      case 'click': {
        scale.set(1.5)
        return
      }
      case 'pointermissed': {
        scale.set(0.5)
        return
      }
    }
  }

  const blink = () => {
    eyeScale.set(0.1).then(() => eyeScale.set(1))
  }

  const lookForCursor = () => {
    point.set(Math.random() - 0.5, 1.5 + Math.random() - 0.5, 1)
  }

  useFrame(() => {
    lookAt.lerp(point, happy ? 0.5 : 0.2)
    ref.lookAt(lookAt.x, lookAt.y, 1)
  })

  interactivity()
  pointerControls()

  $: if (happy) {
    clearInterval(lookIntervalId)
  } else {
    lookIntervalId = window.setInterval(lookForCursor, 1000)
  }

  let blinkIntervalId = setInterval(blink, 3000)

  onDestroy(() => {
    clearInterval(blinkIntervalId)
    clearInterval(lookIntervalId)
  })
</script>

<T.Group position.y={1.5} scale={$isPresenting ? 0.1 : 1}>
  <T.Mesh
    bind:ref
    on:click={handleEvent('click')}
    on:contextmenu={handleEvent('contextmenu')}
    on:dblclick={handleEvent('dblclick')}
    on:wheel={handleEvent('wheel')}
    on:pointerup={handleEvent('pointerup')}
    on:pointerdown={handleEvent('pointerdown')}
    on:pointerover={handleEvent('pointerover')}
    on:pointerout={handleEvent('pointerout')}
    on:pointerenter={handleEvent('pointerenter')}
    on:pointerleave={handleEvent('pointerleave')}
    on:pointermove={handleEvent('pointermove')}
    on:pointermissed={handleEvent('pointermissed')}
    scale={$scale}
  >
    <T.MeshStandardMaterial color='hotpink' />
    <T.BoxGeometry />

    <T.Mesh scale.y={$eyeScale} position={[-0.3, 0.25, 0.5]}>
      <T.MeshStandardMaterial color='#444' />
      <T.BoxGeometry args={[0.1, 0.325, 0.1]} />
    </T.Mesh>

    <T.Mesh scale.y={$eyeScale} position={[0.05, 0.25, 0.5]}>
      <T.MeshStandardMaterial color='#444' />
      <T.BoxGeometry args={[0.1, 0.325, 0.1]} />
    </T.Mesh>

    <T.Mesh
      visible={happy}
      position.y={-0.15}
      position.z={0.5}
      rotation.x={Math.PI / 2}
    >
      <T.MeshStandardMaterial color='#444' />
      <T.CylinderGeometry args={[0.3, 0.3, 0.1, 3]} />
    </T.Mesh>

    <T.Mesh
      visible={!happy}
      position.y={-0.15}
      position.z={0.5}
      rotation.x={Math.PI / 2}
    >
      <T.MeshStandardMaterial color='#444' />
      <T.CylinderGeometry args={[0.15, 0.15, 0.1]} />
    </T.Mesh>
  </T.Mesh>
</T.Group>
