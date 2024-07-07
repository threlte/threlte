<script lang="ts">
  import { T } from '@threlte/core'
  import { PortalTarget } from '@threlte/extras'
  import Level from './Level.svelte'
  import { level1, level2 } from './levels/levels'

  const levels = [level1, level2]
  let currentLevelIndex = $state(0)
  const level = $derived(levels[currentLevelIndex])

  const nextLevel = () => {
    if (currentLevelIndex < levels.length - 1) {
      currentLevelIndex += 1
    }
  }
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

<T.AmbientLight />
<T.DirectionalLight
  position={[4, 10, 0]}
  castShadow
  shadow.mapSize={1024}
  shadow.camera.left={-10}
  shadow.camera.right={10}
  shadow.camera.top={10}
  shadow.camera.bottom={-10}
/>
