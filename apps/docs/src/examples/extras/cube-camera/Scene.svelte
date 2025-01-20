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
  import type { Group } from 'three'
  import { CubeCamera, Environment, Grid, OrbitControls } from '@threlte/extras'
  import { EquirectangularReflectionMapping } from 'three'
  import { RGBELoader } from 'three/examples/jsm/Addons.js'
  import { T, useLoader, useTask } from '@threlte/core'

  type SceneProps = {
    frames?: number
    hdr?: 'auto' | keyof typeof hdrs
    metalness?: number
    near?: number
    resolution?: number
    roughness?: number
  }

  let {
    frames = Infinity,
    hdr = 'auto',
    metalness = 1,
    near = 0.1,
    resolution = 256,
    roughness = 0
  }: SceneProps = $props()

  const colors = ['#ff00ff', '#ffff00', '#00ffff'] as const

  const increment = (2 * Math.PI) / colors.length
  const radius = 3

  let time = 0
  const groups: Group[] = []
  useTask((delta) => {
    time += delta
    let i = 0
    for (const group of groups) {
      group.position.setY(2 * Math.sin(time + i))
      i += 1
    }
  })

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
  position={[10, 5, 10]}
  fov={30}
>
  <OrbitControls
    enableDamping
    enablePan={false}
    enableZoom={false}
    target.y={0.5}
    autoRotate
    autoRotateSpeed={0.1}
  />
</T.PerspectiveCamera>

<Environment url={`${hdrPath}shanghai_riverside_1k.hdr`} />

<Grid
  position.y={-3}
  sectionColor="#fff"
  cellColor="#fff"
/>

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
      <T.SphereGeometry />
    </T.Mesh>
  {/each}

  {#each Array(colors.length) as _, i}
    {@const r = Math.PI + increment * i}
    <T.Group
      position.x={radius * Math.cos(r)}
      position.z={radius * Math.sin(r)}
      oncreate={(ref) => {
        groups.push(ref)
      }}
    >
      <CubeCamera
        {background}
        {frames}
        {near}
        {resolution}
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
    </T.Group>
  {/each}
{/await}
