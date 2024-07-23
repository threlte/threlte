<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { InstancedMesh, interactivity } from '@threlte/extras'
  import Sphere from './Sphere.svelte'

  const count = 20
  const gap = 1.5
  const offset = (count * gap) / 2

  const positions: [number, number][] = []
  const colors: [number, number, number][] = []

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      positions.push([i * gap - offset, j * gap - offset])
      colors.push([Math.random(), Math.random(), Math.random()])
    }
  }

  const { size } = useThrelte()
  let zoom = $size.width / 50
  $: zoom = $size.width / 50

  interactivity()
</script>

<T.OrthographicCamera
  position={[50, 50, 50]}
  {zoom}
  makeDefault
  oncreate={({ ref }) => {
    ref.lookAt(0, 0, 0)
  }}
/>

<InstancedMesh>
  <T.SphereGeometry args={[0.5]} />
  <T.MeshStandardMaterial color="white" />

  {#each positions as position}
    <Sphere {position} />
  {/each}
</InstancedMesh>

<T.DirectionalLight
  position.y={10}
  position.z={5}
/>

<T.AmbientLight />
