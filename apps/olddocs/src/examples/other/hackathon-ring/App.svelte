<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Suspense } from '@threlte/extras'
  import { Theatre } from '@threlte/theatre'
  import { cubicInOut } from 'svelte/easing'
  import { tweened } from 'svelte/motion'
  import Scene from './Scene.svelte'
  import state from './state.json'

  let isRevealed = false
  const opacity = tweened(0, { duration: 3e3, easing: cubicInOut })
  $: opacity.set(isRevealed ? 1 : 0)

  let isInView = false

  const inview = (el: HTMLElement) => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries?.[0]?.isIntersecting) {
          isInView = true
        }
      },
      { threshold: 0.8 }
    )

    observer.observe(el)
  }
</script>

<div class="wrapper">
  <div
    class="inner"
    style="opacity: {$opacity};"
    use:inview
  >
    <Canvas>
      <Suspense onload={() => (isRevealed = true)}>
        <Theatre
          studio={{ enabled: false }}
          config={{ state }}
        >
          {#if isInView}
            <Scene />
          {/if}
        </Theatre>
      </Suspense>
    </Canvas>
  </div>

  <a
    href="https://genkiinstruments.com/"
    target="_blank"
  >
    <img
      src="/images/hackathon/genki.png"
      alt="Genki Instruments Logo"
    />
  </a>
</div>

<style>
  :global(body) {
    margin: 0;
  }

  .wrapper {
    background-color: #0f1625;
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }

  a {
    position: absolute;
    bottom: 1em;
    left: 1em;
  }

  a img {
    width: 100px;
  }

  .inner {
    width: 100%;
    height: 100%;
  }
</style>
