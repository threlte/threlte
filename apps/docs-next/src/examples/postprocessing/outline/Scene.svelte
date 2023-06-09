<script lang="ts">
  import { PlaneGeometry } from 'three'
  import { T } from '@threlte/core'
  import { OrbitControls, Grid, ContactShadows } from '@threlte/extras'
  import { animationPlaying } from './state'
  import Maze from './Maze.svelte'
  import CustomRenderer from './CustomRenderer.svelte'

	let outlinedCube;
</script>

<Maze />

<T.Mesh position={[1.8,1,1]} bind:ref={outlinedCube}>
  <T.MeshToonMaterial color="gold" />
  <T.BoxGeometry />
</T.Mesh>

<CustomRenderer selectedMesh={outlinedCube} />


<T.PerspectiveCamera
  makeDefault
  position={[0, 6, -10]}
  fov={15}
  zoom={0.2}
>
  <OrbitControls enableZoom={true} enableDamping target.y={0} />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={75}
  cellSize={2}
/>

<ContactShadows scale={12} blur={2} far={5} opacity={0.5} />

