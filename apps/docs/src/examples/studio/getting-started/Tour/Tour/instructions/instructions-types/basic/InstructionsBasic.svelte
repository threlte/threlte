<script lang="ts">
  let {
    headline = '',
    message = '',
    clickAnywhere = false,
    centerText = false,
    cta = '',
    tip = ''
  }: {
    message?: string
    clickAnywhere?: boolean
    centerText?: boolean
    cta?: string
    headline?: string
    tip?: string
  } = $props()
</script>

<div class="flex flex-col gap-3">
  {#if headline}
    <h2 class="text-xl font-bold leading-snug text-neutral-800">
      {@html headline}
    </h2>
  {/if}

  {#if message}
    <div
      class="leading-snug"
      class:text-center={centerText}
    >
      {@html message}
    </div>
  {/if}

  {#if tip}
    <div
      class="shadow-xs flex items-start gap-1.5 rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1 text-sm leading-snug"
    >
      <div
        class="relative flex h-[1.375em] w-[1.375em] shrink-0 grow-0 items-center justify-center"
      >
        <svg
          class="absolute h-[85%] w-[85%] text-neutral-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          ><path
            d="M11,9H13V7H11M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M11,17H13V11H11V17Z"
          /></svg
        >
      </div>
      {@html tip}
    </div>
  {/if}

  {#if cta}
    <div class="font-semibold leading-snug">
      → {@html cta}
    </div>
  {/if}

  {#if clickAnywhere}
    <small
      class="block w-full text-neutral-600"
      class:text-center={centerText}
    >
      Click anywhere to continue.
    </small>
  {/if}
</div>
