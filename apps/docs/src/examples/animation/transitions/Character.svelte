<script lang="ts">
  import { GLTF, useGltfAnimations, type ThrelteGltf } from '@threlte/extras'
  import type { CharacterActions } from './types'

  interface Props {
    actionKey: CharacterActions
  }

  let { actionKey = 'idle' }: Props = $props()

  let gltf = $state.raw<ThrelteGltf>()

  let { actions } = useGltfAnimations(() => gltf)

  let currentActionKey: CharacterActions = 'idle'

  $effect(() => {
    // This effect acts like an init default pose
    actions.current.idle?.play()
  })

  $effect(() => {
    transitionTo(actionKey, 0.3)
  })

  // https://github.com/mrdoob/three.js/blob/master/examples/webgl_animation_skinning_blending.html
  function transitionTo(actionKey: CharacterActions, duration = 1) {
    const currentAction = actions.current[currentActionKey]
    const nextAction = actions.current[actionKey]
    if (!nextAction || currentAction === nextAction) return
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
  bind:gltf
  url="https://threejs.org/examples/models/gltf/Xbot.glb"
  oncreate={(scene) => {
    scene.traverse((child) => {
      child.castShadow = true
    })
  }}
/>
