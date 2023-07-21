<script lang='ts'>

import '../app.css'

const links = [
  ['threlte-xr', '/'],
  ['github', 'https://github.com/michealparks/threlte-xr']
] as const

</script>

<nav class='bg-gray-100 p-2 flex gap-2'>
  {#each links as [text, href] (href)}
    <a
      {href}
      target={href.startsWith('http') ? '_tab' : '_self'}
      class='hover:underline'
    >{text}</a>
  {/each}
</nav>

<div class='h-[calc(100vh-40px)]'>
  <slot />
</div>
