<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { Tween } from 'svelte/motion'
  import { fade } from 'svelte/transition'
  import { fromStore } from 'svelte/store'
  import { useProgress } from '@threlte/extras'

  const { progress } = useProgress()
  const p = fromStore(progress)

  const tweenedProgress = Tween.of(() => p.current, {
    duration: 150
  })

  const progressWidth = $derived(100 * tweenedProgress.current)
  const progressLessThanOne = $derived(tweenedProgress.current < 1)
</script>

{#if progressLessThanOne}
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
        style="width: {progressWidth}%"
      ></div>
    </div>
  </div>
{/if}

<div class="main">
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
