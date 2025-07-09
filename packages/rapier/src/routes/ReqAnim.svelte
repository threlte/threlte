<script lang="ts">
  import { onMount } from 'svelte'

  const originalRaf = typeof window !== 'undefined' ? window.requestAnimationFrame : () => -1

  let isPaused = $state(false)
  let pendingCallbacks: FrameRequestCallback[] = []

  const monkeyPatchedRaf = (callback: FrameRequestCallback): number => {
    if (isPaused) {
      pendingCallbacks.push(callback)
      return -1 // Return an invalid ID when paused
    } else {
      return originalRaf(callback)
    }
  }

  const pauseRaf = () => {
    if (!isPaused) {
      isPaused = true
    }
  }

  const resumeRaf = () => {
    if (isPaused) {
      isPaused = false
      pendingCallbacks.forEach((callback) => originalRaf(callback))
      pendingCallbacks = []
    }
  }

  onMount(() => {
    // Monkeypatch the window.requestAnimationFrame
    window.requestAnimationFrame = monkeyPatchedRaf
  })
</script>

<div
  style="display: flex; gap: 10px; flex-direction: column; font-family: monospace; justify-items: flex-start; align-content: flex-start; width: min-content;"
>
  <div>window.requestAnimationFrame</div>
  <button
    onclick={() => {
      if (isPaused) {
        resumeRaf()
      } else {
        pauseRaf()
      }
    }}
  >
    {isPaused ? 'Resume' : 'Pause'}
  </button>
</div>
