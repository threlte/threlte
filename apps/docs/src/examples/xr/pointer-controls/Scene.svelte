<script lang="ts">
  import { BufferGeometry, Vector3, type Mesh } from 'three'
  import { T, useTask } from '@threlte/core'
  import { Text, interactivity } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { pointerControls, useXR, Controller, Hand } from '@threlte/xr'

  const { isPresenting } = useXR()

  const scale = new Spring(1)
  const eyeScale = new Spring(1, { stiffness: 0.5 })
  const points = [new Vector3(0, 0, 0), new Vector3(0, 0, -1000)]

  let text = $state('')
  let debug = $state(false)
  let happy = $state(false)
  let ref = $state.raw<Mesh>()

  let lookAt = new Vector3()
  let point = new Vector3()

  const handleEvent =
    (type: string) =>
    (event: any): any => {
      text = type
      switch (type) {
        case 'click': {
          scale.set(1.5)
          return
        }
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

  useTask(() => {
    lookAt.lerp(point, happy ? 0.5 : 0.2)
    ref?.lookAt(lookAt.x, lookAt.y, 1)
  })

  interactivity()
  pointerControls('left')
  pointerControls('right')

  let lookIntervalId = 0
  let blinkIntervalId = setInterval(blink, 3000)

  $effect(() => {
    if (happy) {
      clearInterval(lookIntervalId)
    } else {
      lookIntervalId = window.setInterval(lookForCursor, 1000)
    }

    return () => {
      clearInterval(blinkIntervalId)
      clearInterval(lookIntervalId)
    }
  })
</script>

<svelte:window onkeyup={(e) => e.key === 'd' && (debug = !debug)} />

<Controller left>
  {#snippet targetRay()}
    <Text
      fontSize={0.05}
      {text}
      position.x={0.1}
    />
    <T.Line visible={debug}>
      <T is={new BufferGeometry().setFromPoints(points)} />
    </T.Line>
  {/snippet}
</Controller>

<Controller right>
  {#snippet targetRay()}
    <T.Line visible={debug}>
      <T is={new BufferGeometry().setFromPoints(points)} />
    </T.Line>
  {/snippet}
</Controller>

<Hand left />
<Hand right />

<T.Group
  position.y={1.5}
  position.z={-0.5}
  scale={$isPresenting ? 0.1 : 1}
>
  <T.Mesh
    bind:ref
    onclick={handleEvent('click')}
    onpointerdown={handleEvent('pointerdown')}
    onpointerup={handleEvent('pointerup')}
    onpointerover={handleEvent('pointerover')}
    onpointerout={handleEvent('pointerout')}
    onpointerenter={handleEvent('pointerenter')}
    onpointerleave={handleEvent('pointerleave')}
    onpointermove={handleEvent('pointermove')}
    onpointermissed={handleEvent('pointermissed')}
    scale={scale.current}
  >
    <T.MeshStandardMaterial color="hotpink" />
    <T.BoxGeometry />

    <T.Mesh
      scale.y={eyeScale.current}
      position={[-0.3, 0.25, 0.5]}
      raycast={() => false}
    >
      <T.MeshStandardMaterial color="#444" />
      <T.BoxGeometry args={[0.1, 0.325, 0.1]} />
    </T.Mesh>

    <T.Mesh
      scale.y={eyeScale.current}
      position={[0.05, 0.25, 0.5]}
      raycast={() => false}
    >
      <T.MeshStandardMaterial color="#444" />
      <T.BoxGeometry args={[0.1, 0.325, 0.1]} />
    </T.Mesh>

    <T.Mesh
      visible={happy}
      position.y={-0.15}
      position.z={0.5}
      rotation.x={Math.PI / 2}
      raycast={() => false}
    >
      <T.MeshStandardMaterial color="#444" />
      <T.CylinderGeometry args={[0.3, 0.3, 0.1, 3]} />
    </T.Mesh>

    <T.Mesh
      visible={!happy}
      position.y={-0.15}
      position.z={0.5}
      rotation.x={Math.PI / 2}
      raycast={() => false}
    >
      <T.MeshStandardMaterial color="#444" />
      <T.CylinderGeometry args={[0.15, 0.15, 0.1]} />
    </T.Mesh>
  </T.Mesh>
</T.Group>
