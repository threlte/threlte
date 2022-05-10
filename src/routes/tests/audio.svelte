<script lang="ts">
  import Speaker from '$examples/components/Speaker.svelte'
  import Turntable from '$examples/components/Turntable.svelte'
  import { spring } from 'svelte/motion'
  import { CircleBufferGeometry, MeshStandardMaterial } from 'three'
  import { DEG2RAD } from 'three/src/math/MathUtils'
  import {
    AudioListener,
    Canvas,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    OrbitControls,
    OrthographicCamera
  } from 'threlte'

  let volume = 0
  let isPlaying = false

  const smoothVolume = spring(0)
  $: smoothVolume.set(volume)
</script>

<div class="canvas-wrapper">
  <Canvas>
    <OrthographicCamera zoom={80} position={{ z: 9, y: 5, x: 6 }}>
      <OrbitControls
        autoRotate={isPlaying}
        autoRotateSpeed={0.5}
        enableDamping
        maxPolarAngle={DEG2RAD * 80}
        target={{ y: 1.5 }}
      />
      <AudioListener />
    </OrthographicCamera>

    <!-- FLOOR -->
    <Mesh
      receiveShadow
      geometry={new CircleBufferGeometry(10, 10)}
      material={new MeshStandardMaterial({
        color: 0x333333
      })}
      rotation={{ x: DEG2RAD * -90 }}
    />

    <Turntable bind:isPlaying bind:volume />

    <Speaker position={{ x: 6 }} rotation={{ y: DEG2RAD * -7 }} {volume} />
    <Speaker position={{ x: -6 }} rotation={{ y: DEG2RAD * 7 }} {volume} />

    <DirectionalLight
      shadow={{
        mapSize: [1024, 1024],
        camera: {
          left: -9,
          right: 9,
          top: 9,
          bottom: -9
        }
      }}
      position={{ x: 10, y: 20, z: 8 }}
    />
    <HemisphereLight intensity={0.3} skyColor={0xffbd08} groundColor={0x323973} />
  </Canvas>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  div.canvas-wrapper {
    width: 100vw;
    height: 100vh;
  }
</style>
