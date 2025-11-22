<script lang="ts">
  import { Mesh } from 'three'
  import { T, useTask, useThrelte } from '@threlte/core'
  import { OrbitControls, useViewport, RoundedBoxGeometry } from '@threlte/extras'

  const viewport = useViewport()
  const { renderStage, scheduler } = useThrelte()

  let mesh = new Mesh()

  const positions: [number, number, number][] = [
    [1, 0.5, 3.5],
    [-1, 0.5, -3.5],
    [-1, 0.5, 3.5],
    [1, 0.5, -3.5]
  ]

  useTask(
    () => {
      const { width, height, distance } = viewport.current
      mesh.scale.set(width * 0.4, height * 0.2, distance * 0.25)
      mesh.position.y = mesh.scale.y / 2
    },
    {
      stage: scheduler.createStage(Symbol('viewport-stage'), { before: renderStage })
    }
  )
</script>

<T.PerspectiveCamera
  makeDefault
  position={[8, 8, 8]}
  fov={50}
>
  <OrbitControls
    minDistance={5}
    maxDistance={15}
    enableDamping
    autoRotate
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  castShadow
  position={[3, 5, 3]}
  intensity={1.5}
/>

<T.AmbientLight />

<T
  is={mesh}
  castShadow
  receiveShadow
>
  <RoundedBoxGeometry radius={0.1} />
  <T.MeshStandardMaterial color="turquoise" />
</T>

{#each positions as position}
  <T.Mesh
    castShadow
    {position}
  >
    <T.DodecahedronGeometry args={[0.5]} />
    <T.MeshToonMaterial color="#fff" />
  </T.Mesh>
{/each}

<T.Mesh
  rotation.x={-Math.PI / 2}
  scale={6}
  receiveShadow
>
  <T.CircleGeometry args={[1, 128]} />
  <T.MeshToonMaterial color="#ccc" />
</T.Mesh>
