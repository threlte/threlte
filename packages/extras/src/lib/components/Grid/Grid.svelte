<!-- Credits to Fyrestar for the https://github.com/Fyrestar/THREE.InfiniteGridHelper  -->
<script lang="ts">
  import { T, forwardEventHandlers, useThrelte } from '@threlte/core'
  import { Color, DoubleSide, type Mesh } from 'three'
  import type { GridEvents, GridProps, GridSlots } from './Grid.svelte'
  import { revision } from '../../lib/revision'
  import { gridComponentShaders } from './gridShaders'

  type $$Props = Required<GridProps>
  type $$Events = GridEvents
  type $$Slots = GridSlots

  export let cellColor: $$Props['cellColor'] = '#000000'
  export let sectionColor: $$Props['sectionColor'] = '#0000ee'
  export let cellSize: $$Props['cellSize'] = 1
  export let sectionSize: $$Props['sectionSize'] = 10
  export let axes: $$Props['axes'] = 'xzy'
  export let gridSize: $$Props['gridSize'] = [20, 20]
  export let followCamera: $$Props['followCamera'] = false
  export let infiniteGrid: $$Props['infiniteGrid'] = false
  export let fadeDistance: $$Props['fadeDistance'] = 100
  export let fadeStrength: $$Props['fadeStrength'] = 1
  export let cellThickness: $$Props['cellThickness'] = 1
  export let sectionThickness: $$Props['sectionThickness'] = 2

  // forward ref binding
  export let ref: Mesh

  const { fragmentShader, vertexShader } = gridComponentShaders

  const { invalidate } = useThrelte()

  let uniforms = {
    uSize1: {
      value: cellSize
    },
    uSize2: {
      value: sectionSize
    },
    uColor1: {
      value: new Color(cellColor)
    },
    uColor2: {
      value: new Color(sectionColor)
    },
    uFadeDistance: {
      value: fadeDistance
    },
    uFadeStrength: {
      value: fadeStrength
    },
    uThickness1: {
      value: 1
    },
    uThickness2: {
      value: 1
    },
    uInfiniteGrid: {
      value: infiniteGrid ? 1 : 0
    },
    uFollowCamera: {
      value: 0
    },
    uCoord0: {
      value: 0
    },
    uCoord1: {
      value: 2
    },
    uCoord2: {
      value: 1
    },
    uCircleGridMaxRadius: {
      value: 9
    },
    uPolarDividers: {
      value: 10
    }
  }

  const axisLetterToInt = {
    x: 0,
    y: 1,
    z: 2
  }

  $: {
    // convert axis string to int indexes xzy = [0,2,1]
    const c0 = axes.charAt(0) as 'x' | 'y' | 'z'
    const c1 = axes.charAt(1) as 'x' | 'y' | 'z'
    const c2 = axes.charAt(2) as 'x' | 'y' | 'z'
    uniforms.uCoord0.value = axisLetterToInt[c0]
    uniforms.uCoord1.value = axisLetterToInt[c1]
    uniforms.uCoord2.value = axisLetterToInt[c2]

    uniforms.uSize1 = { value: cellSize }
    uniforms.uSize2 = { value: sectionSize }
    uniforms.uColor1 = { value: new Color(cellColor) }
    uniforms.uColor2 = { value: new Color(sectionColor) }
    uniforms.uFadeDistance = { value: fadeDistance }
    uniforms.uFadeStrength = { value: fadeStrength }
    uniforms.uThickness1 = { value: cellThickness }
    uniforms.uThickness2 = { value: sectionThickness }
    uniforms.uFollowCamera = { value: followCamera ? 1 : 0 }
    uniforms.uInfiniteGrid = { value: infiniteGrid ? 1 : 0 }
    invalidate('Grid uniforms changed')
  }

  const component = forwardEventHandlers()
</script>

<T.Mesh
  bind:this={$component}
  bind:ref
  frustumCulled={false}
  {...$$restProps}
  let:ref
>
  <T.ShaderMaterial
    {fragmentShader}
    {vertexShader}
    {uniforms}
    transparent
    side={DoubleSide}
    defines={{
      USE_COLORSPACE_FRAGMENT: revision >= 154 ? '' : undefined
    }}
  />
  <slot {ref}>
    <T.PlaneGeometry args={typeof gridSize == 'number' ? [gridSize, gridSize] : gridSize} />
  </slot>
</T.Mesh>
