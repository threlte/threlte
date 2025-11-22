<script lang="ts">
  type Size = 's' | 'm' | 'l'

  interface Props {
    color?: 'orange' | 'blue' | 'green'
    href?: string | undefined
    size?: Size
    class?: string
    children?: import('svelte').Snippet
  }

  let {
    color = 'orange',
    href = undefined,
    size = 'l',
    class: _class = '',
    children
  }: Props = $props()

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

  const bgColors: Record<string, string> = {
    orange: 'bg-orange hover:bg-orange-400',
    blue: 'bg-blue hover:bg-blue-400',
    green: 'bg-green hover:bg-green-400'
  }

  const extras = `${paddings[size]} ${textSizes[size]} ${bgColors[color]} ${_class}`
</script>

<a
  {href}
  class={`flex w-fit flex-row gap-3 rounded-md text-center text-white ${extras}`}
>
  {@render children?.()}
</a>
