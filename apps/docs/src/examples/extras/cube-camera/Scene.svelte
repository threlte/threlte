<script lang="ts">
  import { T, useLoader, useTask } from '@threlte/core'
  import { CubeCamera, Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

  type SceneProps = {
    far?: number
    hdr_path?: string
    metalness?: number
    near?: number
    resolution?: number
    roughness?: number
  }

  let {
    far = 1000,
    hdr_path = 'auto',
    metalness = 1,
    near = 0.1,
    resolution = 256,
    roughness = 0
  }: SceneProps = $props()

  const { load } = useLoader(RGBELoader)
  let hdr = $derived(
    hdr_path === 'auto'
      ? ('auto' as const)
      : load(hdr_path).then((texture) => {
          texture.mapping = EquirectangularReflectionMapping
          return texture
        })
  )

  const colors = [0xff_00_ff, 0xff_ff_00, 0x00_ff_ff] as const
  const m = (2 * Math.PI) / colors.length
  const radius = 3

  let time = $state(0)
  let y = $derived(2 * Math.sin(time))

  useTask((delta) => {
    time += delta
  })
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
    frames={2}
  >
    {#snippet children({ renderTarget })}
      <T.Mesh>
        <T.SphereGeometry />
        <T.MeshStandardMaterial
          {roughness}
          {metalness}
          envMap={renderTarget.texture}
        />
      </T.Mesh>
    {/snippet}
  </CubeCamera>
{/await}
