<script lang="ts">
  import type { BackdropProps } from '@threlte/extras'
  import type { TransformControls as ThreeTransformControls } from 'three/examples/jsm/Addons.js'
  import type {
    ColorRepresentation,
    DirectionalLight,
    DirectionalLightHelper,
    Mesh,
    MeshStandardMaterial
  } from 'three'
  import { Backdrop, OrbitControls } from '@threlte/extras'
  import { Resize, TransformControls, useGltf } from '@threlte/extras'
  import { T, useThrelte } from '@threlte/core'

  let {
    lightHelperVisible = true,
    materialColor = 'white',
    materialWireframe = false,
    ...backdropProps
  }: BackdropProps & {
    lightHelperVisible: boolean
    materialColor: ColorRepresentation
    materialWireframe: boolean
  } = $props()

  const gltf = useGltf<{
    nodes: { LOD3spShape: Mesh }
    materials: { 'blinn3-fx': MeshStandardMaterial }
  }>('/models/Duck.glb').then((gltf) => {
    gltf.nodes.LOD3spShape.castShadow = true
    return gltf
  })

  const { scene } = useThrelte()

  let helper = $state.raw<DirectionalLightHelper>()
  let controls = $state.raw<ThreeTransformControls>()
  let light = $state.raw<DirectionalLight>()

  $effect(() => {
    if (lightHelperVisible && light !== undefined) {
      controls?.attach(light)
    }
    return () => {
      controls?.detach()
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position.x={10}
  position.y={5}
  position.z={10}
>
  <OrbitControls
    enableDamping
    maxPolarAngle={0.5 * Math.PI}
    minAzimuthAngle={-1 * 0.25 * Math.PI}
    maxAzimuthAngle={0.25 * Math.PI}
    maxDistance={20}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  position.x={-1 * 3}
  position.y={2}
  position.z={4}
  castShadow
  bind:ref={light}
>
  {#snippet children({ ref })}
    <TransformControls
      bind:controls
      onobjectChange={() => {
        helper?.update()
      }}
    />
    <T.DirectionalLightHelper
      bind:ref={helper}
      args={[ref]}
      attach={scene}
      visible={lightHelperVisible}
    />
  {/snippet}
</T.DirectionalLight>

<Backdrop
  {...backdropProps}
  scale={[50, 10, 10]}
>
  <T.MeshStandardMaterial
    color={materialColor}
    wireframe={materialWireframe}
  />
</Backdrop>

{#await gltf then { scene }}
  <Resize
    scale={3}
    position.z={1}
    rotation.y={Math.PI}
  >
    <T is={scene} />
  </Resize>
{/await}
