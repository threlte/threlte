<script lang="ts">
  import { NoToneMapping } from 'three'
  import { T, Canvas } from '@threlte/core'
  // import Threlte from './examples/a/Threlte.svelte'
  // import Dom from './examples/a/Dom.svelte'
  // import Threlte from './examples/b/Threlte.svelte'
  // import Dom from './examples/b/Dom.svelte'
  // import Threlte from './examples/c/Threlte.svelte'
  // import Dom from './examples/c/Dom.svelte'
  // import Threlte from './examples/d/Threlte.svelte'
  // import Dom from './examples/d/Dom.svelte'
  // import Threlte from './examples/e/Threlte.svelte'
  // import Dom from './examples/e/Dom.svelte'
  // import Threlte from './examples/f/Threlte.svelte'
  // import Dom from './examples/f/Dom.svelte'
  // import Threlte from './examples/g/Threlte.svelte'
  // import Dom from './examples/g/Dom.svelte'
  // import Threlte from './examples/h/Threlte.svelte'
  // import Dom from './examples/h/Dom.svelte'
  // import Threlte from './examples/i/Threlte.svelte'
  // import Dom from './examples/i/Dom.svelte'
  import Threlte from './examples/j/Threlte.svelte'
  import Dom from './examples/j/Dom.svelte'
</script>

<div class="dom">
  <div class="container">
    <Dom />
  </div>
</div>

<main>
  <Canvas toneMapping={NoToneMapping}>
    <Threlte />
  </Canvas>
</main>

<style>
  :global(body) {
    margin: 0;
    overflow: hidden;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
      Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  main {
    position: absolute;
    height: 100vh;
    width: 50vw;
    left: 50vw;
    background: #333333;
    border-left: 1px solid white;
  }

  .dom {
    color: white;
    left: 0;
    position: absolute;
    height: 100vh;
    width: 50vw;
    background: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
