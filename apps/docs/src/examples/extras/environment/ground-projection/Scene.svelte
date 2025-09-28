<script lang="ts">
  import { Environment, OrbitControls, Suspense } from '@threlte/extras'
  import { GroundedSkybox } from 'three/examples/jsm/Addons.js'
  import { T } from '@threlte/core'

  type Props = {
    useGround?: boolean
  }

  let { useGround = true }: Props = $props()

  let skybox = $state.raw<GroundedSkybox>()

  const groundOptions = { height: 15, radius: 100 }

  const ground = $derived(useGround === false ? useGround : groundOptions)

  const radius = 0.5

  const y = groundOptions.height - radius - 0.1

  $effect(() => {
    skybox?.position.setY(y)
  })
</script>

<Suspense>
  <T.PerspectiveCamera
    makeDefault
    position.x={5}
    position.y={2}
    position.z={5}
  >
    <OrbitControls
      maxDistance={20}
      maxPolarAngle={0.5 * Math.PI}
    />
  </T.PerspectiveCamera>

  <T.Mesh rotation.x={0.5 * Math.PI}>
    <T.MeshStandardMaterial metalness={1} />
    <T.TorusGeometry args={[2, radius]} />
  </T.Mesh>

  <Environment
    isBackground
    url="/textures/equirectangular/hdr/blouberg_sunrise_2_1k.hdr"
    {ground}
    bind:skybox
  />
</Suspense>
