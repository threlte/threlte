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
    <!-- <div class="absolute bottom-2 z-[10000] flex w-full items-center justify-center">
      {#if tourManager.instructionsManager.currentMessage}
        <div
          class="rounded-sm bg-white px-1 text-black"
          bind:this={tourManager.instructionsManager.wrapper}
        >
          {tourManager.instructionsManager.currentMessage}
        </div>
      {/if}
    </div> -->

    <!-- SUBTITLE INSTRUCTIONS -->
    <div class="absolute bottom-2 z-[10000] flex w-full items-center justify-center">
      {#if tourManager.instructionsManager.currentMessage}
        <div
          class="rounded-sm bg-white px-1 text-black"
          bind:this={tourManager.instructionsManager.wrapper}
        >
          {tourManager.instructionsManager.currentMessage}
        </div>
      {/if}
    </div>
  </div>
</Portal>
