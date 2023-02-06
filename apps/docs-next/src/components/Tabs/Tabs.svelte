<script
  lang="ts"
  context="module"
>
  export type Tab = {
    title: string
    id: string
  }

  export type Tabs = Tab[]
</script>

<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  import { c } from '$lib/classes'

  export let tabs: Tabs
  export let activeTabId: (typeof tabs)[number]['id'] = tabs[0]!.id

  const dispatch = createEventDispatcher<{
    select: Tab
  }>()

  let _class = ''
  export { _class as class }
</script>

<div class={c('w-full', _class)}>
  {#each tabs as tab}
    <button
      class={c('border-b-2 border-b-transparent', activeTabId === tab.id && 'border-b-black')}
      on:click={() => {
        activeTabId = tab.id
        dispatch('select', tab)
      }}>{tab.title}</button
    >
  {/each}
</div>
