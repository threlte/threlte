<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { World } from '@threlte/rapier'
  import { Pane, Text } from 'svelte-tweakpane-ui'
  import Scene from './Scene.svelte'
</script>

<Pane
  title="World"
  position="fixed"
>
  <Text
    value="Use the arrow keys to move around"
    disabled
  />
</Pane>

<div>
  <Canvas>
    <World>
      <Scene />

      <HTML
        slot="fallback"
        transform
      >
        <p>
          It seems your browser<br />
          doesn't support WASM.<br />
          I'm sorry.
        </p>
      </HTML>
    </World>
  </Canvas>
</div>

<style>
  div {
    height: 100%;
  }
  p {
    font-size: 0.75rem;
    line-height: 1rem;
  }
</style>
