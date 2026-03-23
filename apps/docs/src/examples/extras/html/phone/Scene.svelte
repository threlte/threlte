<script lang="ts">
  import { T } from '@threlte/core'
  import { Environment, Float, HTML, useGltf, OrbitControls } from '@threlte/extras'
  import { type Mesh, MathUtils } from 'three'
  import Geometries from './Geometries.svelte'
  import { RoundedPlaneGeometry } from './RoundedPlaneGeometry'

  const gltf = useGltf<{
    nodes: {
      phone: Mesh
    }
    materials: {}
  }>('/models/phone/phone.glb')

  const phoneGeometry = $derived($gltf?.nodes.phone.geometry)

  const url = window.origin
</script>

<T.PerspectiveCamera
  position={[50, -30, 30]}
  fov={20}
  oncreate={(ref) => {
    ref.lookAt(0, 0, 0)
  }}
  makeDefault
>
  <OrbitControls
    enableDamping
    enableZoom={false}
  />
</T.PerspectiveCamera>

<T.AmbientLight intensity={0.3} />

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<Float
  scale={0.7}
  floatIntensity={5}
>
  <HTML
    rotation.y={90 * MathUtils.DEG2RAD}
    position.x={1.2}
    transform
    occlude="blending"
    geometry={new RoundedPlaneGeometry(10.5, 21.3, 1.6)}
  >
    <div
      class="phone-wrapper"
      style="border-radius:1rem"
    >
      <iframe
        title=""
        src={url}
        width="100%"
        height="100%"
        frameborder="0"
      ></iframe>
    </div>
  </HTML>

  {#if phoneGeometry}
    <T.Mesh
      scale={5.65}
      geometry={phoneGeometry}
    >
      <T.MeshStandardMaterial
        color="#FF3F00"
        metalness={0.9}
        roughness={0.1}
      />
    </T.Mesh>
  {/if}
</Float>

<Geometries />

<style>
  .phone-wrapper {
    height: 848px;
    width: 420px;
    border-radius: 63px;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
</style>
