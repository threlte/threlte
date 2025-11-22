<script lang="ts">
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
    'not-content rounded-b-md! relative flex w-full flex-col items-stretch overflow-hidden border-x border-b border-white/20 transition-all duration-700 ease-in-out will-change-[max-height] md:max-h-[80vh] md:flex-row',
    !expanded && 'max-h-[100px]! overflow-hidden',
    hidePreview && 'rounded-md! border-t'
  ]}
>
  {#if !expanded}
    <div
      transition:fade
      class="bg-linear-to-t absolute left-0 top-0 z-10 h-full w-full from-blue-900 to-blue-900/50"
    ></div>
  {/if}
  {#if !expanded}
    <div class="absolute left-0 top-0 flex h-full w-full flex-row items-center justify-center">
      <button
        class="rounded-xs border-orange/10 text-orange focus:outline-hidden z-10 flex flex-row items-center justify-center gap-3 border bg-orange-800/50 px-2 py-1 text-sm backdrop-blur-md hover:bg-orange-800/70 hover:text-orange-400"
        onclick={() => (expanded = true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="76"
          height="76"
          viewBox="0 0 256 256"
          class="h-5 w-5 fill-current"
        >
          <path
            d="M240,128l-48,40H64L16,128,64,88H192Z"
            opacity="0.2"
          />
          <path
            d="M69.12,94.15,28.5,128l40.62,33.85a8,8,0,1,1-10.24,12.29l-48-40a8,8,0,0,1,0-12.29l48-40a8,8,0,0,1,10.24,12.3Zm176,27.7-48-40a8,8,0,1,0-10.24,12.3L227.5,128l-40.62,33.85a8,8,0,1,0,10.24,12.29l48-40a8,8,0,0,0,0-12.29ZM162.73,32.48a8,8,0,0,0-10.25,4.79l-64,176a8,8,0,0,0,4.79,10.26A8.14,8.14,0,0,0,96,224a8,8,0,0,0,7.52-5.27l64-176A8,8,0,0,0,162.73,32.48Z"
          />
        </svg>
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
