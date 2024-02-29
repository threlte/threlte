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

<div class={c('flex w-full flex-row justify-center', _class)}>
  {#each tabs as tab}
    <button
      class={c(
        'text-faded w-full border-b-[5px] border-b-transparent pb-2 font-bold hover:!text-white',
        activeTabId === tab.id && '!border-b-orange !text-white',
        activeTabId !== tab.id && 'border-b-white/20 hover:border-b-white/30'
      )}
      on:click={() => {
        activeTabId = tab.id
        dispatch('select', tab)
      }}
    >
      {tab.title}
    </button>
  {/each}
</div>
