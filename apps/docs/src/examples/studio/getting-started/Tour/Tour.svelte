<script lang="ts">
  import { onMount, tick } from 'svelte'
  import Portal from 'svelte-portal'
  import { TourManager } from './Tour/TourManager.svelte'

  const tourManager = new TourManager()

  onMount(async () => {
    await tick()
    tourManager.startTour()
  })

  const instructionsPlacement = $derived(
    tourManager.instructionsManager.currentInstructions?.style?.subtitle?.placement
  )
</script>

<svelte:window onpointermovecapture={tourManager.tourStopMaskManager.onPointerMove} />

<Portal target="#tour-target">
  <div class="contents">
    <!-- MASK -->
    <div
      class="z-10000 absolute left-0 top-0 h-full w-full"
      bind:this={tourManager.tourStopMaskManager.wrapperRef}
    >
      <svg
        class="pointer-events-none"
        width="100%"
        height="100%"
        style="opacity: 0;"
        bind:this={tourManager.tourStopMaskManager.svg}
      >
        <mask id="myMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="white"
          />

          <rect
            bind:this={tourManager.tourStopMaskManager.maskRect}
            x="0"
            y="0"
            rx="999"
            ry="999"
            width="100"
            height="100"
            fill="black"
          />
        </mask>

        <rect
          bind:this={tourManager.tourStopMaskManager.darkenerRect}
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(0,0,0,0.5)"
          mask="url(#myMask)"
        />

        <rect
          bind:this={tourManager.tourStopMaskManager.highlightRect}
          bind:this={tourManager.instructionsManager.referenceElement}
          x="0"
          y="0"
          rx="999"
          ry="999"
          width="100"
          height="100"
          stroke="rgba(255, 255, 255, 0.8)"
          stroke-width="2px"
          fill="transparent"
        />
      </svg>
    </div>

    <!-- TOOLTIP INSTRUCTIONS -->
    {#if tourManager.instructionsManager.isToolTip}
      <div
        class="z-10000 pointer-events-none absolute left-0 top-0 w-max max-w-96 select-none"
        bind:this={tourManager.instructionsManager.tooltipElement}
      >
        {#if tourManager.instructionsManager.currentInstructions}
          <div
            class="pointer-events-auto rounded-md bg-white px-3 py-2 text-black shadow-2xl"
            bind:this={tourManager.instructionsManager.wrapper}
          >
            <tourManager.instructionsManager.currentInstructions.content.component
              {...tourManager.instructionsManager.currentInstructions.content.props}
            />
          </div>
          <div
            bind:this={tourManager.instructionsManager.tooltipArrowElement}
            class="absolute h-2 w-2 rotate-45 bg-white"
          ></div>
        {/if}
      </div>
    {:else}
      <!-- INSTRUCTIONS -->
      <div
        class={[
          'z-10000 pointer-events-none absolute flex w-full select-none items-center justify-center',
          instructionsPlacement === 'bottom' || !instructionsPlacement
            ? 'bottom-2'
            : 'top-1/2 -translate-y-1/2'
        ]}
      >
        {#if tourManager.instructionsManager.currentInstructions}
          <div
            class="pointer-events-auto max-w-[60%] rounded-md bg-white px-3 py-2 text-black"
            bind:this={tourManager.instructionsManager.wrapper}
          >
            <tourManager.instructionsManager.currentInstructions.content.component
              {...tourManager.instructionsManager.currentInstructions.content.props}
            />
          </div>
        {/if}
      </div>
    {/if}

    <div
      class="z-10001 pointer-events-auto absolute bottom-4 right-4 rounded-md bg-white px-1 py-0.5 text-sm text-neutral-600"
    >
      {#if tourManager.tourStarted}
        <button
          onclickcapture={(e) => {
            e.stopPropagation()
            tourManager.stopTour()
          }}
        >
          Skip Tour →
        </button>
      {:else}
        <button onclickcapture={() => location.reload()}> Start Tour </button>
      {/if}
    </div>
  </div>
</Portal>
