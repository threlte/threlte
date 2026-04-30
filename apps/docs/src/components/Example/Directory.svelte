<script lang="ts">
  import { ChevronRight, Folder, FolderOpen } from 'lucide-svelte'
  import Self from './Directory.svelte'
  import File from './File.svelte'
  import type { Directory } from './types'

  interface Props {
    directory: Directory
    showDirectoryName?: boolean
    expanded?: boolean
  }

  let { directory, showDirectoryName = true, expanded = $bindable(true) }: Props = $props()

  const sortedFiles = directory.files.sort((a, b) => {
    if (a.type === 'directory' && b.type === 'file') {
      return -1
    } else if (a.type === 'file' && b.type === 'directory') {
      return 1
    } else {
      return a.name.localeCompare(b.name)
    }
  })
</script>

{#if showDirectoryName}
  <button
    class:expanded
    onclick={() => {
      expanded = !expanded
    }}
    class="flex flex-row items-center gap-1 font-bold"
  >
    <div class="*:w-[1em]">
      {#if expanded}
        <FolderOpen />
      {:else}
        <Folder />
      {/if}
    </div>

    {directory.name}
    <ChevronRight
      class={`ml-1 h-[1em] w-[1em] translate-y-px rotate-0 transition-all duration-200 ${expanded ? '-translate-y-px rotate-90' : ''}`}
      aria-hidden="true"
    />
  </button>
{/if}

<ul
  class={[
    'list-none',
    !expanded && 'hidden',
    showDirectoryName && 'ml-1.5 border-l border-white/20 pl-3'
  ]}
>
  {#each sortedFiles as file}
    <li class="my-1 list-outside pl-0">
      {#if file.type === 'directory'}
        <Self directory={file} />
      {:else}
        <File {file} />
      {/if}
    </li>
  {/each}
</ul>
