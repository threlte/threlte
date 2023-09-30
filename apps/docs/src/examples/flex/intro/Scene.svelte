<script lang="ts">
  import { Box } from '@threlte/flex'
  import Matcap from './Matcap.svelte'
  import Window from './Window.svelte'
  import { matcaps } from './matcaps'

  export let windowWidth: number
  export let windowHeight: number

  // make rows
  const matcapsPerRow = 5

  const rows: string[][] = []
  for (let i = 0; i < matcaps.length; i += matcapsPerRow) {
    rows.push(matcaps.slice(i, i + matcapsPerRow))
  }
</script>

<Window
  title="Matcaps"
  width={windowWidth}
  height={windowHeight}
>
  <Box class="h-full w-full flex-col items-stretch gap-10 p-10">
    {#each rows as row}
      <Box class="h-auto w-full flex-1 items-center justify-evenly gap-10">
        {#each row as item}
          <Box
            class="h-full w-full flex-1"
            let:width
            let:height
          >
            <Matcap
              z={10}
              radius={Math.min(width, height) / 2}
              matcapUrl={item}
            />
          </Box>
        {/each}
      </Box>
    {/each}
  </Box>
</Window>
