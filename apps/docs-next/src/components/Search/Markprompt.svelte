<script lang="ts">
  import '@markprompt/css'
  import { onMount } from 'svelte'

  let container: HTMLDivElement

  onMount(async () => {
    const { markprompt } = await import('@markprompt/web')
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
</script>

<div
  bind:this={container}
  class="h-[500px]"
/>
