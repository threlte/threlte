<script lang="ts">
  import { GLTF, useGltfAnimations, type ThrelteGltf } from '@threlte/extras'

  interface Props {
    action: 'idle' | 'run' | 'walk'
  }

  let { action = 'idle' }: Props = $props()

  let gltf = $state.raw<ThrelteGltf>()

  let { actions } = useGltfAnimations(() => gltf)
  let currentAction = 'idle'

  $effect(() => {
    actions.current?.idle?.play()
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
