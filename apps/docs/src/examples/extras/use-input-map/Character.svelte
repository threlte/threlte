<script lang="ts">
  import { GLTF, useGltfAnimations } from '@threlte/extras'

  type Props = {
    action: 'idle' | 'run' | 'walk'
  }
  let { action = 'idle' }: Props = $props()

  let { gltf, actions } = useGltfAnimations()
  let currentAction = 'idle'

  $effect(() => {
    $actions?.['idle']?.play()
  })

  $effect(() => {
    transitionTo(action, 0.2)
  })

  function transitionTo(next: string, duration = 0.2) {
    const current = $actions[currentAction]
    const nextAnim = $actions[next]
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
  bind:gltf={$gltf}
  url="https://threejs.org/examples/models/gltf/Xbot.glb"
  oncreate={(scene) => {
    scene.traverse((child) => {
      child.castShadow = true
    })
  }}
/>
