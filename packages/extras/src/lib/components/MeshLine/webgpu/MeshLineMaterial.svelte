<script lang="ts">
  import { T, useThrelte } from '@threlte/core/webgpu'
  import { NodeMaterial } from 'three/webgpu'
  import type { MeshLineMaterialWebGPUProps } from './types.js'
  import { createMeshLineNodes, createMeshLineUniforms } from './meshLineNodes.js'

  let {
    opacity = 1,
    color = '#ffffff',
    dashOffset = 0,
    dashArray = 0,
    dashRatio = 0,
    attenuate = true,
    width = 1,
    scaleDown = 0,
    alphaMap,
    ref = $bindable(),
    children,
    ...props
  }: MeshLineMaterialWebGPUProps = $props()

  const { invalidate } = useThrelte()

  const uniforms = createMeshLineUniforms()

  const material = new NodeMaterial()
  material.transparent = true

  // An alpha map adds a texture sample to the node graph rather than changing a
  // uniform, so the material is rebuilt when one is added or swapped out.
  $effect(() => {
    const { vertexNode, colorNode, opacityNode } = createMeshLineNodes(uniforms, { alphaMap })

    material.vertexNode = vertexNode
    material.colorNode = colorNode
    material.opacityNode = opacityNode
    material.needsUpdate = true

    invalidate()
  })

  $effect(() => {
    uniforms.lineWidth.value = width
    invalidate()
  })

  $effect(() => {
    uniforms.opacity.value = opacity
    invalidate()
  })

  $effect(() => {
    uniforms.sizeAttenuation.value = attenuate ? 1 : 0
    invalidate()
  })

  $effect(() => {
    uniforms.dashArray.value = dashArray
    uniforms.useDash.value = dashArray > 0 ? 1 : 0
    invalidate()
  })

  $effect(() => {
    uniforms.dashOffset.value = dashOffset
    invalidate()
  })

  $effect(() => {
    uniforms.dashRatio.value = dashRatio
    invalidate()
  })

  $effect(() => {
    uniforms.scaleDown.value = scaleDown / 10
    invalidate()
  })

  $effect(() => {
    uniforms.color.value.set(color)
    invalidate()
  })
</script>

<T
  is={material}
  bind:ref
  {...props}
>
  {@render children?.({ ref: material })}
</T>
