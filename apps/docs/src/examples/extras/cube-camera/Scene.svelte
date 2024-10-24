<script lang="ts">
  import { T, useTask } from '@threlte/core'
  import { CubeCamera, OrbitControls } from '@threlte/extras'

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

<CubeCamera position.y={y}>
  {#snippet children({ fbo })}
    <T.Mesh>
      <T.SphereGeometry />
      <T.MeshStandardMaterial
        roughness={0}
        metalness={1}
        envMap={fbo.texture}
      />
    </T.Mesh>
  {/snippet}
</CubeCamera>
