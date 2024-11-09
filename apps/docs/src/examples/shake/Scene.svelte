<script lang="ts">
  import { OrbitControls } from '@threlte/extras'
  import { T, useThrelte } from '@threlte/core'
  import { Vector3 } from 'three'
  import { useShake } from './shake'

  let {
    pitchFrequency = 0.1,
    pitchIntensity = 0.1,
    rollFrequency = 0.1,
    rollIntensity = 0.1,
    useShakeyCamera = true,
    yawFrequency = 0.1,
    yawIntensity = 0.1
  }: {
    pitchFrequency: number
    pitchIntensity: number
    rollFrequency: number
    rollIntensity: number
    useShakeyCamera: boolean
    yawFrequency: number
    yawIntensity: number
  } = $props()

  const { scene } = useThrelte()

  const meshPosition = new Vector3()

  const { pitch, roll, shake, yaw } = useShake()

  $effect(() => {
    pitch.frequency = pitchFrequency
    pitch.intensity = pitchIntensity
    roll.frequency = rollFrequency
    roll.intensity = rollIntensity
    yaw.frequency = yawFrequency
    yaw.intensity = yawIntensity
  })
</script>

<T.AmbientLight />
<T.DirectionalLight
  position.x={3}
  position.y={3}
/>

<T.PerspectiveCamera
  makeDefault={!useShakeyCamera}
  position={8}
>
  <OrbitControls />
</T.PerspectiveCamera>

<T.PerspectiveCamera
  makeDefault={useShakeyCamera}
  position.x={5}
  position.y={-5}
  position.z={-5}
  oncreate={(ref) => {
    ref.lookAt(meshPosition)
    return shake(ref).stop
  }}
>
  {#snippet children({ ref })}
    <T.CameraHelper
      visible={!useShakeyCamera}
      args={[ref]}
      attach={scene}
    />
  {/snippet}
</T.PerspectiveCamera>

<T.Mesh
  position.x={meshPosition.x}
  position.y={meshPosition.y}
  position.z={meshPosition.z}
  scale={2}
>
  <T.MeshStandardMaterial color="orangered" />
  <T.BoxGeometry />
</T.Mesh>
