<script lang="ts">
  import { PlaneGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'
  import { createNoise2D } from 'simplex-noise'
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import RAPIER from '@dimforge/rapier3d-compat'
  import { Collider, Debug, RigidBody } from '@threlte/rapier'
  import FallingShapes from './FallingShapes.svelte'

  let nsubdivs = 10
  let heights = []

  const geometry = new PlaneGeometry(10, 10, nsubdivs, nsubdivs)

  const noise = createNoise2D()
  const vertices = geometry.getAttribute('position').array

  for (let x = 0; x <= nsubdivs; x++) {
    for (let y = 0; y <= nsubdivs; y++) {
      let height = noise(x, y)
      const vertIndex = (x + (nsubdivs + 1) * y) * 3

      //@ts-ignore
      vertices[vertIndex + 2] = height
      const heightIndex = y + (nsubdivs + 1) * x
      heights[heightIndex] = height
    }
  }

  // needed for lighting
  geometry.computeVertexNormals()

  const scale = new RAPIER.Vector3(10.0, 1, 10)

  let resetCounter = 0
  export const reset = () => {
    resetCounter += 1
  }

  let debugEnabled = false
  export const toggleDebug = () => {
    debugEnabled = !debugEnabled
  }
</script>

<T.PerspectiveCamera
  makeDefault
  position.y={10}
  position.z={10}
  lookAt.y={0}
>
  <OrbitControls enableZoom={true} />
</T.PerspectiveCamera>

<T.DirectionalLight position={[3, 10, 10]} />
<T.HemisphereLight intensity={0.2} />

{#key resetCounter}
  <FallingShapes />
{/key}

<T.Mesh
  receiveShadow
  {geometry}
  rotation.x={DEG2RAD * -90}
  rotation.z={DEG2RAD * 0}
>
  <T.MeshStandardMaterial
    color="teal"
    opacity="0.8"
    transparent
  />
</T.Mesh>
<RigidBody type={'fixed'}>
  <Collider
    shape={'heightfield'}
    args={[nsubdivs, nsubdivs, heights, scale]}
  />
</RigidBody>

{#if debugEnabled === true}
  <Debug />
{/if}
