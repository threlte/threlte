<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Progress } from '@threlte/extras'
  import { Tween } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  import Scene from './Scene.svelte'

  const progress = new Progress()
  const tween = new Tween.of(() => progress.progress, { duration: 150 })
  const width = $derived(tween.current * 100)
</script>

{#if tween.current < 1}
  <div
    transition:fade={{
      duration: 200
    }}
    class="wrapper"
  >
    <p class="loading">Loading</p>
    <div class="bar-wrapper">
      <div
        class="bar"
        style="width: {width}%"
      ></div>
    </div>
  </div>
{/if}

<div class="h-full">
  <Canvas>
    <Scene />
  </Canvas>
</div>

<style>
  div.main {
    height: 100%;
  }
  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background-color: white;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    align-items: center;
    justify-content: center;
    color: black;
  }

  .loading {
    font-size: 0.875rem;
    line-height: 1.25rem;
  }

  .bar-wrapper {
    width: 33.333333%;
    height: 10px;
    border: 1px solid black;
    position: relative;
  }

  .bar {
    height: 100%;
    background-color: black;
  }
</style>
