<script lang="ts">
  import { c } from '$lib/classes'

  type Size = 's' | 'm' | 'l'

  export let color: 'orange' | 'blue' | 'green' = 'orange'
  export let href: string | undefined = undefined
  export let size: Size = 'l'
  let _class = ''
  export { _class as class }
  export let glow = false

  const paddings: Record<Size, string> = {
    s: 'px-3 py-1',
    m: 'px-5 py-3',
    l: 'px-7 py-4'
  }
  const textSizes: Record<Size, string> = {
    s: 'text-sm',
    m: 'text-base',
    l: 'text-lg'
  }

  /*
	Leave this in to force tailwind to include classes

	bg-orange
	bg-blue
	bg-green
	hover:bg-orange-400
	hover:bg-blue-400
	hover:bg-green-400
	*/
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:element
  this={href ? 'a' : 'button'}
  on:click
  {href}
  class={c(
    'flex w-fit flex-row gap-3 rounded-md text-center text-white shadow-[inset_0_1px_0_0_hsl(0deg_0%_100%_/_20%)]',
    paddings[size],
    textSizes[size],
    `bg-${color}`,
    `hover:bg-${color}-400`,
    _class
  )}
>
  <div class="empty:hidden"><slot name="icon-before" /></div>
  <slot />
  <div class="empty:hidden"><slot name="icon-after" /></div>
</svelte:element>
