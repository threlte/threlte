<script lang="ts">
  import { c } from '$lib/classes'

  export let open = false
  export let id = ''
  let _class = ''
  export { _class as class }
</script>

<details
  bind:open
  {id}
  class={c('block', _class)}
>
  <summary class={c('cursor-pointer select-none list-none font-bold')}>
    <div class="flex flex-row items-center mb-0">
      <slot name="summary" />
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 1 16 16"
          class={c(
            'ml-1 h-[1em] w-[1em] translate-y-px rotate-0 transition-all duration-200',
            open && '-translate-y-px rotate-90'
          )}
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
            class="fill-white"
          />
        </svg>
      </div>
    </div>
  </summary>

  <div class="">
    <slot />
  </div>
</details>

<style>
  details > summary {
    list-style: none;
  }
  details > summary::-webkit-details-marker {
    display: none;
  }
</style>
