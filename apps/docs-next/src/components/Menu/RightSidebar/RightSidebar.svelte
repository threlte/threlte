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

  onMount(() => {
    intersectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const { id } = entry.target
            currentHeadingId = id
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

<div class="flex flex-col text-xs overflow-auto h-full scrollbar-hide pb-12">
  <div class="font-bold mb-2 pl-3 ml-[4px] text-sm">On this page</div>
  <ul>
    {#each filteredHeadings as heading}
      <li
        class={c(
          'py-0.5 group border-l-4 border-white/20 pl-3 hover:border-white/60 text-faded hover:text-white',
          !!currentHeadingId &&
            heading.slug === currentHeadingId &&
            'bg-orange-500 !text-white !border-white/60'
        )}
      >
        <a
          data-depth={heading.depth}
          class={c('group-hover:underline pr-4')}
          style="margin-left: {(heading.depth - lowestHeadingDepth) * 10}px;"
          href={`#${heading.slug}`}>{heading.text}</a
        >
      </li>
    {/each}
  </ul>
</div>
