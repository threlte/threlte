<script lang="ts">
  import { CircleBufferGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'

  import {
    AmbientLight,
    Canvas,
    DirectionalLight,
    GLTF,
    Group,
    HemisphereLight,
    Mesh,
    OrbitControls,
    OrthographicCamera,
    useFrame
  } from 'threlte'

  const floorGeometry = new CircleBufferGeometry(4, 60)
  const floorMaterial = new MeshStandardMaterial()

  let rotation = 0
  useFrame(() => {
    rotation += 0.002
  })
</script>

<Group rotation={{ y: rotation }}>
  <OrthographicCamera position={{ z: 10, y: 5 }} lookAt={{ y: 2 }} zoom={80} />
</Group>

<GLTF castShadow receiveShadow url={'/models/threlte.glb'} />

<Mesh
  receiveShadow
  material={floorMaterial}
  geometry={floorGeometry}
  rotation={{ x: DEG2RAD * -90 }}
/>

<DirectionalLight shadow position={{ x: 3, y: 10, z: 10 }} />
<DirectionalLight position={{ x: -3, y: 10, z: -10 }} intensity={0.2} />
<AmbientLight intensity={0.2} />
