<script lang="ts">
  type Size = 's' | 'm' | 'l'

  export let color: 'orange' | 'blue' | 'green' = 'orange'
  export let href: string
  export let size: Size = 'l'
  let _class = ''
  export { _class as class }

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

  const extras = `${paddings[size]} ${textSizes[size]} bg-${color} hover:bg-${color}-400 ${_class}`
</script>

<a
  {href}
  class={`flex w-fit flex-row gap-3 rounded-md text-center text-white ${extras}`}
>
  <div class="empty:hidden"><slot name="icon-before" /></div>
  <slot />
  <div class="empty:hidden"><slot name="icon-after" /></div>
</a>
