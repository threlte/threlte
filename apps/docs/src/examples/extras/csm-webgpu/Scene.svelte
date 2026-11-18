<script lang="ts">
  import { T } from '@threlte/core/webgpu'
  import { Float, OrbitControls } from '@threlte/extras/webgpu'
  import { MathUtils } from 'three/webgpu'

  const threlteOrange = '#ff3e00'
  const cream = '#fff3e0'

  const monoliths = Array.from({ length: 56 }, (_, index) => {
    const random = MathUtils.seededRandom(index)
    const depth = -index * 26
    const height = 14 + Math.sin(index * 0.45) * 10 + random * 18

    return {
      height,
      width: 5 + random * 4,
      depth,
      lean: (random - 0.5) * 0.12,
      color: index % 3 === 0 ? threlteOrange : cream
    }
  })

  const orbs = Array.from({ length: 6 }, (_, index) => ({
    position: [-index * 210 - 70, 30 + (index % 3) * 9, (index % 2 === 0 ? 1 : -1) * 12] as [
      number,
      number,
      number
    ],
    radius: 7 + (index % 3) * 2
  }))
</script>

<T.PerspectiveCamera
  makeDefault
  position={[120, 45, 0]}
  fov={70}
  near={0.5}
  far={5000}
>
  <OrbitControls
    maxPolarAngle={Math.PI / 2.05}
    target.y={38}
  />
</T.PerspectiveCamera>

<T.Color
  args={['#0e0e12']}
  attach="background"
/>

<T.AmbientLight intensity={1.2} />

<T.Mesh
  rotation.x={MathUtils.DEG2RAD * -90}
  receiveShadow
>
  <T.PlaneGeometry args={[10_000, 10_000]} />
  <T.MeshStandardMaterial color="#16161a" />
</T.Mesh>

{#each monoliths as monolith}
  {#each [1, -1] as side}
    <T.Mesh
      castShadow
      receiveShadow
      position={[monolith.depth, monolith.height / 2, side * 30]}
      rotation.z={monolith.lean * side}
    >
      <T.BoxGeometry args={[monolith.width, monolith.height, monolith.width]} />
      <T.MeshStandardMaterial
        color={monolith.color}
        roughness={0.6}
      />
    </T.Mesh>
  {/each}
{/each}

{#each orbs as orb}
  <Float
    floatingRange={[-10, 10]}
    rotationIntensity={0.6}
  >
    <T.Mesh
      castShadow
      position={orb.position}
    >
      <T.IcosahedronGeometry args={[orb.radius, 0]} />
      <T.MeshStandardMaterial
        color={threlteOrange}
        flatShading
        roughness={0.35}
      />
    </T.Mesh>
  </Float>
{/each}
