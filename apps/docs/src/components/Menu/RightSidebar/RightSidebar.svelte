<script lang="ts">
  import { c } from '$lib/classes'
  import type { MarkdownHeading } from 'astro'
  import { onMount } from 'svelte'
  import { onDestroy } from 'svelte'

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
</script>

<div
  class="scrollbar-hide relative h-full w-full overflow-auto px-6 pb-12 pt-6 lg:px-0 lg:pl-6 lg:text-sm"
>
  {#if headings.length}
    <span
      class="mb-3 ml-[calc(1rem+2px)] mt-3 block px-0 py-0 text-xs text-white/80 lg:relative lg:top-0 lg:w-full lg:text-sm lg:font-bold lg:text-white"
      >On this page</span
    >

    <ul
      class="duration-50 mb-8 w-full bg-[#0c1421] text-left transition-all lg:pointer-events-auto lg:bg-transparent lg:opacity-100"
      on:transitionend={focusFirstDropdownLink}
    >
      {#each headings as heading}
        <li
          class={c(
            'nav-list-item text-faded',
            !!currentHeadingSlug &&
              heading.slug === currentHeadingSlug &&
              '!border-orange !text-orange font-bold'
          )}
        >
          <a
            data-depth={heading.depth}
            class="block py-2 pr-4 no-underline hover:underline lg:py-0"
            style="margin-left: {(heading.depth - lowestHeadingDepth) * 10}px;"
            href={`#${heading.slug}`}
            on:keypress={() => {
              headingClicked(heading.slug)
            }}
            on:click={() => {
              headingClicked(heading.slug)
            }}
          >
            {heading.text}
          </a>
        </li>
      {/each}
    </ul>
  {/if}

  <span
    class="mb-2 ml-[calc(1rem+2px)] block px-0 py-0 text-xs text-white/80 lg:relative lg:top-0 lg:w-full lg:text-sm lg:font-bold lg:text-white {headings.length !=
    0
      ? ''
      : 'mt-3'}">Contribute</span
  >

  <ul
    class="duration-50 mb-8 bg-[#0c1421] text-left transition-all lg:pointer-events-auto lg:bg-transparent lg:opacity-100"
    on:transitionend={focusFirstDropdownLink}
  >
    <li class="text-faded list-item">
      <a
        class="flex items-center gap-2 py-2 pr-4 no-underline hover:underline lg:py-0"
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
      <li class="text-faded list-item">
        <a
          class="flex items-center gap-2 py-2 pr-4 no-underline hover:underline lg:py-0"
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
      <li class="text-faded list-item">
        <a
          class="flex items-center gap-2 py-2 pr-4 no-underline hover:underline lg:py-0"
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

  <div class="ml-[-9px]">
    <slot />
  </div>
</div>

<style lang="postcss">
  .nav-list-item {
    @apply border-l-2 border-white/20 py-1 pl-4 text-sm hover:border-white/60 hover:text-white;
  }

  .list-item {
    @apply relative ml-[calc(1rem+2px)] py-1 text-sm hover:text-white;
  }

  .list-item .icon {
    @apply absolute right-full top-1/2 mr-3 h-[16px] w-[16px] -translate-y-1/2;
  }
</style>
