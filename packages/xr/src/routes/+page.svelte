<script lang='ts'>

const demos = [
  ['Hands', '/hands'],
  ['Events', '/events'],
  ['Custom controller models', '/models'],
  ['Teleporting', '/teleport'],
  ['Immersive AR', '/ar'],
  ['BonkSaber', '/bonksaber'],
] as const

</script>

<main class='p-4'>
  <h1 class='font-bold text-xl'>Demos</h1>
  {#each demos as [text, href] (href)}
    <a {href} class='block hover:underline'>{text}</a>
  {/each}
</main>
