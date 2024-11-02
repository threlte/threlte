<script lang="ts">
  import { T, useParent, useThrelte } from '@threlte/core'
  import {
    Color,
    Vector2,
    ShaderMaterial,
    Group,
    SkinnedMesh,
    InstancedMesh,
    Mesh,
    BackSide
  } from 'three'
  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
  import { vertexShader, fragmentShader } from './shaders'
  import type { OutlinesProps } from './types'

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

  const material = new ShaderMaterial({
    side: BackSide,
    uniforms,
    vertexShader,
    fragmentShader
  })

  const parent = useParent()

  let parentMesh = $derived($parent)
  let geometry = $derived(parentMesh ? toCreasedNormals(parentMesh.geometry, angle) : undefined)
  let mesh: undefined | Mesh | SkinnedMesh | InstancedMesh = $derived.by(() => {
    if (parentMesh === undefined) {
      return
    }

    if ('skeleton' in parentMesh) {
      const nextMesh = new SkinnedMesh()
      nextMesh.bind(parentMesh.skeleton, parentMesh.bindMatrix)
      return nextMesh
    } else if ('isInstancedMesh' in parentMesh) {
      const nextMesh = new InstancedMesh(undefined, undefined, parentMesh.count)
      nextMesh.instanceMatrix = parentMesh.instanceMatrix
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
  bind:ref
  {...props}
>
  <T is={mesh}>
    <T is={geometry} />
    <T is={material} />
  </T>
  {@render children?.({ ref: group })}
</T>
