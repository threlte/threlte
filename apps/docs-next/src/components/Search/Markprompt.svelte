<script lang="ts">
  import { focusTrap } from '$lib/focusTrap'
  import { onMount } from 'svelte'

  import hljs from 'highlight.js'
  //@ts-ignore
  import hljs_svelte from 'highlightjs-svelte'

  export let focus = false

  let container: HTMLDivElement

  hljs_svelte(hljs)

  let lastString = ''

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

  const isContainerStringSame = () => {
    if (container) {
      let currentString = container.querySelector('.MarkpromptAnswer')
      if (currentString && currentString?.innerHTML === lastString) {
        return true
      } else {
        lastString = `${currentString?.innerHTML}`
        return false
      }
    }

    return false
  }

  const highlightCode = () => {
    container.querySelectorAll('code').forEach((el) => {
      // then highlight each
      if (!el.classList.contains('hljs') && el.innerHTML.length > 30) {
        hljs.highlightElement(el)
      }
    })
  }

  let sameCounter = 0

  let highlighted = false

  setInterval(() => {
    if (focus) {
      const same = isContainerStringSame()

      if (same) sameCounter++

      if (sameCounter > 3 && !highlighted) {
        highlightCode()
        highlighted = true
      }

      if (!same) {
        sameCounter = 0
        highlighted = false
      }
    }
  }, 100)
</script>

<div
  bind:this={container}
  use:focusTrap={focus}
  class="h-[70vh]"
/>
