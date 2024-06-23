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
    type BufferGeometry,
    BackSide
  } from 'three'
  import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js'
  import { vertexShader, fragmentShader } from './shaders'
  import type { OutlinesProps } from './Outlines.svelte'

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

  let oldAngle = 0
  let oldGeometry: BufferGeometry

  let mesh: Mesh | SkinnedMesh | InstancedMesh

  const parent = useParent()

  $effect.pre(() => {
    const parentMesh = $parent as undefined | Mesh | InstancedMesh | SkinnedMesh

    if (parentMesh?.geometry !== undefined) {
      if (oldAngle !== angle || oldGeometry !== parentMesh.geometry) {
        oldAngle = angle
        oldGeometry = parentMesh.geometry

        if (mesh) {
          if (angle) mesh.geometry.dispose()
          group.remove(mesh)
        }

        const geometry = angle ? toCreasedNormals(parentMesh.geometry, angle) : parentMesh.geometry

        if ('skeleton' in parentMesh) {
          const nextMesh = new SkinnedMesh(geometry, material)
          nextMesh.bind(parentMesh.skeleton, parentMesh.bindMatrix)
          mesh = nextMesh
        } else if ('isInstancedMesh' in parentMesh) {
          const nextMesh = new InstancedMesh(geometry, material, parentMesh.count)
          nextMesh.instanceMatrix = parentMesh.instanceMatrix
          mesh = nextMesh
        } else {
          mesh = new Mesh(geometry, material)
        }

        mesh.renderOrder = renderOrder
      }
    }
  })

  $effect.pre(() => {
    mesh.renderOrder = renderOrder
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
  <T is={mesh} />
  {@render children?.({ ref: group })}
</T>
