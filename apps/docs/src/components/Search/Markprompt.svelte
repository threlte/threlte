<script lang="ts">
  import { focusTrap } from '$lib/focusTrap'
  import { onDestroy, onMount } from 'svelte'

  import hljs from 'highlight.js'
  //@ts-ignore
  import hljs_svelte from 'highlightjs-svelte'

  export let focus = false

  let container: HTMLDivElement
  hljs_svelte(hljs)

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
      showBranding: false,
      references: {
        heading: 'Visit sources this answer was generated from:',
        getHref: (ref) => {
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

    // Start observing the target node for configured mutations
    observer.observe(container, config)
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

  const highlightCode = () => {
    container.querySelectorAll('pre').forEach((el) => {
      // then highlight each
      if (!el.classList.contains('hljs') && el.innerHTML.length > 20) {
        hljs.highlightElement(el)
      }
    })
  }

  const config = { attributes: true, childList: true, subtree: true }

  const callback = (mutationList: any) => {
    for (const mutation of mutationList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'data-loading-state' &&
        mutation.target.className === 'MarkpromptContentPlain'
      ) {
        const value = mutation.target.attributes.getNamedItem('data-loading-state')
        console.log(mutation, value, { v: value.nodeValue })

        if (value.nodeValue === 'done') {
          highlightCode()
        }
      }
    }
  }

  const observer = new MutationObserver(callback)

  onDestroy(() => {
    observer.disconnect()
  })
</script>

<div
  bind:this={container}
  use:focusTrap={focus}
  class="h-[70vh]"
/>
