<script lang="ts">
  import type { GridProps } from './Grid.svelte'
  import { useThrelte, T } from '@threlte/core'
  import { Color, ShaderMaterial, DoubleSide, Mesh } from 'three'

  export let cellColor: GridProps['cellColor'] = '#000000'
  export let sectionColor: GridProps['sectionColor'] = '#0000ee'
  export let cellSize: GridProps['cellSize'] = 1
  export let sectionSize: GridProps['sectionSize'] = 10

  export let axes: GridProps['axes'] = 'xzy'
  export let gridSize: GridProps['gridSize'] = [20, 20]

  export let followCamera: GridProps['followCamera'] = false
  export let infiniteGrid: GridProps['infiniteGrid'] = false
  export let fadeDistance: GridProps['fadeDistance'] = 100
  export let fadeStrength: GridProps['fadeStrength'] = 1

  export let cellThickness: GridProps['cellThickness'] = 1
  export let sectionThickness: GridProps['sectionThickness'] = 2

  export let ref: Mesh

  import { default as vertexShader } from './vertexShader.glsl?raw'
  import { default as fragmentShader } from './fragmentShader.glsl?raw'

  const { invalidate } = useThrelte()

  const makeGridMaterial = () => {
    return new ShaderMaterial({
      side: DoubleSide,

      uniforms: {
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
        uAxis0: {
          value: 0
        },
        uAxis1: {
          value: 2
        },
        uAxis2: {
          value: 1
        }
      },
      transparent: true,
      vertexShader,
      fragmentShader,
      extensions: {
        derivatives: true
      }
    })
  }

  const material = makeGridMaterial()

  $: {
    material.uniforms.uSize1 = { value: cellSize }
    material.uniforms.uSize2 = { value: sectionSize }
    material.uniforms.uColor1 = { value: new Color(cellColor) }
    material.uniforms.uColor2 = { value: new Color(sectionColor) }
    material.uniforms.uFadeDistance = { value: fadeDistance }
    material.uniforms.uFadeStrength = { value: fadeStrength }
    material.uniforms.uThickness1 = { value: cellThickness }
    material.uniforms.uThickness2 = { value: sectionThickness }
    material.uniforms.uFollowCamera = { value: followCamera ? 1 : 0 }
    material.uniforms.uInfiniteGrid = { value: infiniteGrid ? 1 : 0 }
    const axesMap: { [key: string]: number } = { x: 0, y: 1, z: 2 }
    const gridAxes = [...(axes || 'xzy')]
    material.uniforms.uAxis0.value = axesMap[gridAxes[0]]
    material.uniforms.uAxis1.value = axesMap[gridAxes[1]]
    material.uniforms.uAxis2.value = axesMap[gridAxes[2]]

    invalidate('Grid uniforms changed')
  }
</script>

<T.Mesh
  bind:ref
  {material}
  frustumCulled={false}
  {...$$restProps}
  let:ref
>
  <T.PlaneGeometry args={typeof gridSize == 'number' ? [gridSize, gridSize] : gridSize} />

  <slot {ref} />
</T.Mesh>
