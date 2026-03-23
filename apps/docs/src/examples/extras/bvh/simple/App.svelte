<script lang="ts">
  import Scene from './Scene.svelte'
  import { Canvas } from '@threlte/core'
  import { type BVHOptions, BVHSplitStrategy } from '@threlte/extras'
  import { Pane, Checkbox, List, Slider } from 'svelte-tweakpane-ui'

  let options = $state<Required<BVHOptions> & { helper: boolean }>({
    enabled: true,
    helper: true,
    strategy: BVHSplitStrategy.SAH,
    indirect: false,
    verbose: false,
    maxDepth: 20,
    maxLeafTris: 10,
    setBoundingBox: true
  })
</script>

<Pane
  title="bvh"
  position="fixed"
>
  <Checkbox
    label="enabled"
    bind:value={options.enabled}
  />
  <Checkbox
    label="helper"
    bind:value={options.helper}
  />
  <Checkbox
    label="setBoundingBox"
    bind:value={options.setBoundingBox}
  />
  <List
    bind:value={options.strategy}
    label="strategy"
    options={{
      SAH: BVHSplitStrategy.SAH,
      CENTER: BVHSplitStrategy.CENTER,
      AVERAGE: BVHSplitStrategy.AVERAGE
    }}
  />
  <Slider
    label="maxDepth"
    bind:value={options.maxDepth}
    step={1}
  />
  <Slider
    label="maxLeafTris"
    bind:value={options.maxLeafTris}
    step={1}
  />
</Pane>

<Canvas>
  <Scene {...options} />
</Canvas>
