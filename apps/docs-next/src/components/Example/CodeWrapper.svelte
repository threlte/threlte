<script lang="ts">
  import Tabs, { type Tab, type Tabs as TabsPropType } from '$components/Tabs/Tabs.svelte'
  export let tabs: TabsPropType

  let children: HTMLElement[] = []

  const setChildren = (node: HTMLDivElement) => {
    // the first child in node.children is an astro slot, so we need the children of that
    const firstChild = node.children[0]
    if (firstChild) {
      children = Array.from(firstChild.children).filter((item): item is HTMLElement => {
        return item instanceof HTMLElement
      })
    }
  }

  $: children.forEach((child, index) => {
    if (index > 0) {
      child.style.display = 'none'
    }
  })

  const onSelect = (e: CustomEvent<Tab>) => {
    // find the index of the tab that was selected
    const tabIndex = tabs.findIndex((tab) => tab.id === e.detail.id)

    // hide all children except the one that was selected
    children.forEach((child, index) => {
      if (index === tabIndex) {
        child.style.display = 'block'
      } else {
        child.style.display = 'none'
      }
    })
  }
</script>

<Tabs
  {tabs}
  on:select={onSelect}
/>

<div use:setChildren>
  <slot />
</div>
