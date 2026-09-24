<script lang="ts">
  import type { Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()

  const uid = $props.id()

  let panels = $state<HTMLElement[]>([])
  let buttons: HTMLButtonElement[] = $state([])
  let selected = $state(0)

  const tabId = (index: number) => `${uid}-tab-${index}`
  const panelId = (index: number) => `${uid}-panel-${index}`

  const collectPanels = (node: HTMLElement) => {
    // The first child is an astro slot, so the panels are the children of that.
    const slot = node.children[0]
    panels = Array.from(slot?.children ?? []).filter((child): child is HTMLElement => {
      return child instanceof HTMLElement
    })

    // Astro renders the panels, so the roles tying them back to their tab are
    // applied here rather than in the markup.
    panels.forEach((panel, index) => {
      panel.id = panelId(index)
      panel.role = 'tabpanel'
      panel.tabIndex = 0
      panel.setAttribute('aria-labelledby', tabId(index))
    })
  }

  $effect(() => {
    panels.forEach((panel, index) => {
      panel.hidden = index !== selected
    })
  })

  const select = (index: number) => {
    selected = index
    buttons[index]?.focus()
  }

  const onkeydown = (event: KeyboardEvent) => {
    const last = panels.length - 1

    switch (event.key) {
      case 'ArrowRight':
        select(selected === last ? 0 : selected + 1)
        break
      case 'ArrowLeft':
        select(selected === 0 ? last : selected - 1)
        break
      case 'Home':
        select(0)
        break
      case 'End':
        select(last)
        break
      default:
        return
    }

    event.preventDefault()
  }
</script>

<!-- `not-content` opts out of the markdown styles that add a top margin to every sibling. -->
<div class="not-content">
  <!-- Rendered only once the panels are known, so the tablist is never empty. -->
  {#if panels.length > 0}
    <div
      role="tablist"
      class="mt-4 flex flex-row items-center gap-2"
      {onkeydown}
    >
      {#each panels as panel, index (index)}
        <button
          bind:this={buttons[index]}
          type="button"
          role="tab"
          id={tabId(index)}
          aria-selected={index === selected}
          aria-controls={panelId(index)}
          tabindex={index === selected ? 0 : -1}
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
  {/if}

  <div
    use:collectPanels
    class:unhydrated={panels.length === 0}
  >
    {@render children()}
  </div>
</div>

<style>
  /**
   * Server-side there are no tab buttons yet, so every panel would render
   * stacked until the island hydrates and hides them. Showing only the first
   * matches the state hydration settles on.
   */
  .unhydrated :global([data-tab-name] ~ [data-tab-name]) {
    display: none;
  }
</style>
