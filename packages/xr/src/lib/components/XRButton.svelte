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
<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'
  import { getXRSupportState } from '../lib/getXRSupportState'
  import { toggleXRSession } from '../lib/toggleXRSession'
  import { session, xr } from '../internal/stores'

  interface Props extends HTMLButtonAttributes {
    /** The type of `XRSession` to create */
    mode: XRSessionMode
    /**
     * `XRSession` configuration options
     * @see https://immersive-web.github.io/webxr/#feature-dependencies
     */
    sessionInit?: XRSessionInit & { domOverlay?: { root: HTMLElement } | undefined }
    /** Whether this button should only enter / exit an `XRSession`. Default is to toggle both ways */
    force?: 'enter' | 'exit'
    /** Whether to apply automatic styling to the button. Set false to apply custom styles. Default is true. */
    styled?: boolean
  }

  let { mode, sessionInit, force, styled = true, ...props }: Props = $props()

  const handleButtonClick = async (
    nativeEvent: MouseEvent,
    state: 'unsupported' | 'insecure' | 'blocked' | 'supported'
  ) => {
    if (!$xr) {
      throw new Error(
        'The <XR> component was not created. This is required to start an XR session.'
      )
    }

    props.onclick?.({ state, nativeEvent })

    if (state !== 'supported') return

    try {
      await toggleXRSession(mode, sessionInit, force)
    } catch (error) {
      /** This callback gets fired if XR initialization fails. */
      props.onerror?.(error)
    }
  }

  let modeText = $derived(
    {
      'immersive-vr': 'VR',
      'immersive-ar': 'AR',
      inline: 'inline'
    }[mode]
  )

  let style = $derived(
    styled
      ? `
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      padding: 10px 20px;
      border: 1px solid white;
      background: rgba(0, 0, 0, 0.1);
      color: white;
      outline: none;
      z-index: 10;
      ${props.style ?? ''}
    `
      : props.style
  )
</script>

{#await getXRSupportState(mode) then state}
  <button
    onclick={(event) => {
      handleButtonClick(event, state)
    }}
    {...props}
    {style}
  >
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
