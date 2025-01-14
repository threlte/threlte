<script lang="ts">
  import { T, useThrelte } from '@threlte/core'
  import { interactivity } from '@threlte/extras'
  import { Debug } from '@threlte/rapier'
  import Intro from './scenes/Intro.svelte'
  import { game } from './Game.svelte'
  import { PerspectiveCamera } from 'three'
  import { CameraControls } from './lib'

  const { dom } = useThrelte()

  const camera = new PerspectiveCamera()
  const controls = new CameraControls(camera, dom)
  game.cameraControls = controls
  controls.setLookAt(0, 2, 5, 0, 0, 0, false)

  interactivity()
</script>

{#if game.debug}
  <Debug />
{/if}

<T
  is={camera}
  makeDefault
/>

<Intro />
