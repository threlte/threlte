<script lang="ts">
  import type { File } from './types'

  import CodeExplorer from './CodeExplorer.svelte'
  import { writable, Writable } from 'svelte/store'

  let children: HTMLElement[] = []

  export let filePaths: string[]

  const onFileSelected = (file: File) => {
    const path = file.path

    // hide all children except the one that was selected
    children.forEach((child) => {
      const elPath = child.dataset.path
      if (!elPath) return

      // path is relative to the root of the example directory
      if (elPath.endsWith(path)) {
        child.style.display = 'block'
      } else {
        child.style.display = 'none'
      }
    })

    currentlySelectedFile.set(file)
  }

  const currentlySelectedFile: Writable<File> = writable({
    name: 'App.svelte',
    path: 'App.svelte',
    type: 'file'
  })

  const setChildren = (node: HTMLDivElement) => {
    // the first child in node.children is an astro slot, so we need the children of that
    const firstChild = node.children[0]
    if (firstChild) {
      children = Array.from(firstChild.children).filter((item): item is HTMLElement => {
        return item instanceof HTMLElement
      })
    }
    onFileSelected({
      name: 'App.svelte',
      path: 'App.svelte',
      type: 'file'
    })
  }
</script>

<div class="not-prose flex md:max-h-[80vh] w-full flex-col md:flex-row items-stretch">
  <CodeExplorer
    {currentlySelectedFile}
    class="overflow-y-auto md:rounded-bl-md border-x md:border-r-0 border-b border-white/20 px-4 py-3 max-md:flex-shrink-0"
    {filePaths}
    on:fileSelected={(e) => {
      onFileSelected(e.detail)
    }}
  />

  <div
    use:setChildren
    class="flex-1 overflow-x-auto"
  >
    <slot />
  </div>
</div>
