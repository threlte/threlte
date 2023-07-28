<script lang="ts">
  import { Sequence, Sheet } from '@threlte/theatre'
  import FadeOut from '../FadeOut.svelte'
  import { springScrollPos } from '../scrollPos'
  import TheatreTextBox from './TheatreTextBox.svelte'
  import { onMount } from 'svelte'

  let play = false
  onMount(() => {
    const timeout = setTimeout(() => {
      play = true
    }, 1000)
    return () => {
      clearTimeout(timeout)
    }
  })
</script>

<Sheet name="Intro">
  {#if play}
    <Sequence autoplay />
  {/if}
  <FadeOut
    progress={$springScrollPos}
    from={0.3}
    to={0.6}
  >
    <div class="fixed top-0 left-0 mt-[40vh] flex w-screen flex-col items-center justify-center">
      <TheatreTextBox key="mission">
        <div class="text-xl text-white/60">The Mission:</div>
      </TheatreTextBox>

      <TheatreTextBox key="statement">
        <div class="text-4xl font-bold text-white/90">Reimagine 3D</div>
      </TheatreTextBox>
    </div>
  </FadeOut>
</Sheet>
