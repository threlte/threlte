<script lang="ts">
  import { c } from '$lib/classes'
  import type { MarkdownHeading } from 'astro'
  import { onMount } from 'svelte'
  import { onDestroy } from 'svelte'
  import type { CollectionEntry } from 'astro:content'

  export let entry: CollectionEntry<'learn'> | CollectionEntry<'reference'>
  export let editUrl: string | undefined = undefined
  export let sourceUrl: string | undefined = undefined
  export let headings: MarkdownHeading[]

  const lowestHeadingDepth = Math.min(...headings.map((heading) => heading.depth))

  let intersectionObserver: IntersectionObserver | undefined = undefined

  let currentHeadingSlug: string | undefined = undefined
  let currentHeading: MarkdownHeading | undefined = headings[0]

  const setCurrentHeading = (id: string) => {
    currentHeadingSlug = id

    const newHeadingIndex = headings.findIndex((heading) => {
      return heading.slug == id
    })

    currentHeading = headings[newHeadingIndex] || currentHeading
  }

  const headingClicked = (slug: string) => {
    setCurrentHeading(slug)
  }

  onMount(() => {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const { id } = entry.target
            setCurrentHeading(id)
            break
          }
        }
      },
      {
        // Negative top margin accounts for `scroll-margin`.
        // Negative bottom margin means heading needs to be
        // towards top of viewport to trigger intersection.
        rootMargin: '-100px 0% -66%',
        threshold: 1
      }
    )

    document
      .querySelectorAll(`article :is(${headings.map((heading) => `h${heading.depth}`).join(',')})`)
      .forEach((h) => intersectionObserver?.observe(h))
  })

  onDestroy(() => {
    intersectionObserver?.disconnect()
  })

  const focusFirstDropdownLink = ({ target }: any) => {
    target.firstElementChild.focus()
  }

  const showContributing = !!editUrl || !!sourceUrl
</script>

<div
  class="scrollbar-hide relative h-full w-full overflow-auto px-6 pb-12 pt-6 lg:px-0 lg:pl-6 lg:text-sm "
>
  {#if headings.length}
    <span
      class="ml-[calc(1rem+2px)] mb-3 block px-0 py-0 text-xs text-white/80 lg:relative lg:top-0 lg:w-full lg:text-sm lg:font-bold lg:text-white"
      >On this page</span
    >

    <ul
      class="duration-50 mb-8 w-full bg-[#0c1421] text-left transition-all lg:pointer-events-auto lg:bg-transparent lg:opacity-100"
      on:transitionend={focusFirstDropdownLink}
    >
      {#each headings as heading}
        <li
          class={c(
            'nav-list-item',
            !!currentHeadingSlug &&
              heading.slug === currentHeadingSlug &&
              '!border-orange !text-orange font-bold'
          )}
          on:keypress={() => {
            headingClicked(heading.slug)
          }}
          on:click={() => {
            headingClicked(heading.slug)
          }}
        >
          <a
            data-depth={heading.depth}
            class={c('block py-2 pr-4 no-underline hover:underline lg:py-0 ')}
            style="margin-left: {(heading.depth - lowestHeadingDepth) * 10}px;"
            href={`#${heading.slug}`}
          >
            {heading.text}
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  {#if showContributing}
    <span
      class="ml-[calc(1rem+2px)] mb-2 block px-0 py-0 text-xs text-white/80 lg:relative lg:top-0 lg:w-full lg:text-sm lg:font-bold lg:text-white"
      >Contribute</span
    >

    <ul
      class="duration-50 mb-8 bg-[#0c1421] text-left transition-all lg:pointer-events-auto lg:bg-transparent lg:opacity-100"
      on:transitionend={focusFirstDropdownLink}
    >
      <li class={c('list-item')}>
        <a
          class={c('flex items-center gap-2 py-2 pr-4 no-underline hover:underline lg:py-0')}
          href="https://github.com/threlte/threlte/blob/main/CONTRIBUTING.md"
          referrerpolicy="no-referrer"
          rel="noopener noreferrer"
          target="_blank"
        >
          <svg
            class="icon"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 256 256"
            ><path
              d="M232,64V192a8,8,0,0,1-8,8H160a32,32,0,0,0-32,32,32,32,0,0,0-32-32H32a8,8,0,0,1-8-8V64a8,8,0,0,1,8-8H96a32,32,0,0,1,32,32,32,32,0,0,1,32-32h64A8,8,0,0,1,232,64Z"
              opacity="0.2"
            /><path
              d="M224,48H160a40,40,0,0,0-32,16A40,40,0,0,0,96,48H32A16,16,0,0,0,16,64V192a16,16,0,0,0,16,16H96a24,24,0,0,1,24,24,8,8,0,0,0,16,0,24,24,0,0,1,24-24h64a16,16,0,0,0,16-16V64A16,16,0,0,0,224,48ZM96,192H32V64H96a24,24,0,0,1,24,24V200A39.81,39.81,0,0,0,96,192Zm128,0H160a39.81,39.81,0,0,0-24,8V88a24,24,0,0,1,24-24h64Z"
            /></svg
          >
          Contribution Guide
        </a>
      </li>

      {#if sourceUrl}
        <li class={c('list-item')}>
          <a
            class={c('flex items-center gap-2 py-2 pr-4 no-underline hover:underline lg:py-0')}
            href={sourceUrl}
            referrerpolicy="no-referrer"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              ><path
                d="M208,104v8a48,48,0,0,1-48,48H136a32,32,0,0,1,32,32v40H104V192a32,32,0,0,1,32-32H112a48,48,0,0,1-48-48v-8a49.28,49.28,0,0,1,8.51-27.3A51.92,51.92,0,0,1,76,32a52,52,0,0,1,43.83,24h32.34A52,52,0,0,1,196,32a51.92,51.92,0,0,1,3.49,44.7A49.28,49.28,0,0,1,208,104Z"
                opacity="0.2"
              /><path
                d="M208.3,75.68A59.74,59.74,0,0,0,202.93,28,8,8,0,0,0,196,24a59.75,59.75,0,0,0-48,24H124A59.75,59.75,0,0,0,76,24a8,8,0,0,0-6.93,4,59.78,59.78,0,0,0-5.38,47.68A58.14,58.14,0,0,0,56,104v8a56.06,56.06,0,0,0,48.44,55.47A39.8,39.8,0,0,0,96,192v8H72a24,24,0,0,1-24-24A40,40,0,0,0,8,136a8,8,0,0,0,0,16,24,24,0,0,1,24,24,40,40,0,0,0,40,40H96v16a8,8,0,0,0,16,0V192a24,24,0,0,1,48,0v40a8,8,0,0,0,16,0V192a39.8,39.8,0,0,0-8.44-24.53A56.06,56.06,0,0,0,216,112v-8A58,58,0,0,0,208.3,75.68ZM200,112a40,40,0,0,1-40,40H112a40,40,0,0,1-40-40v-8a41.74,41.74,0,0,1,6.9-22.48A8,8,0,0,0,80,73.83a43.81,43.81,0,0,1,.79-33.58,43.88,43.88,0,0,1,32.32,20.06A8,8,0,0,0,119.82,64h32.35a8,8,0,0,0,6.74-3.69,43.87,43.87,0,0,1,32.32-20.06A43.81,43.81,0,0,1,192,73.83a8.09,8.09,0,0,0,1,7.65A41.76,41.76,0,0,1,200,104Z"
              /></svg
            >
            Go To Source
          </a>
        </li>
      {/if}

      {#if editUrl}
        <li class={c('list-item')}>
          <a
            class={c('flex items-center gap-2 py-2 pr-4 no-underline hover:underline lg:py-0')}
            href={editUrl}
            referrerpolicy="no-referrer"
            rel="noopener noreferrer"
            target="_blank"
          >
            <svg
              class="icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
              ><path
                d="M221.66,90.34,192,120,136,64l29.66-29.66a8,8,0,0,1,11.31,0L221.66,79A8,8,0,0,1,221.66,90.34Z"
                opacity="0.2"
              /><path
                d="M227.31,73.37,182.63,28.68a16,16,0,0,0-22.63,0L36.69,152A15.86,15.86,0,0,0,32,163.31V208a16,16,0,0,0,16,16H92.69A15.86,15.86,0,0,0,104,219.31L227.31,96a16,16,0,0,0,0-22.63ZM92.69,208H48V163.31l88-88L180.69,120ZM192,108.68,147.31,64l24-24L216,84.68Z"
              /></svg
            >
            Edit this page
          </a>
        </li>
      {/if}
    </ul>
  {/if}

  <span
    class="ml-[calc(1rem+2px)] mb-2 block px-0 py-0 text-xs text-white/80 lg:relative lg:top-0 lg:w-full lg:text-sm lg:font-bold lg:text-white"
    >Community</span
  >

  <ul
    class="duration-50 bg-[#0c1421] text-left transition-all lg:pointer-events-auto lg:bg-transparent lg:opacity-100"
    on:transitionend={focusFirstDropdownLink}
  >
    <li class={c('list-item')}>
      <a
        class={c('flex items-center gap-2 py-2 pr-4 no-underline hover:underline lg:py-0')}
        href="http://chat.threlte.xyz"
        referrerpolicy="no-referrer"
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
          ><path
            d="M235.21,185.59l-67,29.7a8.15,8.15,0,0,1-11-4.56L147,183.06a190.5,190.5,0,0,1-19,.94,190.5,190.5,0,0,1-19-.94L98.75,210.73a8.15,8.15,0,0,1-11,4.56l-67-29.7a8,8,0,0,1-4.55-9.24L45.77,60A8.08,8.08,0,0,1,52.31,54l36.06-5.92a8.1,8.1,0,0,1,9.21,6l5,19.63a192.32,192.32,0,0,1,50.88,0l5-19.63a8.1,8.1,0,0,1,9.21-6L203.69,54A8.08,8.08,0,0,1,210.23,60l29.53,116.37A8,8,0,0,1,235.21,185.59Z"
            opacity="0.2"
          /><path
            d="M104,140a12,12,0,1,1-12-12A12,12,0,0,1,104,140Zm60-12a12,12,0,1,0,12,12A12,12,0,0,0,164,128Zm74.45,64.9-67,29.71a16.17,16.17,0,0,1-21.71-9.1l-8.11-22q-6.72.45-13.63.46t-13.63-.46l-8.11,22a16.18,16.18,0,0,1-21.71,9.1l-67-29.71a15.94,15.94,0,0,1-9.06-18.51L38,58A16.08,16.08,0,0,1,51,46.13l36.06-5.92a16.21,16.21,0,0,1,18.26,11.88l3.26,12.83Q118.11,64,128,64t19.4.92l3.26-12.83a16.22,16.22,0,0,1,18.26-11.88L205,46.13A16.08,16.08,0,0,1,218,58l29.53,116.38A15.94,15.94,0,0,1,238.45,192.9ZM232,178.28,202.47,62s0,0-.08,0L166.33,56a.17.17,0,0,0-.17,0l-2.83,11.14c5,.94,10,2.06,14.83,3.42A8,8,0,0,1,176,86.31a8.09,8.09,0,0,1-2.16-.3A172.25,172.25,0,0,0,128,80a172.25,172.25,0,0,0-45.84,6,8,8,0,1,1-4.32-15.4c4.82-1.36,9.78-2.48,14.82-3.42L89.83,56a.21.21,0,0,0-.12,0h0L53.61,61.92a.24.24,0,0,0-.09,0L24,178.33,91,208a.21.21,0,0,0,.22,0L98,189.72a173.2,173.2,0,0,1-20.14-4.32A8,8,0,0,1,82.16,170,171.85,171.85,0,0,0,128,176a171.85,171.85,0,0,0,45.84-6,8,8,0,0,1,4.32,15.41A173.2,173.2,0,0,1,158,189.72L164.75,208a.22.22,0,0,0,.21,0Z"
          /></svg
        >
        Join us on Discord
      </a>
    </li>

    <li class={c('list-item')}>
      <a
        class={c('flex items-center gap-2 py-2 pr-4 no-underline hover:underline lg:py-0')}
        href="https://twitter.com/threlte"
        referrerpolicy="no-referrer"
        rel="noopener noreferrer"
        target="_blank"
      >
        <svg
          class="icon"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="currentColor"
          viewBox="0 0 256 256"
          ><path
            d="M240,72l-32,32c-4.26,66.84-60.08,120-128,120-32,0-40-12-40-12s32-12,48-36c0,0-55.15-32-47.22-120,0,0,39.66,40,87.22,48V88c0-22,18-40.27,40-40a40.74,40.74,0,0,1,36.67,24Z"
            opacity="0.2"
          /><path
            d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.65,48.65,0,0,0,168.1,40a46.87,46.87,0,0,0-33.74,13.7A47.87,47.87,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.3,47.79,9.57,79.77,22,98.18a110.92,110.92,0,0,0,21.89,24.2C61.43,195.2,37.45,204.41,37.2,204.51a8,8,0,0,0-3.85,11.93c.74,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.68,0,129.72-54.42,135.76-124.44l29.9-29.9A8,8,0,0,0,247.39,68.94Zm-45,29.41a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.52-6.25,27.56-17,37.88-32.48a8,8,0,0,0-2.61-11.34c-.13-.08-12.86-7.74-24.48-25.29C54.54,124.11,48,100.38,48,73.09c16,13,45.25,33.18,78.69,38.8A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.89,30.89,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"
          /></svg
        >
        Threlte on Twitter
      </a>
    </li>
  </ul>
</div>

<style lang="postcss">
  .nav-list-item {
    @apply text-faded border-l-2 border-white/20 py-1 pl-4 text-sm hover:border-white/60 hover:text-white;
  }

  .list-item {
    @apply text-faded relative ml-[calc(1rem+2px)] py-1 text-sm hover:text-white;
  }

  .list-item .icon {
    @apply absolute right-full top-1/2 mr-3 h-[16px] w-[16px] -translate-y-1/2;
  }
</style>
