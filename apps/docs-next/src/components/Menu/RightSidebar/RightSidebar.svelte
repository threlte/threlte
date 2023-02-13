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
  class="flex lg:text-sm overflow-visible h-full scrollbar-hide pb-16 relative px-6 lg:px-0 lg:pl-6 gap-6 items-center justify-between mt-4"
>
  <div
    class={`group-active:block absolute top-0 left-0 w-full h-screen pointer-events-none backdrop-blur-sm -z-10 lg:hidden ${
      expanded ? 'block' : 'hidden'
    }`}
  />
  <span
    class="absolute lg:relative lg:font-bold px-0 py-0 lg:pl-3 text-xs lg:text-sm block lg:w-full -top-4 lg:top-0 text-white/80 lg:text-white"
    >On this page</span
  >
  <nav class="lg:hidden w-full">
    <button
      aria-expanded={expanded}
      aria-haspopup="true"
      aria-label="Toggle for table of contents"
      on:click={() => (expanded = !expanded)}
    >
      <div class="flex gap-4 items-center lg:hidden text-base">
        <span class="font-bold">{headings[0] ? headings[0].text : ''} </span>
        <span>{`${currentHeadingIndex > 0 ? `/` : ''}`}</span>
        <span>{`${currentHeadingIndex > 0 ? `${currentHeading?.text}` : ''}`}</span>
      </div>
    </button>
  </nav>

  <ul
    class={`absolute top-1/2 w-full text-left  bg-[#0c1421] lg:bg-transparent right-0 px-6 lg:px-0 lg:pl-6 ${
      expanded ? 'opacity-100' : 'opacity-0 pointer-events-none'
    } transition-all duration-50 lg:opacity-100 lg:pointer-events-auto`}
    on:transitionend={focusFirstDropdownLink}
  >
    {#each filteredHeadings as heading}
      <li
        class={c(
          'lg:py-0.5 border-l-[8px] lg:border-l-2 border-white/20 pl-3 hover:border-white/60 text-faded hover:text-white',
          !!currentHeadingSlug &&
            heading.slug === currentHeadingSlug &&
            'bg-orange-500 !text-white !border-white/60 glow-orange'
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
          class={c('hover:underline pr-4 block no-underline py-6 lg:py-0 ')}
          style="margin-left: {(heading.depth - lowestHeadingDepth) * 10}px;"
          href={`#${heading.slug}`}>{heading.text}</a
        >
      </li>
    {/each}
  </ul>
</div>
