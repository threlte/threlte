<script lang="ts">
  import { c } from '$lib/classes'
  import type { MarkdownHeading } from 'astro'
  import { onMount } from 'svelte'
  import { onDestroy } from 'svelte'
  export let headings: MarkdownHeading[]

  const showHeadingsWithDepth = [2, 3]
  const filteredHeadings = headings.filter((heading) =>
    showHeadingsWithDepth.includes(heading.depth)
  )

  const lowestHeadingDepth = Math.min(...filteredHeadings.map((heading) => heading.depth))

  let intersectionObserver: IntersectionObserver | undefined = undefined

  let currentHeadingSlug: string | undefined = undefined
  let currentHeadingIndex: number = 0
  let currentHeading: MarkdownHeading | undefined = headings[0]

  const setCurrentHeading = (id: string) => {
    currentHeadingSlug = id

    const newHeadingIndex = headings.findIndex((heading) => {
      return heading.slug == id
    })

    currentHeadingIndex = newHeadingIndex
    currentHeading = headings[newHeadingIndex] || currentHeading
  }

  const headingClicked = (slug: string) => {
    setCurrentHeading(slug)
    setTimeout(() => {
      expanded = false
    }, 30)
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
        // Negative bottom margin means heading needs to be towards top of viewport to trigger intersection.
        rootMargin: '-100px 0% -66%',
        threshold: 1
      }
    )

    document
      .querySelectorAll(
        `article :is(${filteredHeadings.map((heading) => `h${heading.depth}`).join(',')})`
      )
      .forEach((h) => intersectionObserver?.observe(h))
  })

  onDestroy(() => {
    intersectionObserver?.disconnect()
  })

  let expanded = false

  const focusFirstDropdownLink = ({ target }: any) => {
    target.firstElementChild.focus()
  }
</script>

<div
  class="scrollbar-hide relative mt-4 flex h-full items-center justify-between gap-6 overflow-visible px-6 pb-12 lg:px-0 lg:pl-6 lg:text-sm"
>
  <div
    class={`absolute top-0 left-0 -z-10 h-screen w-full backdrop-blur-sm group-active:block lg:hidden ${
      expanded ? 'block' : 'hidden'
    }`}
    on:click={() => (expanded = false)}
    on:keypress={() => (expanded = false)}
  />
  <span
    class="absolute -top-4 block px-0 py-0 text-xs text-white/80 lg:relative lg:top-0 lg:w-full lg:pl-3 lg:text-sm lg:font-bold lg:text-white"
    >On this page</span
  >

  <ul
    class={`absolute top-1/2 right-0 w-full  bg-[#0c1421] px-6 text-left lg:bg-transparent lg:px-0 lg:pl-6 ${
      expanded ? 'opacity-100' : 'pointer-events-none opacity-0'
    } duration-50 transition-all lg:pointer-events-auto lg:opacity-100`}
    on:transitionend={focusFirstDropdownLink}
  >
    {#each filteredHeadings as heading}
      <li
        class={c(
          'text-faded border-l-2 border-white/20 pl-3 hover:border-white/60 hover:text-white lg:py-0.5',
          !!currentHeadingSlug &&
            heading.slug === currentHeadingSlug &&
            'glow-orange !border-white/60 bg-orange-500 !text-white'
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
          href={`#${heading.slug}`}>{heading.text}</a
        >
      </li>
    {/each}
  </ul>
</div>
