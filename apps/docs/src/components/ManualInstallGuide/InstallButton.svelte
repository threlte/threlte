<script lang="ts">
  interface Props {
    active?: boolean
    passivelyActive?: boolean
    class?: string
    children?: import('svelte').Snippet
    [key: string]: any
  }

  let {
    active = false,
    passivelyActive = false,
    class: _class = '',
    children,
    ...rest
  }: Props = $props()
</script>

<button
  {...rest}
  class={[
    'group flex flex-row items-center justify-start gap-2 rounded-md border border-white/20 px-3 py-1 pr-4',
    active
      ? 'bg-green-500/70 text-white'
      : passivelyActive
        ? 'bg-green-500/20 text-white'
        : 'bg-blue-900 hover:bg-blue-700/30',
    _class
  ]}
>
  {#if active || passivelyActive}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="76"
      height="76"
      class="h-[1.5em] w-auto fill-current group-hover:text-white"
      viewBox="0 0 256 256"
      ><path
        d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
        opacity="0.2"
      /><path
        d="M173.66,98.34a8,8,0,0,1,0,11.32l-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35A8,8,0,0,1,173.66,98.34ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
      /></svg
    >
  {:else}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="76"
      height="76"
      class="h-[1.5em] w-auto fill-current group-hover:text-white"
      viewBox="0 0 256 256"
      ><path
        d="M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z"
        opacity="0.2"
      /><path
        d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"
      /></svg
    >
  {/if}
  <code
    class={[
      'mx-0 bg-transparent px-0',
      active || passivelyActive ? 'text-white' : 'text-faded group-hover:text-white'
    ]}
  >
    {@render children?.()}
  </code>
</button>
