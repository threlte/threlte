<script lang="ts">
  import { Fn, cos, float, uniform, vec4 } from 'three/tsl'
  import type { NodeRepresentation } from 'three/tsl'
  import { T, useTask } from '@threlte/core'
  import { useTexture, OrbitControls } from '@threlte/extras'

  const defaultEmissiveIntensity = 1

  let { emissiveIntensity = defaultEmissiveIntensity }: { emissiveIntensity: number } = $props()

  const uTime = uniform(0)
  const uIntensity = uniform(defaultEmissiveIntensity)

  $effect(() => {
    uIntensity.value = emissiveIntensity
  })

  let positionY = $state(0)

  useTask((delta) => {
    uTime.value += delta
    positionY = 0.1 * Math.sin(uTime.value)
  })

  const red = Fn(([time, intensity]: [NodeRepresentation, NodeRepresentation]) => {
    const r = float(1).add(cos(time)).mul(0.5)
    return vec4(r.mul(intensity), 0, 0, 1)
  })

  const texture = useTexture('/textures/sprites/pixel-sky.png')
</script>

<T.AmbientLight />

<T.PerspectiveCamera
  makeDefault
  position={2}
>
  <OrbitControls />
</T.PerspectiveCamera>

{#await texture then map}
  <T.Mesh
    rotation.z={Math.PI}
    position.y={positionY}
  >
    <T.SphereGeometry />
    <T.MeshStandardNodeMaterial
      {map}
      emissiveNode={red(uTime, uIntensity)}
    />
  </T.Mesh>
{/await}
