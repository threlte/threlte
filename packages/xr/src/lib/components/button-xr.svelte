<!--
@component
`<XRButton />` is an HTML `<button />` that can be used to init and
display info about your WebXR session. This is aliased by `ARButton` and
`VRButton` with sensible session defaults.

```svelte
  <XRButton
    mode={'immersive-ar' | 'immersive-vr' | 'inline'}
    sessionInit={{
      optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking', 'layers']
    }}
    force={'enter' | 'exit' | undefined}
    styled={'true' | 'false'}
    on:error={(event) => {}}
    on:click={(event) => {}}
  />
```
-->

<script lang='ts'>

import { createEventDispatcher } from 'svelte'
import { getXRSupportState } from '$lib/lib/get-xr-support-state'
import { toggleXRSession } from '$lib/lib/toggle-xr-session'
import { session, initialized } from '$lib/internal/stores'

/** The type of `XRSession` to create */
export let mode: XRSessionMode

/**
 * `XRSession` configuration options
 * @see https://immersive-web.github.io/webxr/#feature-dependencies
 */
export let sessionInit: XRSessionInit & { domOverlay?: { root: HTMLElement } | undefined } | undefined

/** Whether this button should only enter / exit an `XRSession`. Default is to toggle both ways */
export let force: 'enter' | 'exit' | undefined = undefined

/** Whether to apply automatic styling to the button. Set false to apply custom styles. Default is true. */
export let styled = true

type $$Events = {
  /** Fires when a user clicks the VR button. */
  click: { state: 'unsupported' | 'insecure' | 'blocked' | 'supported' }
  /** Fires when an enter / exit session error occurs. */
  error: Error
}

const dispatch = createEventDispatcher<$$Events>()

const handleButtonClick = async (state: 'unsupported' | 'insecure' | 'blocked' | 'supported') => {
  if (!$initialized) {
    throw new Error('The <XR> component was not created. This is required to start an XR session.')
  }

  dispatch('click', { state })

  if (state !== 'supported') return

  try {
    await toggleXRSession(mode, sessionInit, force)
  } catch (error) {
    /** This callback gets fired if XR initialization fails. */
    dispatch('error', error as Error)
  }
}

$: modeText = {
  'immersive-vr': 'VR',
  'immersive-ar': 'AR',
  inline: 'inline'
}[mode]

$: if (styled) {
  $$restProps.style = `
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border: 1px solid white;
    background: rgba(0, 0, 0, 0.1);
    color: white;
    outline: none;
    z-index: 99999;
    ${($$restProps.style ?? '')}
  `
}

</script>

{#await getXRSupportState(mode) then state}
  <button {...$$restProps} on:click={() => handleButtonClick(state)}>
    {#if state === 'unsupported'}
      {modeText} unsupported
    {:else if state === 'insecure'}
      HTTPS needed
    {:else if state === 'blocked'}
      {modeText} blocked
    {:else if state === 'supported'}
      {$session ? 'Exit' : 'Enter'} {modeText}
    {/if}
  </button>
{/await}
