<script lang="ts">
  import { onMount, tick } from 'svelte'
  import Portal from 'svelte-portal'
  import { TourManager } from './Tour/TourManager.svelte'

  const tourManager = new TourManager()

  onMount(async () => {
    await tick()
    tourManager.startTour()
  })
</script>

<svelte:window on:pointermove|capture={tourManager.tourStopMaskManager.onPointerMove} />

<Portal target="#tour-target">
  <div class="contents">
    <!-- MASK -->
    <div
      class="absolute left-0 top-0 z-[10000] h-full w-full"
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
        class="pointer-events-none absolute left-0 top-0 z-[10000] w-max max-w-64 select-none text-sm"
        bind:this={tourManager.instructionsManager.tooltipElement}
      >
        {#if tourManager.instructionsManager.currentInstructions}
          <div
            class="rounded-sm bg-white px-3 py-2 text-black"
            bind:this={tourManager.instructionsManager.wrapper}
          >
            <svelte:component
              this={tourManager.instructionsManager.currentInstructions.content.component}
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
        class="pointer-events-none absolute bottom-2 z-[10000] flex w-full select-none items-center justify-center"
      >
        {#if tourManager.instructionsManager.currentInstructions}
          <div
            class="max-w-[60%] rounded-sm bg-white px-2.5 py-1 text-black"
            bind:this={tourManager.instructionsManager.wrapper}
          >
            <svelte:component
              this={tourManager.instructionsManager.currentInstructions.content.component}
              {...tourManager.instructionsManager.currentInstructions.content.props}
            />
          </div>
        {/if}
      </div>
    {/if}
  </div>
</Portal>
