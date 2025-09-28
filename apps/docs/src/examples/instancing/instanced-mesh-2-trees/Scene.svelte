<script lang="ts">
  import { T } from '@threlte/core'
  import {
    CSM,
    Instance2,
    InstancedMesh2,
    interactivity,
    OrbitControls,
    Sky,
    useDraco,
    useGltf
  } from '@threlte/extras'

  import { FrontSide, Vector3 } from 'three'

  import { DEG2RAD } from 'three.quarks'

  const dracoLoader = useDraco()
  const gltf = useGltf('/models/tree.glb', { dracoLoader })

  const count = 100_000
  const terrainSize = count ** 0.5 * 5

  interactivity({
    filter(items) {
      // only report the first intersection
      return items.slice(0, 1)
    }
  })
</script>

<!-- todo sync sky and csm maybe -->
<Sky
  elevation={12}
  setEnvironment={false}
/>

<T.HemisphereLight intensity={2} />

<CSM
  enabled
  args={{
    lightDirection: new Vector3(1, -1, 1).normalize(),
    mode: 'practical',
    maxFar: 200,
    shadowMapSize: 2048,
    lightIntensity: 3,
    cascades: 1
  }}
>
  <T.PerspectiveCamera
    makeDefault
    position={[-30, 15, -15]}
    far={900}
  >
    <OrbitControls></OrbitControls>
  </T.PerspectiveCamera>

  {#await gltf then { scene }}
    <InstancedMesh2
      castShadow
      receiveShadow
    >
      <T is={(scene as any).children[0].geometry} />
      <T
        is={(scene as any).children[0].material}
        side={FrontSide}
      />

      {#each { length: count } as _}
        <Instance2
          rotation={[0, Math.random() * Math.PI * 2, Math.random() * 0.3 - 0.15]}
          position={[
            Math.random() * terrainSize - terrainSize / 2,
            0,
            Math.random() * terrainSize - terrainSize / 2
          ]}
          scale={Math.random() * 0.01 + 0.01}
          opacity={0.9}
        />
      {/each}
    </InstancedMesh2>
  {/await}

  <!-- Ground -->
  <T.Mesh
    rotation.x={-DEG2RAD * 90}
    receiveShadow
  >
    <T.PlaneGeometry args={[terrainSize, terrainSize, 10, 10]} />
    <T.MeshLambertMaterial color={'#004622'} />
  </T.Mesh>
</CSM>
