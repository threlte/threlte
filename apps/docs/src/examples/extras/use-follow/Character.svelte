<script lang="ts">
<<<<<<< HEAD
  import { GLTF, useGltfAnimations, type ThrelteGltf } from '@threlte/extras'
=======
  import { GLTF, type ThrelteGltf, useGltfAnimations } from '@threlte/extras'
>>>>>>> main

  interface Props {
    action: 'idle' | 'run' | 'walk'
  }

  let { action = 'idle' }: Props = $props()

<<<<<<< HEAD
  let gltf = $state.raw<ThrelteGltf>()
=======
  let gltf = $state<ThrelteGltf>()
>>>>>>> main

  let { actions } = useGltfAnimations(() => gltf)
  let currentAction = 'idle'

  $effect(() => {
<<<<<<< HEAD
    actions.current?.idle?.play()
=======
    $actions?.idle?.play()
>>>>>>> main
  })

  $effect(() => {
    transitionTo(action, 0.2)
  })

  function transitionTo(next: string, duration = 0.2) {
    const current = actions.current[currentAction]
    const nextAnim = actions.current[next]
    if (!nextAnim || current === nextAnim) return
    nextAnim.enabled = true
    if (current) {
      current.crossFadeTo(nextAnim, duration, true)
    }
    nextAnim.play()
    currentAction = next
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
