<script lang="ts">
  import Audio from '$lib/audio/Audio.svelte'
  import AudioListener from '$lib/audio/AudioListener.svelte'
  import PositionalAudio from '$lib/audio/PositionalAudio.svelte'
  import { useRaf } from '$lib/hooks/useRaf'
  import { BoxBufferGeometry, MeshStandardMaterial } from 'three'
  import { Canvas, DirectionalLight, Mesh, OrbitControls, PerspectiveCamera } from 'threlte'

  const material = new MeshStandardMaterial()
  const geometry = new BoxBufferGeometry(1, 1, 1)

  let cubePosX = 0

  useRaf(() => {
    cubePosX = Math.sin(Date.now() / 1000) * 3
  })

  let play
  let pause
  let stop
</script>

<div class="canvas-wrapper">
  <Canvas>
    <PerspectiveCamera position={{ z: 3, y: 1 }} lookAt={{}}>
      <AudioListener />
    </PerspectiveCamera>

    <Mesh {geometry} {material} position={{ x: cubePosX }}>
      <PositionalAudio url={'/audio/recording.mp3'} bind:play bind:pause bind:stop />
    </Mesh>

    <DirectionalLight position={{ x: 10, y: 20, z: -10 }} />
  </Canvas>

  <div class="audio-buttons">
    <button on:click={play}>Play</button>
    <button on:click={pause}>Pause</button>
    <button on:click={stop}>Stop</button>
  </div>
</div>

<style>
  div.canvas-wrapper {
    width: 100vw;
    height: 100vh;
  }

  .audio-buttons {
    top: 10px;
    left: 10px;
    position: fixed;
  }
</style>
