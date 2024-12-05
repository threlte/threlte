<script
  lang="ts"
  module
>
  export const hdrs = {
    industrial: 'industrial_sunset_puresky_1k.hdr',
    workshop: 'aerodynamics_workshop_1k.hdr',
    puresky: 'mpumalanga_veld_puresky_1k.hdr'
  } as const

  const isHdrKey = (u: PropertyKey): u is keyof typeof hdrs => {
    return u in hdrs
  }
</script>

<script lang="ts">
  import type { Vector3Tuple } from 'three'
  import { CubeCamera, Environment, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { T, useLoader, useTask } from '@threlte/core'
  import { RGBELoader } from 'three/examples/jsm/Addons.js'

  type SceneProps = {
    frames?: number
    far?: number
    hdr?: 'auto' | keyof typeof hdrs
    metalness?: number
    near?: number
    resolution?: number
    roughness?: number
  }

  let {
    frames = Infinity,
    far = 1000,
    hdr = 'auto',
    metalness = 1,
    near = 0.1,
    resolution = 256,
    roughness = 0
  }: SceneProps = $props()

  const colors = [0xff_00_ff, 0xff_ff_00, 0x00_ff_ff] as const

  const increment = (2 * Math.PI) / colors.length
  const radius = 3

  let time = $state(0)
  const y = $derived(2 * Math.sin(time))

  useTask((delta) => {
    time += delta
  })

  const cameraPosition: Vector3Tuple = [7, 7, 7] as const

  const hdrPath = '/textures/equirectangular/hdr/'

  const loader = useLoader(RGBELoader, {
    extend(loader) {
      loader.setPath(hdrPath)
    }
  })

  const backgrounds = loader.load(hdrs, {
    transform(texture) {
      texture.mapping = EquirectangularReflectionMapping
      return texture
    }
  })
</script>

<T.PerspectiveCamera
  makeDefault
  position={cameraPosition}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.AmbientLight />

{#await backgrounds then backgroundMap}
  {@const background = isHdrKey(hdr) ? backgroundMap[hdr] : hdr}
  {#each colors as color, i}
    {@const r = increment * i}
    <T.Mesh
      position.x={radius * Math.cos(r)}
      position.y={i}
      position.z={radius * Math.sin(r)}
    >
      <T.MeshStandardMaterial {color} />
      <T.BoxGeometry />
    </T.Mesh>
  {/each}

  <Environment
    onloadercreated={(loader) => {
      loader.setPath(hdrPath)
    }}
    file={'shanghai_riverside_1k.hdr'}
    isBackground
  />

  {#each Array(colors.length) as _, i}
    {@const r = Math.PI + increment * i}
    <CubeCamera
      {near}
      {far}
      {resolution}
      {background}
      {frames}
      position.y={y + i}
      position.x={radius * Math.cos(r)}
      position.z={radius * Math.sin(r)}
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
  {/each}
{/await}
