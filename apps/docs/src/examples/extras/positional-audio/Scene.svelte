<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { AudioListener, Environment, interactivity, OrbitControls } from '@threlte/extras'
  import { Spring } from 'svelte/motion'
  import { MathUtils } from 'three'
  import Speaker from './Speaker.svelte'
  import Turntable from './Turntable.svelte'

  let volume = $state(0)
  let isPlaying = $state(false)

  const smoothVolume = new Spring(0)
  $effect(() => {
    smoothVolume.set(volume)
  })

  const { size } = useThrelte()

  let zoom = $derived($size.width / 18)

  interactivity({
    filter: (hits) => {
      // only return first hit, we don't care
      // about propagation in this example
      return hits.slice(0, 1)
    }
  })
</script>

<Environment url="/textures/equirectangular/hdr/shanghai_riverside_1k.hdr" />

<T.OrthographicCamera
  {zoom}
  makeDefault
  oncreate={(ref) => {
    ref.position.set(6, 9, 9)
    ref.lookAt(0, 1.5, 0)
  }}
>
  <OrbitControls
    autoRotate={isPlaying}
    autoRotateSpeed={0.5}
    enableDamping
    maxPolarAngle={MathUtils.DEG2RAD * 80}
    target.y={1.5}
  />
  <AudioListener />
</T.OrthographicCamera>

<!-- FLOOR -->
<T.Mesh
  receiveShadow
  rotation.x={MathUtils.DEG2RAD * -90}
>
  <T.CircleGeometry args={[10, 64]} />
  <T.MeshStandardMaterial color="#333333" />
</T.Mesh>

<Turntable
  bind:isPlaying
  bind:volume
/>

<Speaker
  position.x={6}
  rotation.y={MathUtils.DEG2RAD * -7}
  {volume}
/>
<Speaker
  position.x={-6}
  rotation.y={MathUtils.DEG2RAD * 7}
  {volume}
/>

<T.DirectionalLight
  castShadow
  shadow.camera.left={-10}
  shadow.camera.bottom={-10}
  shadow.camera.right={10}
  shadow.camera.top={10}
  position={[10, 20, 8]}
  intensity={0.3}
/>
