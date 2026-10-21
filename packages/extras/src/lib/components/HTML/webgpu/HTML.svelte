<script
  lang="ts"
  module
>
  import {
    cameraProjectionMatrix,
    modelViewMatrix,
    modelWorldMatrix,
    positionGeometry,
    vec2,
    vec4
  } from 'three/tsl'

  const fragmentNode = vec4(0)

  const createSpriteVertexNode = (isPerspectiveCamera: boolean) => {
    const modelViewPosition = modelViewMatrix.mul(vec4(0, 0, 0, 1))
    const modelScale = vec2(
      modelWorldMatrix.mul(vec4(1, 0, 0, 0)).xyz.length(),
      modelWorldMatrix.mul(vec4(0, 1, 0, 0)).xyz.length()
    )
    const scale = isPerspectiveCamera ? modelScale.mul(modelViewPosition.z.negate()) : modelScale
    const alignedPosition = positionGeometry.xy.sub(vec2(-0.5, 0.5)).mul(scale).mul(0.03)

    return cameraProjectionMatrix.mul(
      vec4(modelViewPosition.xy.add(alignedPosition), modelViewPosition.zw)
    )
  }
</script>

<script lang="ts">
  import { isInstanceOf, useThrelte } from '@threlte/core/webgpu'
  import { DoubleSide, NodeMaterial } from 'three/webgpu'
  import OriginalHTML from '../HTML.svelte'
  import type { HTMLProps } from '../types.js'

  let {
    material,
    transform = false,
    ref = $bindable(),
    visible = $bindable(),
    ...props
  }: HTMLProps = $props()

  const { camera } = useThrelte()

  const occlusionMaterial = new NodeMaterial()
  occlusionMaterial.side = DoubleSide
  occlusionMaterial.fragmentNode = fragmentNode

  let originalHTML!: ReturnType<typeof OriginalHTML>

  export const render = () => originalHTML.render()

  $effect(() => {
    occlusionMaterial.vertexNode = transform
      ? null
      : createSpriteVertexNode(isInstanceOf($camera, 'PerspectiveCamera'))
    occlusionMaterial.needsUpdate = true
  })
</script>

<OriginalHTML
  bind:this={originalHTML}
  {...props}
  {transform}
  material={material ?? occlusionMaterial}
  bind:ref
  bind:visible
/>
