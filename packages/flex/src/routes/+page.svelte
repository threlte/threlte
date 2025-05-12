<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { NoToneMapping } from 'three'
  import { onMount, type ComponentType, type SvelteComponent } from 'svelte'
  import { browser } from '$app/environment'
  import Common from './examples/Common.svelte'

  type Example = {
    name: string
    dom: ComponentType<SvelteComponent>
    domRaw: string
    threlte: ComponentType<SvelteComponent>
    threlteRaw: string
  }

  let selected: string = browser ? sessionStorage.selected || '' : ''
  let components: Example[] = []

  const load = () => {
    const modules = import.meta.glob('./examples/*/*.svelte', { eager: true })
    const rawModules = import.meta.glob('./examples/*/*.svelte', { eager: true, as: 'raw' })
    components = Object.entries(modules).reduce(
      (acc, [key, module]) => {
        const name = key.split('/')[2]
        const isDom = key.includes('Dom')
        const raw = rawModules[key]
        const example = acc.find((e) => e.name === name)
        if (example) {
          if (isDom) {
            example.dom = (module as any).default
            example.domRaw = raw
          } else {
            example.threlte = (module as any).default
            example.threlteRaw = raw
          }
        } else {
          acc.push({
            name,
            dom: isDom ? (module as any).default : undefined,
            domRaw: isDom ? raw : '',
            threlte: isDom ? undefined : (module as any).default,
            threlteRaw: isDom ? '' : raw
          })
        }
        return acc
      },
      [] as unknown as typeof components
    )
    selected ||= components[0].name
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

<nav>
  <select bind:value={selected}>
    {#each components as { name } (name)}
      <option value={name}>{name}</option>
    {/each}
  </select>
</nav>

{#if example}
  <div class="example-view split-view">
    <div class="dom">
      <div class="container">
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

  <div class="split-view">
    <div class="code">
      {example.domRaw}
    </div>

    <div class="code">
      {example.threlteRaw}
    </div>
  </div>
{/if}

<style>
  :global(body) {
    background: #333333;
    margin: 0;
  }

  nav {
    padding: 20px;
  }

  .split-view {
    width: 100vw;
    display: flex;
    flex-direction: row;
  }
  .split-view > * {
    flex: 1;
    width: 100%;
  }

  .split-view > :nth-child(2) {
    border-left: 1px solid white;
  }

  .example-view {
    height: 600px;
  }

  .threlte {
    height: 100%;
    flex: 1;
  }

  .dom {
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .code {
    padding: 20px;
    white-space: pre-wrap;
    color: white;
  }
</style>
