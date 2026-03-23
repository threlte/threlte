<script lang="ts">
  import { PortalTarget, Stars } from '@threlte/extras'
  import Level from './Level.svelte'
  import { level1, level2 } from './levels/levels'
  import { useThrelte } from '@threlte/core'
  import { Color } from 'three'

  const levels = [level1, level2]
  let currentLevelIndex = $state(0)
  const level = $derived(levels[currentLevelIndex])

  const nextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      currentLevelIndex += 1
    }
  }

  const { scene } = useThrelte()

  scene.background = new Color('black')
</script>

<PortalTarget id="scene" />

{#key currentLevelIndex}
  {#if level}
    <Level
      {level}
      levelcomplete={nextLevel}
    />
  {/if}
{/key}

<Stars />
