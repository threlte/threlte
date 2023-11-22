<script lang="ts">
  import { Canvas, T, type CurrentWritable, currentWritable } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'
  import { useTweakpane } from '$lib/useTweakpane'
  import Scene from './Scene.svelte'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls'

  const { action, addInput } = useTweakpane({
    title: 'Gizmo',
    expanded: false
  })

  const turnRate = addInput({
    label: 'Turn rate',
    value: 2 * Math.PI,
    params: {
      min: 0
    }
  })

  const vert = addInput({
    label: 'Vertical placement (top or bottom)',
    value: 'bottom'
  })
  let verticalPlacement: 'top' | 'bottom'
  $: verticalPlacement = $vert === 'top' ? 'top' : 'bottom'

  const horiz = addInput({
    label: 'Horizontal placement (left or right)',
    value: 'right'
  })
  let horizontalPlacement: 'left' | 'right'
  $: horizontalPlacement = $horiz === 'left' ? 'left' : 'right'

  const xColor = addInput({
    label: 'X color',
    value: 0xff3653,
    params: {
      color: {
        type: 'float'
      }
    }
  })

  const yColor = addInput({
    label: 'Y color',
    value: 0x8adb00,
    params: {
      color: {
        type: 'float'
      }
    }
  })

  const zColor = addInput({
    label: 'Z color',
    value: 0x2c8fff,
    params: {
      color: {
        type: 'float'
      }
    }
  })

  const size = addInput({
    label: 'Size',
    value: 128,
    params: {
      min: 0,
      max: 500
    }
  })

  let orbitControls: ThreeOrbitControls
  let center: CurrentWritable<[number, number, number]> = currentWritable([0, 0, 0])
</script>

<div use:action />

<div class="relative h-full w-full bg-blue-900">
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[20, 20, 20]}
      fov={36}
      target={[0, 0, 0]}
    >
      <OrbitControls
        bind:ref={orbitControls}
        on:change={() => {
          center.set([orbitControls.target.x, orbitControls.target.y, orbitControls.target.z])
        }}
      />
    </T.PerspectiveCamera>

    <Scene center={$center} />

    <Gizmo
      center={$center}
      turnRate={$turnRate}
      {verticalPlacement}
      {horizontalPlacement}
      xColor={$xColor}
      yColor={$yColor}
      zColor={$zColor}
      size={$size}
    />
  </Canvas>
</div>
