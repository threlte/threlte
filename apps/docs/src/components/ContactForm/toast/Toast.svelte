<script lang="ts">
  import { Close, Checkmark, Warning, Error } from './icons'

  import { fade } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  interface Props {
    type?: 'error' | 'warning' | 'info'
    open?: boolean
    title?: string
    message: string
  }

  let { type = 'info', open = $bindable(true), title = '', message }: Props = $props()

  let error = $derived(type == 'error')
  let warning = $derived(type == 'warning')
  let info = $derived(type == 'info')

  const icon = {
    error: Error,
    warning: Warning,
    info: Checkmark
  }

  const dispatch = createEventDispatcher()
  function close() {
    open = false
    dispatch('toast-closed')
  }
</script>

{#if open}
  {@const SvelteComponent = icon[type]}
  <section
    class:error
    class:warning
    class:info
    transition:fade={{ duration: 200 }}
  >
    <span>
      <SvelteComponent />
      <b>{title ? title + ':' : ''}</b>{message}
    </span>
    <span
      role="button"
      tabindex="0"
      onclick={close}
      onkeypress={close}
    >
      <Close />
    </span>
  </section>
{/if}

<style>
  :root {
    --toast-opacity: 0.8;
  }

  section {
    flex-grow: 1;
    padding: 0.5em;
    margin: 0;
    display: flex;
    gap: 0.5em;
    flex-flow: row;
    align-items: center;
    justify-content: space-between;
  }

  span {
    display: flex;
    align-items: center;
    font-size: smaller;
    gap: 0.5em;
    text-overflow: ellipsis;
  }

  .error {
    background-color: rgb(192, 39, 85, var(--toast-opacity));
  }

  .warning {
    background-color: rgb(224, 194, 57, var(--toast-opacity));
  }

  .info {
    background-color: rgb(38, 99, 150, var(--toast-opacity));
  }
</style>
