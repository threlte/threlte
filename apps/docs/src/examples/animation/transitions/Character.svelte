<script lang="ts">
  import { GLTF, useGltfAnimations } from '@threlte/extras'
  import type { CharacterActions } from './types'

  type Props = {
    actionKey: CharacterActions
  }
  let { actionKey = 'idle' }: Props = $props()

  let { gltf, actions } = useGltfAnimations()
  let currentActionKey: CharacterActions = 'idle'

  $effect(() => {
    // This effect acts like an init default pose
    $actions?.['idle']?.play()
  })

  $effect(() => {
    transitionTo(actionKey, 0.3)
  })

  function transitionTo(actionKey: CharacterActions, duration = 1) {
    const currentAction = $actions[currentActionKey]
    const nextAction = $actions[actionKey]
    if (!nextAction || currentAction === nextAction) return
    // Function inspired by: https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
    nextAction.enabled = true
    if (currentAction) {
      currentAction.crossFadeTo(nextAction, duration, true)
    }
    // Not sure why I need this but the source code does not
    nextAction.play()
    currentActionKey = actionKey
  }
</script>

<GLTF
  bind:gltf={$gltf}
  url="https://threejs.org/examples/models/gltf/Xbot.glb"
  oncreate={(scene) => {
    scene.traverse((child) => {
      child.castShadow = true
    })
  }}
/>
