<script lang="ts">
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
        <svg
          viewBox="0 0 33 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.59998 26.4V8.39999C4.59998 8.13478 4.70534 7.88042 4.89288 7.69289C5.08041 7.50535 5.33477 7.39999 5.59998 7.39999H12.2625C12.4787 7.40088 12.689 7.47097 12.8625 7.59999L16.3375 10.2C16.511 10.329 16.7213 10.3991 16.9375 10.4H25.6C25.8652 10.4 26.1196 10.5054 26.3071 10.6929C26.4946 10.8804 26.6 11.1348 26.6 11.4V14.4"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M4.59998 26.4L8.37498 15.0875C8.44079 14.8875 8.56805 14.7133 8.73863 14.5899C8.90922 14.4664 9.11442 14.4 9.32498 14.4H29.2125C29.3706 14.4 29.5265 14.4375 29.6673 14.5094C29.8081 14.5813 29.9299 14.6856 30.0226 14.8137C30.1153 14.9418 30.1764 15.09 30.2007 15.2463C30.225 15.4025 30.2119 15.5623 30.1625 15.7125L26.6 26.4H4.59998Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      {:else}
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.1125 26H4.92498C4.80351 26 4.68323 25.9761 4.571 25.9296C4.45878 25.8831 4.3568 25.815 4.27091 25.7291C4.18502 25.6432 4.11688 25.5412 4.0704 25.429C4.02391 25.3168 3.99998 25.1965 3.99998 25.075V10H27C27.2652 10 27.5196 10.1054 27.7071 10.2929C27.8946 10.4804 28 10.7348 28 11V25.1125C28 25.3479 27.9065 25.5736 27.74 25.7401C27.5736 25.9065 27.3479 26 27.1125 26Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M3.99998 10V7.00001C3.99998 6.73479 4.10534 6.48044 4.29288 6.2929C4.48041 6.10536 4.73477 6.00001 4.99998 6.00001H11.5875C11.7173 5.99955 11.846 6.02471 11.9661 6.07404C12.0862 6.12338 12.1954 6.19591 12.2875 6.28751L16 10"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      {/if}
    </div>

    {directory.name}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 1 16 16"
      class={[
        'ml-1 h-[1em] w-[1em] translate-y-px rotate-0 transition-all duration-200',
        expanded && '-translate-y-px rotate-90'
      ]}
      aria-hidden="true"
    >
      <path
        fill-rule="evenodd"
        d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
        class="fill-white"
      />
    </svg>
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
