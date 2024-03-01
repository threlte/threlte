<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Controls from './Controls.svelte'
  import Scene from './scene/Scene.svelte'
  import { T } from '@threlte/core'
  import { tweened } from 'svelte/motion'
  import { DEG2RAD } from 'three/src/math/MathUtils.js'

  import Scope from './scene/Scope.svelte'
  import { baseFov, scoping } from './Controls.svelte'
  import LensView from './LensView.svelte'

  const rotationX = tweened(90)
  const positionY = tweened(-0.3)
  const positionZ = tweened(-1)

  $: {
    if ($scoping) {
      rotationX.set(0)
      positionY.set(0)
      positionZ.set(-0.496)
    } else {
      rotationX.set(90)
      positionY.set(-0.3)
      positionZ.set(-1)
    }
  }
</script>

<div>
  <ul>
    <li>Press <b>S</b> to toggle scope mode.</li>
    <li><b>Mousewheel</b> or <b>A/D</b> to adjust zoom level.</li>
  </ul>
  <Canvas>
    <T.PerspectiveCamera
      makeDefault
      position={[0, 1.5, 20]}
      fov={baseFov}
    >
      <Scope
        let:ref
        position.y={$positionY}
        position.z={$positionZ}
        rotation.y={DEG2RAD * $rotationX}
      >
        <LensView scope={ref} />
      </Scope>
    </T.PerspectiveCamera>
    <Controls />
    <Scene />
  </Canvas>
</div>

<style>
  ul {
    position: absolute;
    top: 0;
    left: 0;
  }
  div {
    height: 100%;
  }
</style>
