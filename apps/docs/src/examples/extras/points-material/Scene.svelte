<script lang="ts">
  import { T } from '@threlte/core'
  import { useGltf, PointsMaterial, OrbitControls, Grid } from '@threlte/extras'
  import { Vector3 } from 'three'

  const gltf = useGltf('/models/pointcloud_plant_in_a_pot.glb')
</script>

<T.PerspectiveCamera
  makeDefault
  position={[1, 1, 2]}
>
  <OrbitControls autoRotate />
</T.PerspectiveCamera>

{#await gltf then result}
  <T.Points rotation.x={-Math.PI / 2}>
    <T is={result.nodes.Object_2.geometry} />
    <PointsMaterial
      size={0.05}
      vertexColors
      toneMapped={false}
    />
  </T.Points>
{/await}

<Grid
  position.y={-0.5}
  infiniteGrid
  cellColor="#fff"
  sectionColor="#fff"
  cellSize={0.25}
  fadeDistance={2}
  type="circular"
  fadeOrigin={new Vector3()}
/>
