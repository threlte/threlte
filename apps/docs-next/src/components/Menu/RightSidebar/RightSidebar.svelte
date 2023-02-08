<script lang="ts">
  import { c } from '$lib/classes'
  import type { MarkdownHeading } from 'astro'
  export let headings: MarkdownHeading[]

  const showHeadingsWithDepth = [2, 3]
  const filteredHeadings = headings.filter((heading) =>
    showHeadingsWithDepth.includes(heading.depth)
  )

  const lowestHeadingDepth = Math.min(...filteredHeadings.map((heading) => heading.depth))

  /*
	ml-[]
	ml-2
	ml-3
	ml-4
	*/
</script>

<div class="flex flex-col text-xs">
  <div class="font-bold mb-2 pl-3 ml-[4px] text-sm">On this page</div>
  <ul>
    {#each filteredHeadings as heading, index}
      <li
        class={c(
          'py-0.5 group border-l-4 border-white/20 pl-3 hover:border-white/60 text-faded hover:text-white',
          index === 2 && 'bg-orange-500 !text-white !border-white/60'
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
