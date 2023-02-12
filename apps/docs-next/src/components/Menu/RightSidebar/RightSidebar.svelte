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
    tocListEnabled = false

    setTimeout(() => {
      tocListEnabled = true
    }, 200)
  }

  let tocListEnabled = true

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
</script>

<div
  class="flex lg:text-sm overflow-visible h-full scrollbar-hide pb-16 relative px-6 lg:px-0 lg:pl-6 gap-6 items-center justify-between mt-4"
>
  <span
    class="absolute lg:relative lg:font-bold px-0 py-0 lg:pl-3 text-xs lg:text-sm block lg:w-full -top-4 lg:top-0 text-white/80 lg:text-white"
    >On this page</span
  >
  <button class="group items-center  cursor-pointer lg:cursor-default justify-between flex w-full">
    <div
      class="hidden group-active:block group-focus:block fixed top-0 left-0 w-full h-full pointer-events-none backdrop-blur-sm -z-10 md:group-active:hidden md:group-focus:hidden
    "
    />
    <div class="flex gap-4 items-center lg:hidden text-base">
      <span class="font-bold">{headings[0] ? headings[0].text : ''} </span>
      <span>{`${currentHeadingIndex > 0 ? `/` : ''}`}</span>
      <span>{`${currentHeadingIndex > 0 ? `${currentHeading?.text}` : ''}`}</span>
    </div>
    <ul
      class={`hidden ${
        tocListEnabled ? 'hover:block ' : ''
      } absolute top-1/2 w-full text-left  lg:block bg-[#0c1421] lg:bg-transparent right-0 px-6 lg:px-0 lg:pl-6 group-active:block group-focus:block
      `}
    >
      {#each filteredHeadings as heading}
        <li
          class={c(
            'py-6 lg:py-0.5 group border-l-[8px] lg:border-l-2 border-white/20 pl-3 hover:border-white/60 text-faded hover:text-white',
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
            class={c('hover:underline pr-4 block no-underline ')}
            style="margin-left: {(heading.depth - lowestHeadingDepth) * 10}px;"
            href={`#${heading.slug}`}>{heading.text}</a
          >
        </li>
      {/each}
    </ul>
  </button>
</div>
