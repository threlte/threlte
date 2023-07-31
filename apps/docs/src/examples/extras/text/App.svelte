<script lang="ts">
  import { Canvas } from '@threlte/core'
  import Scene from './Scene.svelte'
  import { useTweakpane } from '../../utils/useTweakpane'

  const { action, addInput } = useTweakpane({
    title: 'Text',
    expanded: false
  })

  const text = addInput({
    label: 'Text',
    value: 'hello world'
  })

  const fontSize = addInput({
    label: 'Font Size',
    value: 1,
    params: {
      step: 0.1,
      min: 0.1,
      max: 2
    }
  })
</script>

<div use:action />

<div class="w-full h-full -z-10 relative bg-orange-500/20">
  <Canvas>
    <Scene
      text={$text}
      fontSize={$fontSize}
    />
  </Canvas>
</div>
