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
  class="flex flex-row-reverse lg:text-xs overflow-visible h-full scrollbar-hide pb-12 relative px-6 lg:px-0 lg:pl-6 gap-6 items-center justify-between "
>
  <button
    class="group btn items-center overflow-hidden cursor-pointer lg:cursor-default justify-between border border-white/70 rounded-md lg:border-none"
    on:blur={(e) => {
      console.log('losing focus', e)
    }}
  >
    <svg
      class="w-10 block lg:hidden"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      ><g
        id="SVGRepo_bgCarrier"
        stroke-width="0"
      /><g
        id="SVGRepo_tracerCarrier"
        stroke-linecap="round"
        stroke-linejoin="round"
      /><g id="SVGRepo_iconCarrier">
        <g id="list">
          <g id="list_2">
            <path
              id="Combined Shape"
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 14H11C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16H9C8.44772 16 8 15.5523 8 15C8 14.4477 8.44772 14 9 14ZM17 14H39C39.5523 14 40 14.4477 40 15C40 15.5523 39.5523 16 39 16H17C16.4477 16 16 15.5523 16 15C16 14.4477 16.4477 14 17 14ZM11 26H9C8.44772 26 8 26.4477 8 27C8 27.5523 8.44772 28 9 28H11C11.5523 28 12 27.5523 12 27C12 26.4477 11.5523 26 11 26ZM17 26H39C39.5523 26 40 26.4477 40 27C40 27.5523 39.5523 28 39 28H17C16.4477 28 16 27.5523 16 27C16 26.4477 16.4477 26 17 26ZM11 20H9C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22H11C11.5523 22 12 21.5523 12 21C12 20.4477 11.5523 20 11 20ZM17 20H31C31.5523 20 32 20.4477 32 21C32 21.5523 31.5523 22 31 22H17C16.4477 22 16 21.5523 16 21C16 20.4477 16.4477 20 17 20ZM11 32H9C8.44772 32 8 32.4477 8 33C8 33.5523 8.44772 34 9 34H11C11.5523 34 12 33.5523 12 33C12 32.4477 11.5523 32 11 32ZM17 32H31C31.5523 32 32 32.4477 32 33C32 33.5523 31.5523 34 31 34H17C16.4477 34 16 33.5523 16 33C16 32.4477 16.4477 32 17 32Z"
              fill="#ffffff"
            />
          </g>
        </g>
      </g></svg
    >

    <ul
      class={`hidden hover:block absolute top-1/2 w-full text-left group-active:block group-focus:block lg:block bg-[#0c1421] right-0 px-6 lg:px-0 lg:pl-6
      `}
    >
      {#each filteredHeadings as heading}
        <li
          class={c(
            'py-6 lg:py-0.5 group border-l-4 border-white/20 pl-3 hover:border-white/60 text-faded hover:text-white',
            !!currentHeadingSlug &&
              heading.slug === currentHeadingSlug &&
              'bg-orange-500 !text-white !border-white/60'
          )}
          on:keypress={() => {
            setCurrentHeading(heading.slug)
          }}
          on:click={() => {
            setCurrentHeading(heading.slug)
          }}
        >
          <a
            data-depth={heading.depth}
            class={c('hover:underline pr-4 block no-underline z-10')}
            style="margin-left: {(heading.depth - lowestHeadingDepth) * 10}px;"
            href={`#${heading.slug}`}>{heading.text}</a
          >
        </li>
      {/each}
    </ul>
  </button>

  <span class="font-bold mb-2 px-0 py-0 pl-3 text-sm hidden lg:block"> On this page </span>
  <div class="flex gap-8 items-center lg:hidden">
    <span class="text-base font-bold">{headings[0] ? headings[0].text : ''} </span>
    <span class="text-sm">{`${currentHeadingIndex > 0 ? `/` : ''}`}</span>
    <span class="text-sm">{`${currentHeadingIndex > 0 ? `${currentHeading?.text}` : ''}`}</span>
  </div>
</div>
