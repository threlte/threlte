<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { reducedMotion } from 'svelte-reduced-motion'
  import { NoToneMapping } from 'three'
  import { c } from '../../lib/classes'
  import Scene from './Scene.svelte'
  import { Sequence, Theatre } from '@threlte/theatre'
  import TheatreTextBox from './TheatreTextBox.svelte'
  import state from './state.json'

  let debug = false

  let started = false
</script>

<svelte:window
  on:keypress={(e) => {
    if (e.key === 'd') {
      debug = !debug
    }
  }}
/>

<Theatre
  config={{ state }}
  studio={{ enabled: false }}
>
  <div class={c('absolute top-0 left-0 z-[9] h-[110lvh] w-full')}>
    <div class="absolute inset-0">
      {#if $reducedMotion}
        <img
          class="h-full w-full object-cover"
          src="/images/hackathon/reduced-motion-background.jpg"
          alt="background"
        />
      {:else}
        <Canvas
          toneMapping={NoToneMapping}
          rendererParameters={{
            powerPreference: 'high-performance',
            antialias: false,
            stencil: false,
            depth: false,
            premultipliedAlpha: false
          }}
        >
          <Scene
            {debug}
            on:loaded={() => {
              started = true
            }}
          />
        </Canvas>
      {/if}
    </div>

    <div class="gradient absolute bottom-0 left-0 h-[10lvh] w-full" />

    {#if !debug && started}
      <Sequence
        autoplay
        delay={1000}
      >
        <div
          class="absolute inset-0 bottom-[10lvh] flex flex-col items-center justify-center gap-8 px-4"
        >
          <TheatreTextBox key="warp">
            <div class="flex flex-col items-center justify-center gap-0"> 
              <svg
              class="w-full max-w-[500px] sm:w-[70vw] md:w-[55vw] xl:max-w-[550px]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1338.29 230"
              >
                <path
                d="M555.21 117.35c18.99-7.42 37.96-14.83 56.96-22.26V22.16c.83-.33 38.34-14.99 56.3-22.02.46-.18.85-.18 1.32 0 18.52 7.25 56.04 21.92 56.3 22.03v72.92c19.01 7.43 38 14.85 56.99 22.27v75.4c-.18.08-.37.17-.56.24-18.64 7.29-37.29 14.57-55.92 21.87-.37.15-.67.09-1.01-.04-18.58-7.26-37.17-14.52-55.75-21.8-.52-.2-.93-.18-1.44.01-18.54 7.26-37.09 14.5-55.63 21.75-.21.08-.43.16-.65.24-18.96-7.41-37.92-14.81-56.9-22.23v-75.46Zm166.87 88.18v-61c-16.27-6.36-32.56-12.72-48.91-19.11v61c16.27 6.36 32.53 12.71 48.91 19.11Zm-57.02-19.1v-61c-16.35 6.39-32.64 12.75-48.88 19.1-.17 1.38-.09 60.48.08 60.97 16.25-6.35 32.5-12.7 48.79-19.06Zm-.32-74.76V47.92c-15.16-5.92-30.29-11.83-45.49-17.77V93.9c15.13 5.91 30.26 11.83 45.49 17.77Zm54.29-81.53c-15.24 5.96-30.37 11.87-45.5 17.78v63.75c15.22-5.95 30.37-11.87 45.5-17.78V30.13Zm-39.49 87.53v.15c16.27 6.36 32.53 12.71 48.81 19.07 14.13-5.52 28.25-11.04 42.38-16.56 0-.05-.01-.1-.02-.16-16.27-6.36-32.54-12.71-48.8-19.07-14.14 5.53-28.26 11.04-42.37 16.56Zm-112.11 2.59c.3.13.48.23.67.3 13.71 5.36 27.42 10.71 41.13 16.08.49.19.9.18 1.37-.01 6.98-2.74 13.96-5.47 20.94-8.2l26.58-10.38c.2-.08.39-.18.7-.32-.37-.15-.6-.25-.83-.34-13.69-5.35-27.38-10.7-41.07-16.06-.43-.17-.77-.15-1.19.01-15.86 6.21-31.72 12.4-47.59 18.6-.21.08-.41.18-.72.32Z"
                fill="#fff"
                />
            </svg>
              <h1 class="text-center text-3xl font-bold mt-5 ml-8" style="letter-spacing: 0.8em;">THRELTE</h1>
              <svg
                class="w-full max-w-[500px] sm:w-[70vw] md:w-[55vw] xl:max-w-[550px] m-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1673.5099 290.2"
              >
  <g
     id="g3"
     transform="translate(-265.8,-178.22)"
     style="fill:#ffffff">
    <polygon
       class="cls-1"
       points="619.85,291.03 694.35,178.23 626.21,178.23 546.48,178.23 476.74,178.23 552.69,292.49 481.66,402.87 335.55,178.23 265.8,178.23 457.22,466.19 458.71,468.42 502.68,468.42 585.89,342.44 669.64,468.42 713.62,468.42 905.29,178.23 837.15,178.23 692.6,402.87 "
       id="polygon1"
       style="fill:#ffffff" />
    <polygon
       class="cls-1"
       points="859.3,468.42 1149.97,468.42 1219.3,468.42 1027.63,178.23 983.66,178.23 790.75,468.42 "
       id="polygon2"
       style="fill:#ffffff" />
    <path
       class="cls-1"
       d="m 1834.41,178.23 h -222.7 v 290.19 h 62.93 V 364.94 h 159.77 c 69.6,0 104.9,-22.04 104.9,-65.5 v -55.72 c 0,-43.46 -35.29,-65.5 -104.9,-65.5 z"
       id="path2"
       style="fill:#ffffff" />
    <path
       class="cls-1"
       d="m 1462.11,178.23 h -222.7 v 290.19 h 62.93 V 364.94 h 128.92 l 66.41,103.48 h 69.34 l -69.84,-105.74 c 46.38,-6.62 69.84,-27.81 69.84,-63.24 v -55.72 c 0,-43.46 -35.29,-65.5 -104.9,-65.5 z"
       id="path3"
       style="fill:#ffffff" />
  </g>
</svg>


              <h1 class="text-center text-5xl font-bold mt-2 ml-8" style="letter-spacing: 0.8em;">2023</h1>
            </div>
          </TheatreTextBox>

          <TheatreTextBox key="title">
            <div class="flex flex-col items-center justify-center gap-0">
              <h2 class="text-center text-2xl font-semibold uppercase">
                The first official<br />
                <span class="text-3xl font-bold ">Threlte hackathon</span><br />
                15-22 October 2023
              </h2>
            </div>
          </TheatreTextBox>
        </div>
      </Sequence>

      <!-- ARROWS DOWN -->
      <div class="absolute inset-0 flex items-end justify-center">
        <TheatreTextBox key="button">
          <button
            class="pb-[15lvh] outline-none"
            on:click={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: 'smooth'
              })
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class="pulse-1 -mb-[20px]"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path
                d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class="pulse-2 -mb-[20px]"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path
                d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              class="pulse-3 -mb-[20px]"
              fill="#fff"
              viewBox="0 0 256 256"
            >
              <path
                d="M212.24,100.24l-80,80a6,6,0,0,1-8.48,0l-80-80a6,6,0,0,1,8.48-8.48L128,167.51l75.76-75.75a6,6,0,0,1,8.48,8.48Z"
              />
            </svg>
          </button>
        </TheatreTextBox>
      </div>
    {/if}
  </div>
</Theatre>

<style lang="postcss">
  .gradient {
    background: linear-gradient(transparent, ease, #0b0f18);
  }
</style>
