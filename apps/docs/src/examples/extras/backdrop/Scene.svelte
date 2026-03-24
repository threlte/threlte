<script lang="ts">
  import {
    MathUtils,
    type ColorRepresentation,
    type DirectionalLight,
    type DirectionalLightHelper,
    type Mesh,
    type MeshStandardMaterial
  } from 'three'
  import {
    BackdropGeometry,
    Bounds,
    Environment,
    Gizmo,
    OrbitControls,
    TransformControls
  } from '@threlte/extras'
  import { useGltf } from '@threlte/extras'
  import { isInstanceOf, T, useThrelte } from '@threlte/core'

  interface Props {
    length: number
    segments: number
    materialColor: ColorRepresentation
    materialWireframe: boolean
  }

  let { materialColor = 'white', materialWireframe = false, length, segments }: Props = $props()

  const gltf = useGltf<{
    nodes: { LOD3spShape: Mesh }
    materials: { 'blinn3-fx': MeshStandardMaterial }
  }>('/models/Duck.glb').then((gltf) => {
    gltf.nodes.LOD3spShape.castShadow = true
    return gltf
  })

  const { scene } = useThrelte()

  let helper = $state.raw<DirectionalLightHelper>()
  let light = $state.raw<DirectionalLight>()

  let debug = false
</script>

<Environment url="/textures/equirectangular/hdr/blouberg_sunrise_2_1k.hdr" />

<T.DirectionalLight
  position.x={2}
  position.y={0.5}
  position.z={10}
  intensity={2}
  castShadow
  shadow.camera.left={-10}
  shadow.camera.right={10}
  shadow.camera.top={-10}
  shadow.camera.bottom={10}
  shadow.bias={-0.001}
  bind:ref={light}
>
  {#snippet children({ ref })}
    {#if debug}
      <T.DirectionalLightHelper
        bind:ref={helper}
        args={[ref]}
        attach={scene}
      />
      <T.CameraHelper args={[ref.shadow.camera]} />
    {/if}
  {/snippet}
</T.DirectionalLight>

<TransformControls mode="scale">
  <T.Mesh
    receiveShadow
    scale={20}
    position.z={-5}
  >
    <BackdropGeometry
      {length}
      {segments}
    />
    <T.MeshStandardMaterial
      color={materialColor}
      wireframe={materialWireframe}
      receiveShadow
      roughness={0.4}
      metalness={0.1}
    />
  </T.Mesh>
</TransformControls>

{#await gltf then { scene }}
  <Bounds margin={0.5}>
    {#each { length: 3 }, index}
      <T.Group
        scale={2}
        position.z={Math.cos(index * MathUtils.degToRad(120)) * 4}
        position.x={Math.sin(index * MathUtils.degToRad(120)) * 4}
        position.y={-0}
        rotation.y={Math.PI}
        oncreate={(ref) => {
          ref.lookAt(0, -0.2, 0)
        }}
      >
        <T
          is={scene.clone()}
          rotation.y={-Math.PI / 2}
          oncreate={(ref) => {
            ref.traverse((child) => {
              child.castShadow = true
              child.receiveShadow = true
              console.log(child)

              if (isInstanceOf(child, 'Mesh')) {
                const material = child.material
                if (isInstanceOf(material, 'MeshStandardMaterial')) {
                  material.roughness = 0.1
                }
              }
            })
          }}
        />
      </T.Group>
    {/each}
  </Bounds>
{/await}

<T.PerspectiveCamera
  makeDefault
  position.x={-30}
  position.y={5}
  position.z={10}
>
  <OrbitControls
    enableDamping
    maxPolarAngle={0.5 * Math.PI}
    minAzimuthAngle={-1 * 0.25 * Math.PI}
    maxAzimuthAngle={0.25 * Math.PI}
  >
    <Gizmo />
  </OrbitControls>
</T.PerspectiveCamera>
