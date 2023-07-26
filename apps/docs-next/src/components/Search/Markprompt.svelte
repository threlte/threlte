<script lang="ts">
  import { focusTrap } from '$lib/focusTrap'
  import { onMount } from 'svelte'

  export let focus = false

  let container: HTMLDivElement

  onMount(async () => {
    const { markprompt } = await import('@markprompt/web')

    markprompt('sk_test_MWgsGFl6V2FdFnBBIVAMXhC1BVwl3u5T', container, {
      display: 'plain',
      close: {
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
      },
      references: {
        heading: 'Visit sources this answer was generated from:',
        getHref: (ref) => {
          console.log(ref)
          const baseUrl = `/docs${ref.file.path.replace('.mdx', '').replace('.md', '')}`
          if (ref.meta?.leadHeading?.slug) {
            return `${baseUrl}#${ref.meta.leadHeading.slug}`
          }
          return baseUrl
        },
        getLabel: (ref) => {
          if (JSON.stringify(ref.file.meta.title) === '{}') {
            return ref.file.meta.name
          }

          if (ref.meta?.leadHeading?.value) {
            return `${ref.file.meta.category} - ${ref.meta.leadHeading.value}`
          }
          return `${ref.file.meta.category} - ${ref.file.meta.title}`
        }
      }
    })
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
  class="h-[70vh]"
/>
