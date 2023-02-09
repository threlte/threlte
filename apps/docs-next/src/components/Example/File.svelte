<script lang="ts">
  import { c } from '$lib/classes'
  import { getContext } from 'svelte'
  import type { Writable } from 'svelte/store'
  import type { File } from './types'

  export let file: File
  export let currentlySelectedFile: Writable<File>

  $: isSelected = file.path === $currentlySelectedFile.path

  const fileExtension = file.name.split('.').pop()

  const selectFile = getContext('selectFile') as (file: File) => void
</script>

<button
  class={c(
    '[&>*]:w-[1em] flex flex-row items-center gap-1 hover:underline focus:outline-none',
    isSelected && 'bg-orange-800 px-1 -mx-1 rounded-sm py-0.5 -my-0.5'
  )}
  on:click={() => selectFile(file)}
>
  {#if fileExtension === 'ts'}
    <svg
      viewBox="0 0 33 33"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.1 21.4H6.59998"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M8.84998 27.4V21.4"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.6 26.9C15.1417 27.3041 15.7991 27.5232 16.475 27.525C17.6 27.525 18.6 27.15 18.6 25.9C18.6 23.9 14.6 24.775 14.6 22.9C14.6 21.9 15.35 21.275 16.475 21.275C17.1508 21.2768 17.8082 21.4959 18.35 21.9"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M23.6 28.4H25.6C25.8652 28.4 26.1196 28.2946 26.3071 28.1071C26.4946 27.9196 26.6 27.6652 26.6 27.4V11.4L19.6 4.39999H7.59998C7.33477 4.39999 7.08041 4.50535 6.89288 4.69289C6.70534 4.88042 6.59998 5.13478 6.59998 5.39999V16.4"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19.6 4.39999V11.4H26.6"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  {:else if fileExtension === 'svelte'}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      viewBox="0 0 98.1 118"
      xml:space="preserve"
    >
      <path
        d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.5c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.5"
        fill="#ff3e00"
      />
      <path
        d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3.2-.9.4-1.7.6-2.6l.5-1.6 1.4 1c3.3 2.4 6.9 4.2 10.8 5.4l1 .3-.1 1c-.1 1.4.3 2.9 1.1 4.1 1.6 2.3 4.4 3.4 7.1 2.7.6-.2 1.2-.4 1.7-.7L65.5 72c1.4-.9 2.3-2.2 2.6-3.8.3-1.6-.1-3.3-1-4.6-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7l-10.5 6.7c-1.7 1.1-3.6 1.9-5.6 2.4-8.9 2.3-18.2-1.2-23.4-8.7-3.1-4.4-4.4-9.9-3.4-15.3.9-5.2 4.1-9.9 8.6-12.7l27.5-17.5c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.2.9-.4 1.7-.7 2.6l-.5 1.6-1.4-1c-3.3-2.4-6.9-4.2-10.8-5.4l-1-.3.1-1c.1-1.4-.3-2.9-1.1-4.1-1.6-2.3-4.4-3.3-7.1-2.6-.6.2-1.2.4-1.7.7L32.4 46.1c-1.4.9-2.3 2.2-2.6 3.8s.1 3.3 1 4.6c1.6 2.3 4.4 3.3 7.1 2.6.6-.2 1.2-.4 1.7-.7l10.5-6.7c1.7-1.1 3.6-1.9 5.6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3-.9 5.2-4.1 9.9-8.6 12.7l-27.5 17.5c-1.7 1.1-3.6 1.9-5.6 2.5"
        fill="#fff"
      />
    </svg>
  {/if}

  {file.name}
</button>
