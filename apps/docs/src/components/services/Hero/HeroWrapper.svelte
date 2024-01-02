<script lang="ts">
  import App from './App.svelte'
  import { Canvas } from '@threlte/core'
  import { onMount } from 'svelte'
  import { NoToneMapping } from 'three'
  import FadeOut from './FadeOut.svelte'
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
  import { Sheet, Theatre } from '@threlte/theatre'
  import state from './state.json'
  import Intro from './Intro/Intro.svelte'

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
    <div class="fixed top-0 left-0 z-10 h-[100lvh] w-screen">
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
                  <h3 class="mb-2 text-2xl font-bold text-white/90">Development</h3>
                  <p class="text-sm text-white/60">
                    Expert crafted 3D web apps and components, compatible with any framework.
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
                  <h3 class="mb-2 text-2xl font-bold text-white/90">Support</h3>
                  <p class="text-sm text-white/60">
                    Team augmentation, training and support packages to enhance your team's 3D
                    velocity.
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
                  <h3 class="mb-2 text-2xl font-bold text-white/90">Creative</h3>
                  <p class="text-sm text-white/60">
                    With design and writing services offered in-house, we offer a full-suite
                    offering.
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
        class="fixed top-[66svh] top-[66vh] left-0 flex w-screen flex-col items-center justify-center"
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
          Threlte Labs
        </TextEffect>
      </h2>
    </Trigger>
  </Theatre>
</div>
