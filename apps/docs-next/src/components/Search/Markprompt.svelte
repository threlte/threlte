<script lang="ts">
  import '@markprompt/css'
  import { focusTrap } from '$lib/focusTrap'
  import { onDestroy, onMount } from 'svelte'

  export let focus = false

  let container: HTMLDivElement

  onMount(async () => {
    const { markprompt } = await import('@markprompt/web')
    console.log(markprompt)

    markprompt('sk_test_MWgsGFl6V2FdFnBBIVAMXhC1BVwl3u5T', container, {
      display: 'plain',
      close: {
        label: 'close',
        visible: false
      },
      search: {
        enabled: true,
        provider: {
          name: 'algolia',
          apiKey: 'b14257a2e455fc213a51ce63942dd721',
          appId: 'ZEJ3L4CHC0',
          indexName: 'threlte'
        }
      }
    })
  })

  onDestroy(() => {
    console.log('Date Component removed')
  })

  const focusInput = (val: boolean) => {
    if (val) {
      setTimeout(() => {
        const firstInput = container.querySelector('input')
        if (firstInput) firstInput.focus()
      }, 100)
    }
  }

  $: focusInput(focus)
</script>

<div
  bind:this={container}
  use:focusTrap={focus}
  class="h-[500px]"
/>
