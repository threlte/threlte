<script lang="ts">
  import type { Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()

  let panels = $state<HTMLElement[]>([])
  let selected = $state(0)

  const collectPanels = (node: HTMLElement) => {
    // The first child is an astro slot, so the panels are the children of that.
    const slot = node.children[0]
    panels = Array.from(slot?.children ?? []).filter((child): child is HTMLElement => {
      return child instanceof HTMLElement
    })
  }

  $effect(() => {
    panels.forEach((panel, index) => {
      panel.hidden = index !== selected
    })
  })
</script>

<!-- `not-content` opts out of the markdown styles that add a top margin to every sibling. -->
<div class="not-content">
  <div
    role="tablist"
    class="mt-4 flex flex-row items-center gap-2"
  >
    {#each panels as panel, index (index)}
      <button
        type="button"
        role="tab"
        aria-selected={index === selected}
        class={[
          'cursor-pointer rounded-xs border border-transparent px-2 py-1 text-sm transition-colors focus:outline-hidden',
          index === selected
            ? 'border-orange/5 text-orange bg-orange-800/50'
            : 'text-faded hover:text-white'
        ]}
        onclick={() => (selected = index)}
      >
        {panel.dataset.tabName}
      </button>
    {/each}
  </div>

  <div use:collectPanels>
    {@render children()}
  </div>
</div>
