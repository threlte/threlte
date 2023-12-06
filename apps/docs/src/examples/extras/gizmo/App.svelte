<script lang="ts">
  import { useTweakpane } from '$lib/useTweakpane'
  import { Canvas, T, currentWritable, type CurrentWritable } from '@threlte/core'
  import { Gizmo, OrbitControls } from '@threlte/extras'
  import type { Writable } from 'svelte/store'
  import { OrbitControls as ThreeOrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
  import Scene from './Scene.svelte'

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

  const verticalPlacement = addInput({
    label: 'Vertical placement (top or bottom)',
    value: 'bottom',
    params: {
      options: {
        top: 'top',
        bottom: 'bottom'
      }
    }
  }) as Writable<'top' | 'bottom'>

  const horizontalPlacement = addInput({
    label: 'Horizontal placement (left or right)',
    params: {
      options: {
        left: 'left',
        right: 'right'
      }
    },
    value: 'left'
  }) as Writable<'left' | 'right'>

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

  const toneMapped = addInput({
    label: 'toneMapped',
    value: false
  })

  const size = addInput({
    label: 'Size',
    value: 128,
    params: {
      min: 0,
      max: 400
    }
  })

  const paddingX = addInput({
    label: 'Padding X',
    value: 20,
    params: {
      min: 0,
      max: 50
    }
  })

  const paddingY = addInput({
    label: 'Padding Y',
    value: 20,
    params: {
      min: 0,
      max: 50
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
      paddingX={$paddingX}
      paddingY={$paddingY}
      toneMapped={$toneMapped}
      center={$center}
      turnRate={$turnRate}
      verticalPlacement={$verticalPlacement}
      horizontalPlacement={$horizontalPlacement}
      xColor={$xColor}
      yColor={$yColor}
      zColor={$zColor}
      size={$size}
    />
  </Canvas>
</div>
