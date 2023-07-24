<script lang="ts">
  import SearchbarButton from './SearchbarButton.svelte'
  import { focusTrap } from '$lib/focusTrap'
  import Markprompt from './Markprompt.svelte'

  let askingQuestion = false

  const glowClasses = {
    orange:
      '[background-image:radial-gradient(closest-side,rgba(255,146,112,0.1)_0%,transparent_100%)]',
    blue: '[background-image:radial-gradient(closest-side,rgba(123,175,224,0.12)_0%,transparent_100%)]',
    green:
      '[background-image:radial-gradient(closest-side,rgba(135,230,151,0.12)_0%,transparent_100%)]'
  }

  function toggleDialog() {
    askingQuestion = !askingQuestion
    isFocused = !isFocused
  }

  let dialogElement: HTMLDialogElement

  let isFocused = false
</script>

<SearchbarButton on:click={toggleDialog} />

<div class="pointer-events-none fixed top-0 left-0 z-50 h-screen w-screen">
  {#if askingQuestion}
    <div
      class={`pointer-events-auto fixed top-0 left-0 h-screen  w-screen bg-gray-900/70
      `}
      on:click={toggleDialog}
      on:keypress={toggleDialog}
    />
  {/if}

  <dialog
    use:focusTrap={isFocused}
    open={askingQuestion}
    class={`glow-blue pointer-events-auto mt-[10%] flex max-h-[500px] w-full max-w-[50%] flex-col gap-4 rounded-lg border border-white/20 bg-blue-900 px-0 py-2 text-white ${
      askingQuestion ? '' : 'hidden'
    }`}
    bind:this={dialogElement}
  >
    <Markprompt />

    <div
      class={`absolute top-40 left-0 h-96 w-full -translate-y-full ${glowClasses['blue']} pointer-events-none`}
    />
  </dialog>
</div>
