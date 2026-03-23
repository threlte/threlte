<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { NoToneMapping } from 'three'
  import { onMount } from 'svelte'
  import Common from './examples/Common.svelte'

  const browser = typeof window !== 'undefined'

  type Example = {
    name: string
    dom: ConstructorOfATypedSvelteComponent
    threlte: ConstructorOfATypedSvelteComponent
  }

  let selected: string = browser ? sessionStorage.selected || '' : ''
  let components: Example[] = []

  const load = () => {
    const modules = (import.meta as any).glob('./examples/*/*.svelte', { eager: true }) as Record<
      string,
      any
    >
    components = Object.entries(modules).reduce(
      (acc, [key, module]) => {
        const name = key.split('/')[2]
        if (!name) throw new Error(`No name for ${key}`)
        const isDom = key.includes('Dom')
        const example = acc.find((e) => e.name === name)
        if (example) {
          if (isDom) {
            example.dom = (module as any).default
          } else {
            example.threlte = (module as any).default
          }
        } else {
          acc.push({
            name,
            dom: isDom ? (module as any).default : undefined,
            threlte: isDom ? undefined : (module as any).default
          })
        }
        return acc
      },
      [] as unknown as typeof components
    )
    selected ||= components[0]!.name
  }

  onMount(load)

  $: example = components.find((e) => e.name === selected)
  $: if (browser && selected.length) sessionStorage.selected = selected
</script>

<svelte:window
  on:keydown={(event) => {
    if (event.key === 'ArrowLeft') {
      const index = components.findIndex((e) => e.name === selected)
      selected = components[index - 1]?.name || selected
    } else if (event.key === 'ArrowRight') {
      const index = components.findIndex((e) => e.name === selected)
      selected = components[index + 1]?.name || selected
    }
  }}
/>

{#if example}
  <div class="example-view split-view">
    <div class="dom">
      <div>
        <svelte:component this={example.dom} />
      </div>
    </div>

    <div class="threlte">
      <Canvas toneMapping={NoToneMapping}>
        <Common />

        <svelte:component this={example.threlte} />
      </Canvas>
    </div>
  </div>
{/if}

<nav>
  <select bind:value={selected}>
    {#each components as { name }}
      <option value={name}>{name}</option>
    {/each}
  </select>
</nav>

<style>
  :global(body) {
    margin: 0;
  }

  nav {
    padding: 20px;
    position: relative;
  }

  .split-view {
    width: 100vw;
    display: flex;
    flex-direction: row;
  }

  .split-view > * {
    flex: 1;
  }

  .split-view > :nth-child(2) {
    border-left: 1px solid #404550;
  }

  .example-view {
    position: absolute;
    top: 0;
    height: 100vh;
  }

  .threlte {
    height: 100%;
  }

  .dom {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
</style>
