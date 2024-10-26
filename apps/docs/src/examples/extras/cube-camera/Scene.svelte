<script lang="ts">
  import { T, useLoader, useTask } from '@threlte/core'
  import { CubeCamera, Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

  const { load } = useLoader(RGBELoader)

  type SceneProps = {
    far?: number
    metalness?: number
    near?: number
    resolution?: number
    roughness?: number
    hdr_path?: string
  }

  let {
    far = 1000,
    metalness = 1,
    near = 0.1,
    resolution = 256,
    roughness = 0,
    hdr_path = 'auto'
  }: SceneProps = $props()

  let hdr = $derived(
    hdr_path === 'auto'
      ? ('auto' as const)
      : load(hdr_path).then((texture) => {
          texture.mapping = EquirectangularReflectionMapping
          return texture
        })
  )

  let time = $state(0)
  let y = $derived(2 * Math.sin(time))

  useTask((delta) => {
    time += delta
  })

  const colors = [0xff_00_ff, 0xff_ff_00, 0x00_ff_ff]
  const m = (2 * Math.PI) / colors.length
  const radius = 3
</script>

<T.PerspectiveCamera
  makeDefault
  position={7}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight />

{#each colors as color, i}
  {@const r = m * i}
  <T.Mesh
    material.color={color}
    position.x={radius * Math.cos(r)}
    position.z={radius * Math.sin(r)}
  >
    <T.BoxGeometry />
  </T.Mesh>
{/each}

<Environment
  path="/hdr/"
  files="shanghai_riverside_1k.hdr"
  isBackground
  format="hdr"
/>

{#await hdr then background}
  <CubeCamera
    {near}
    {far}
    {resolution}
    position.y={y}
    {background}
  >
    {#snippet children({ fbo })}
      <T.Mesh>
        <T.SphereGeometry />
        <T.MeshStandardMaterial
          {roughness}
          {metalness}
          envMap={fbo.texture}
        />
      </T.Mesh>
    {/snippet}
  </CubeCamera>
{/await}
