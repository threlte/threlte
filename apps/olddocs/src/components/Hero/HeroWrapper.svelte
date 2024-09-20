<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { Sheet, Theatre } from '@threlte/theatre'
  import { onMount } from 'svelte'
  import { NoToneMapping, WebGLRenderer } from 'three'
  import App from './App.svelte'
  import FadeOut from './FadeOut.svelte'
  import Intro from './Intro/Intro.svelte'
  import Reveal from './Reveal.svelte'
  import TextEffect from './TextEffect.svelte'
  import Trigger from './Trigger.svelte'
  import {
    _springScrollPos,
    mouseCoords,
    mouseCoordsSpring,
    scrollPos,
    springScrollPos
  } from './scrollPos'
  import { debug } from './state'
  import state from './state.json'

  const onScroll = () => {
    // get normalized scroll position in document. 0 should equal top of page, 1
    // should equal 1 page height from top, 2 should equal 2 page heights from
    // top, etc. This allows easier addition of content to the bottom as opposed
    // to a normalized scroll position where 1 is the bottom of the page.
    const newScrollPos = Math.max(window.scrollY / window.innerHeight, 0)
    scrollPos.set(newScrollPos)
    _springScrollPos.set(newScrollPos)
  }

  onMount(() => {
    const newScrollPos = Math.max(window.scrollY / window.innerHeight, 0)
    scrollPos.set(newScrollPos)
    _springScrollPos.set(newScrollPos, {
      hard: true
    })
  })

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'd') debug.set(!debug.current)
  }

  const onMouseMove = (e: MouseEvent) => {
    // get normalized mouse coords
    const x = e.clientX / window.innerWidth
    const y = e.clientY / window.innerHeight
    mouseCoords.set({ x, y })
    mouseCoordsSpring.set({ x, y })
  }
</script>

<svelte:window
  on:scroll={onScroll}
  on:keydown={onKeyDown}
  on:mousemove={onMouseMove}
/>

<div class="pointer-events-none relative z-20 h-[500vh]">
  <Theatre
    config={{ state }}
    studio={{ enabled: false }}
  >
    <div class="fixed left-0 top-0 z-10 h-[100lvh] w-screen">
      <Canvas
        toneMapping={NoToneMapping}
        createRenderer={(canvas) => {
          return new WebGLRenderer({
            canvas,
            alpha: true,
            powerPreference: 'high-performance',
            antialias: false,
            stencil: false,
            depth: false,
            premultipliedAlpha: false
          })
        }}
      >
        <App />
      </Canvas>
    </div>

    <div class="pointer-events-auto contents">
      <Sheet name="Intro">
        <Intro />
      </Sheet>
    </div>

    <Trigger
      in={0.5}
      out={2.7}
    >
      <svelte:fragment>
        {@const start = 0.6}
        {@const stagger = 0.4}
        {@const duration = 0.6}
        {@const outStart = 2.2}
        {@const outEnd = 2.7}
        <div
          class="pointer-events-auto fixed bottom-0 left-0 hidden w-screen justify-center p-12 md:flex"
        >
          <div class="grid max-w-[1200px] grid-cols-3 gap-12">
            <div class="col-span-1">
              <Reveal
                progress={$springScrollPos}
                from={start}
                to={start + duration}
              >
                <FadeOut
                  progress={$springScrollPos}
                  from={outStart}
                  to={outEnd}
                >
                  <h3 class="mb-2 text-2xl font-bold text-white/90">You already know Threlte</h3>
                  <p class="text-sm text-white/60">
                    Threlte puts the simplicity of Svelte 5 and all of the power of Three.js right
                    at your fingertips. It's designed to be powerful and flexible while still being
                    approachable and easy to use.
                  </p>
                </FadeOut>
              </Reveal>
            </div>

            <div class="col-span-1">
              <Reveal
                progress={$springScrollPos}
                from={start + stagger}
                to={start + stagger + duration}
              >
                <FadeOut
                  progress={$springScrollPos}
                  from={outStart}
                  to={outEnd}
                >
                  <h3 class="mb-2 text-2xl font-bold text-white/90">Reimagine the Web</h3>
                  <p class="text-sm text-white/60">
                    With AR and VR picking up steam, the web is becoming more and more 3D. Threlte
                    provides a simple, declarative API for creating 3D content on the web.
                  </p>
                </FadeOut>
              </Reveal>
            </div>

            <div class="col-span-1">
              <Reveal
                progress={$springScrollPos}
                from={start + stagger * 2}
                to={start + stagger * 2 + duration}
              >
                <FadeOut
                  progress={$springScrollPos}
                  from={outStart}
                  to={outEnd}
                >
                  <h3 class="mb-2 text-2xl font-bold text-white/90">Powerful Integrations</h3>
                  <p class="text-sm text-white/60">
                    Threlte comes with solutions for physics, XR, animation, model loading, and
                    countless helpers to make creating immersive 3D apps for the web a breeze.
                  </p>
                </FadeOut>
              </Reveal>
            </div>
          </div>
        </div>
      </svelte:fragment>
    </Trigger>

    <Trigger
      in={2.7}
      out={3.9}
    >
      <h2
        class="fixed left-0 top-[66svh] top-[66vh] flex w-screen flex-col items-center justify-center"
      >
        <TextEffect
          id="intro"
          type="fade-up"
          progress={$springScrollPos}
          class="inline-block text-xl text-white/60 md:text-3xl"
          in={{
            start: 2.7,
            end: 3.1
          }}
          out={{
            start: 3.6,
            end: 3.9
          }}
        >
          Introducing
        </TextEffect>
        <TextEffect
          progress={$springScrollPos}
          id="t6"
          type="fade-up-skew-individual"
          class="inline-block text-6xl font-bold text-white/90 md:text-7xl"
          in={{
            start: 2.8,
            end: 3.5
          }}
          out={{
            start: 3.7,
            end: 4
          }}
        >
          Threlte 8
        </TextEffect>
      </h2>
    </Trigger>
  </Theatre>
</div>
