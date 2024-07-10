<script lang="ts">
  import { onDestroy } from 'svelte'
  import { GLTF, useGltfAnimations } from '@threlte/extras'
  import { buttonIdle, buttonWalk, buttonRun } from './state'

  let currentActionKey = 'idle'

  const { gltf, actions } = useGltfAnimations()

  $: $actions[currentActionKey]?.play()

  const unsub1 = buttonIdle.subscribe(() => {
    console.log('transition to idle')
    transitionTo('idle', 0.3)
  })

  const unsub2 = buttonWalk.subscribe(() => {
    console.log('transition to run')
    transitionTo('walk', 0.3)
  })

  const unsub3 = buttonRun.subscribe(() => {
    console.log('transition to run')
    transitionTo('run', 0.3)
  })

  function transitionTo(nextActionKey: string, duration = 1) {
    const currentAction = $actions[currentActionKey]
    const nextAction = $actions[nextActionKey]
    if (!nextAction || currentAction === nextAction) return
    // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
    nextAction.enabled = true
    if (currentAction) {
      currentAction.crossFadeTo(nextAction, duration, true)
    }
    // Not sure why I need this but the source code does not
    nextAction.play()
    currentActionKey = nextActionKey
  }

  onDestroy(() => {
    // We unsubscribe otherwise we'd have old subscriptions still active
    unsub1()
    unsub2()
    unsub3()
  })
</script>

<GLTF
  bind:gltf={$gltf}
  url="https://threejs.org/examples/models/gltf/Xbot.glb"
  onload={(gltf) => console.log('load', gltf)}
/>
