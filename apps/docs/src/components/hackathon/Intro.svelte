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
          class="absolute inset-0 bottom-[10lvh] flex flex-col items-center justify-center gap-24 px-4"
        >
          <TheatreTextBox key="warp">
            <div>
              <svg
                class="w-full max-w-[500px] sm:w-[70vw] md:w-[55vw] xl:max-w-[550px]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1338.29 504.8"
              >
                <path
                  d="M555.21 117.35c18.99-7.42 37.96-14.83 56.96-22.26V22.16c.83-.33 38.34-14.99 56.3-22.02.46-.18.85-.18 1.32 0 18.52 7.25 56.04 21.92 56.3 22.03v72.92c19.01 7.43 38 14.85 56.99 22.27v75.4c-.18.08-.37.17-.56.24-18.64 7.29-37.29 14.57-55.92 21.87-.37.15-.67.09-1.01-.04-18.58-7.26-37.17-14.52-55.75-21.8-.52-.2-.93-.18-1.44.01-18.54 7.26-37.09 14.5-55.63 21.75-.21.08-.43.16-.65.24-18.96-7.41-37.92-14.81-56.9-22.23v-75.46Zm166.87 88.18v-61c-16.27-6.36-32.56-12.72-48.91-19.11v61c16.27 6.36 32.53 12.71 48.91 19.11Zm-57.02-19.1v-61c-16.35 6.39-32.64 12.75-48.88 19.1-.17 1.38-.09 60.48.08 60.97 16.25-6.35 32.5-12.7 48.79-19.06Zm-.32-74.76V47.92c-15.16-5.92-30.29-11.83-45.49-17.77V93.9c15.13 5.91 30.26 11.83 45.49 17.77Zm54.29-81.53c-15.24 5.96-30.37 11.87-45.5 17.78v63.75c15.22-5.95 30.37-11.87 45.5-17.78V30.13Zm-39.49 87.53v.15c16.27 6.36 32.53 12.71 48.81 19.07 14.13-5.52 28.25-11.04 42.38-16.56 0-.05-.01-.1-.02-.16-16.27-6.36-32.54-12.71-48.8-19.07-14.14 5.53-28.26 11.04-42.37 16.56Zm-112.11 2.59c.3.13.48.23.67.3 13.71 5.36 27.42 10.71 41.13 16.08.49.19.9.18 1.37-.01 6.98-2.74 13.96-5.47 20.94-8.2l26.58-10.38c.2-.08.39-.18.7-.32-.37-.15-.6-.25-.83-.34-13.69-5.35-27.38-10.7-41.07-16.06-.43-.17-.77-.15-1.19.01-15.86 6.21-31.72 12.4-47.59 18.6-.21.08-.41.18-.72.32Z"
                  fill="#fff"
                />
                <g fill="#fff">
                  <path
                    d="M454.58 273.92 339.57 452.65l-57.88-88.98 59.28-89.75H167.83l60.43 90.91-56.52 87.82L55.49 273.92H0l152.3 229.11 1.18 1.77h34.99l66.2-100.23 66.64 100.23h34.99l152.5-230.88h-54.22z"
                  />
                  <path d="M571.15 273.92 417.66 504.8h340.97l-152.5-230.88h-34.98z" />
                  <path
                    d="M1254.83 273.92h-177.19V504.8h50.07v-82.33h127.12c55.38 0 83.46-17.54 83.46-52.11v-44.33c0-34.58-28.08-52.11-83.46-52.11Z"
                  />
                  <path
                    d="M958.62 273.92H781.43V504.8h50.07v-82.33h102.57l52.84 82.33h55.17l-55.57-84.13c36.9-5.27 55.57-22.13 55.57-50.32v-44.33c0-34.58-28.08-52.11-83.46-52.11Z"
                  />
                </g>
              </svg>
            </div>
          </TheatreTextBox>

          <TheatreTextBox key="title">
            <div class="flex flex-col items-center justify-center gap-0">
              <h2 class="text-center text-2xl">
                The first official Threlte hackathon<br />
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
