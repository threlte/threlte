<script lang="ts">
  import { T, useParent, useThrelte, forwardEventHandlers } from '@threlte/core'
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
  import type { OutlinesEvents, OutlinesProps, OutlinesSlots } from './Outlines'

  type $$Props = OutlinesProps
  type $$Events = OutlinesEvents
  type $$Slots = OutlinesSlots

  type Props = Required<OutlinesProps>

  /** Outline color, default: black */
  export let color: Props['color'] = 'black'

  /** Line thickness is independent of zoom, default: false */
  export let screenspace: Props['screenspace'] = false

  /** Outline opacity, default: 1 */
  export let opacity: Props['opacity'] = 1

  /** Outline transparency, default: false */
  export let transparent: Props['transparent'] = false

  /** Outline thickness, default 0.05 */
  export let thickness: Props['thickness'] = 0.05

  export let toneMapped: Props['toneMapped'] = true

  /** Geometry crease angle (0 === no crease), default: Math.PI */
  export let angle: Props['angle'] = Math.PI

  export let polygonOffset: Props['polygonOffset'] = false
  export let polygonOffsetFactor: Props['polygonOffsetFactor'] = 0
  export let renderOrder: Props['renderOrder'] = 0

  const { renderer } = useThrelte()

  const uniforms = {
    screenspace: { value: screenspace },
    color: { value: new Color(color) },
    opacity: { value: opacity },
    thickness: { value: thickness },
    size: { value: new Vector2() }
  }

  export let ref = new Group()

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

  $: {
    const parentMesh = $parent as undefined | THREE.Mesh | THREE.InstancedMesh | THREE.SkinnedMesh

    if (parentMesh?.geometry !== undefined) {
      if (oldAngle !== angle || oldGeometry !== parentMesh.geometry) {
        oldAngle = angle
        oldGeometry = parentMesh.geometry

        if (mesh) {
          if (angle) mesh.geometry.dispose()
          ref.remove(mesh)
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
  }

  $: if (mesh) {
    mesh.renderOrder = renderOrder
  }

  $: material.transparent = transparent
  $: material.toneMapped = toneMapped
  $: material.polygonOffset = polygonOffset
  $: material.polygonOffsetFactor = polygonOffsetFactor

  $: material.uniforms.screenspace.value = screenspace
  $: material.uniforms.color.value.set(color)
  $: material.uniforms.opacity.value = opacity
  $: material.uniforms.thickness.value = thickness
  $: renderer.getDrawingBufferSize(material.uniforms.size.value)

  const component = forwardEventHandlers()
</script>

<T
  is={ref}
  {...$$restProps}
  bind:this={$component}
>
  <T is={mesh} />
  <slot {ref} />
</T>
