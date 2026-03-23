<script lang="ts">
  import { isInstanceOf, T, useParent, useThrelte } from '@threlte/core'
  import {
    BackSide,
    Color,
    Group,
    InstancedMesh,
    Mesh,
    ShaderMaterial,
    SkinnedMesh,
    Vector2
  } from 'three'
  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
  import { fragmentShader, vertexShader } from './shaders.js'
  import type { OutlinesProps } from './types.js'
  import { fromStore } from 'svelte/store'

  let {
    color = 'black',
    screenspace = false,
    opacity = 1,
    transparent = false,
    thickness = 0.05,
    toneMapped = true,
    angle = Math.PI,
    polygonOffset = false,
    polygonOffsetFactor = 0,
    renderOrder = 0,
    children,
    ref = $bindable(),
    ...props
  }: OutlinesProps = $props()

  const { renderer } = useThrelte()

  const uniforms = {
    screenspace: { value: screenspace },
    color: { value: new Color(color) },
    opacity: { value: opacity },
    thickness: { value: thickness },
    size: { value: new Vector2() }
  }

  const group = new Group()
  ref = group

  const material = new ShaderMaterial({
    side: BackSide,
    uniforms,
    vertexShader,
    fragmentShader
  })

  const parent = useParent()

  let parentMesh = fromStore(parent)

  let geometry = $derived.by(() => {
    if (!isInstanceOf(parentMesh.current, 'Mesh')) return undefined
    return toCreasedNormals(parentMesh.current.geometry, angle)
  })

  let mesh: undefined | Mesh | SkinnedMesh | InstancedMesh = $derived.by(() => {
    if (!isInstanceOf(parentMesh.current, 'Mesh')) return
    if (isInstanceOf(parentMesh.current, 'SkinnedMesh')) {
      const nextMesh = new SkinnedMesh()
      nextMesh.bind(parentMesh.current.skeleton, parentMesh.current.bindMatrix)
      return nextMesh
    } else if (isInstanceOf(parentMesh.current, 'InstancedMesh')) {
      const nextMesh = new InstancedMesh(undefined, undefined, parentMesh.current.count)
      nextMesh.instanceMatrix = parentMesh.current.instanceMatrix
      return nextMesh
    }
    return new Mesh()
  })

  $effect.pre(() => {
    if (mesh) mesh.renderOrder = renderOrder
  })
  $effect.pre(() => {
    material.transparent = transparent
  })
  $effect.pre(() => {
    material.toneMapped = toneMapped
  })
  $effect.pre(() => {
    material.polygonOffset = polygonOffset
  })
  $effect.pre(() => {
    material.polygonOffsetFactor = polygonOffsetFactor
  })
  $effect.pre(() => {
    material.uniforms.screenspace.value = screenspace
  })
  $effect.pre(() => {
    material.uniforms.color.value.set(color)
  })
  $effect.pre(() => {
    material.uniforms.opacity.value = opacity
  })
  $effect.pre(() => {
    material.uniforms.thickness.value = thickness
  })
  $effect.pre(() => {
    renderer.getDrawingBufferSize(material.uniforms.size.value)
  })
</script>

<T
  is={group}
  {...props}
>
  <T is={mesh}>
    <T is={geometry} />
    <T is={material} />
  </T>
  {@render children?.({ ref: group })}
</T>
