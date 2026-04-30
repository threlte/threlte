<script lang="ts">
  import { CodeXml } from 'lucide-svelte'
  import CodeExplorer from './CodeExplorer.svelte'
  import { fade } from 'svelte/transition'
  import type { Snippet } from 'svelte'
  import { setCodeExampleContext } from './exampleContext.svelte'

  interface Props {
    filePaths: string[]
    exampleBasePath: string
    hidePreview: boolean
    showFile: string | null
    expanded?: boolean
    children: Snippet
  }

  let {
    filePaths,
    hidePreview,
    showFile,
    exampleBasePath,
    children,
    expanded = $bindable(false)
  }: Props = $props()

  let childrenElements: HTMLElement[] = $state([])

  const initialFilePath = showFile
    ? filePaths.includes(showFile)
      ? showFile
      : 'App.svelte'
    : 'App.svelte'
  const initialFileName = initialFilePath.split('/').pop() || 'App.svelte'

  let context = $state({ currentFilePath: initialFileName })
  setCodeExampleContext(context)

  const setChildren = (node: HTMLDivElement) => {
    // the first child in node.children is an astro slot, so we need the children of that
    const firstChild = node.children[0]
    if (firstChild) {
      childrenElements = Array.from(firstChild.children).filter((item): item is HTMLElement => {
        return item instanceof HTMLElement
      })
    }
  }

  $effect(() => {
    const fullPath = `../../examples/${exampleBasePath}/${context.currentFilePath}`
    // hide all children except the one that was selected
    childrenElements.forEach((child) => {
      const elPath = child.dataset.path
      if (!elPath) return

      // path is relative to the root of the example directory
      if (elPath === fullPath) {
        child.style.display = 'block'
      } else {
        child.style.display = 'none'
      }
    })
  })
</script>

<div
  class={[
    'not-content relative flex w-full flex-col items-stretch overflow-hidden rounded-b-md! border-x border-b border-white/20 transition-all duration-700 ease-in-out will-change-[max-height] md:max-h-[80vh] md:flex-row',
    !expanded && 'max-h-[100px]! overflow-hidden',
    hidePreview && 'rounded-md! border-t'
  ]}
>
  {#if !expanded}
    <div
      transition:fade
      class="absolute top-0 left-0 z-10 h-full w-full bg-linear-to-t from-blue-900 to-blue-900/50"
    ></div>
  {/if}
  {#if !expanded}
    <div class="absolute top-0 left-0 flex h-full w-full flex-row items-center justify-center">
      <button
        class="border-orange/10 text-orange z-10 flex flex-row items-center justify-center gap-3 rounded-xs border bg-orange-800/50 px-2 py-1 text-sm backdrop-blur-md hover:bg-orange-800/70 hover:text-orange-400 focus:outline-hidden"
        onclick={() => (expanded = true)}
      >
        <CodeXml class="h-5 w-5" />
        <span>Show Code</span>
      </button>
    </div>
  {/if}
  <CodeExplorer {filePaths} />

  <div
    use:setChildren
    class="flex-1 overflow-x-auto"
  >
    {@render children()}
  </div>
</div>
