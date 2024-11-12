<script lang="ts">
  import { Fn, cos, float, uniform, vec4 } from 'three/webgpu'
  import type { NodeRepresentation } from 'three/webgpu'
  import { T, useTask } from '@threlte/core'
  import { useTexture, OrbitControls } from '@threlte/extras'

  const defaultEmissiveIntensity = 1

  let { emissiveIntensity = defaultEmissiveIntensity }: { emissiveIntensity: number } = $props()

  const uTime = uniform(0)
  const uIntensity = uniform(defaultEmissiveIntensity)

  $effect.pre(() => {
    uIntensity.value = emissiveIntensity
  })

  useTask((delta) => {
    uTime.value += delta
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
  <T.Mesh rotation.z={Math.PI}>
    <T.SphereGeometry />
    <T.MeshStandardNodeMaterial
      {map}
      emissiveNode={red(uTime, uIntensity)}
    />
  </T.Mesh>
{/await}
