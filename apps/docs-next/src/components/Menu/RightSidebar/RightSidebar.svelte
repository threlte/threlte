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

  let currentHeadingId: string | undefined = undefined
  let currentHeading: MarkdownHeading | undefined = headings[0]

  $: {
    console.log(headings)
  }

  onMount(() => {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const { id } = entry.target
            currentHeadingId = id

            const newHeading = headings.find((heading) => {
              return heading.slug == id
            })

            currentHeading = newHeading || currentHeading

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
  class="flex flex-row lg:text-xs overflow-visible h-full scrollbar-hide pb-12 relative pl-12 gap-6 items-center"
>
  <button
    class="group btn items-center overflow-hidden cursor-pointer lg:cursor-default justify-between border border-white/70 rounded-md lg:border-none"
  >
    <span class="font-bold mb-2 px-4 lg:px-0 py-2 lg:py-0 lg:pl-3 lg:ml-[4px] text-sm"
      >On this page</span
    >

    <ul
      class="hidden absolute top-1/2 w-1/2 lg:w-full text-left group-active:block group-focus:block lg:block bg-[#0c1421]"
    >
      {#each filteredHeadings as heading}
        <li
          class={c(
            'py-2 lg:py-0.5 group border-l-4 border-white/20 pl-3 hover:border-white/60 text-faded hover:text-white',
            !!currentHeadingId &&
              heading.slug === currentHeadingId &&
              'bg-orange-500 !text-white !border-white/60'
          )}
        >
          <a
            data-depth={heading.depth}
            class={c('hover:underline pr-4 block no-underline')}
            style="margin-left: {(heading.depth - lowestHeadingDepth) * 10}px;"
            href={`#${heading.slug}`}>{heading.text}</a
          >
        </li>
      {/each}
    </ul>
  </button>
  <span class="text-base font-bold lg:hidden">{currentHeading?.text}</span>
</div>
