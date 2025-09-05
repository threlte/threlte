<script lang="ts">
  import {
    MeshStandardMaterial,
    TetrahedronGeometry,
    CylinderGeometry,
    ConeGeometry,
    SphereGeometry,
    IcosahedronGeometry,
    TorusGeometry,
    OctahedronGeometry,
    BoxGeometry,
    MathUtils
  } from 'three'
  import { T } from '@threlte/core'
  import { Float } from '@threlte/extras'

  const material = new MeshStandardMaterial()
  const geometries = [
    { geometry: new TetrahedronGeometry(2) },
    { geometry: new CylinderGeometry(0.8, 0.8, 2, 32) },
    { geometry: new ConeGeometry(1.1, 1.7, 32) },
    { geometry: new SphereGeometry(1.5, 32, 32) },
    { geometry: new IcosahedronGeometry(2) },
    { geometry: new TorusGeometry(1.1, 0.35, 16, 32) },
    { geometry: new OctahedronGeometry(2) },
    { geometry: new SphereGeometry(1.5, 32, 32) },
    { geometry: new BoxGeometry(2.5, 2.5, 2.5) }
  ] as const

  const n = 40
  const randProps = Array.from(
    { length: n },
    () => geometries[Math.floor(Math.random() * geometries.length)]
  )
</script>

{#each randProps as prop}
  <Float
    floatIntensity={0}
    rotationIntensity={2}
    rotationSpeed={2}
  >
    <T.Mesh
      scale={MathUtils.randFloat(0.25, 0.5)}
      position={[
        MathUtils.randFloat(-8, 8),
        MathUtils.randFloat(-8, 8),
        MathUtils.randFloat(-8, 8)
      ]}
      geometry={prop?.geometry}
      {material}
    />
  </Float>
{/each}
