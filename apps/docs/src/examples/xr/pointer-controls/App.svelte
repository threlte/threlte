<script lang="ts">
  import { T, Canvas } from '@threlte/core'
  import { XR, VRButton } from '@threlte/xr'
  import Scene from './Scene.svelte'
</script>

<div>
  <Canvas>
    <Scene />

    <XR>
      {#snippet fallback()}
        <T.PerspectiveCamera
          makeDefault
          position={[0, 1.5, 4]}
          oncreate={({ ref }) => ref.lookAt(0, 1.5, 0)}
        />
      {/snippet}
    </XR>

    <T.AmbientLight />
    <T.DirectionalLight
      intensity={1.5}
      position={[1, 1, 1]}
    />
  </Canvas>
  <VRButton />
</div>

<style>
  div {
    height: 100%;
  }
</style>
