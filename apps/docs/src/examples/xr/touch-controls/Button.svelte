<script lang="ts">
  import { T } from '@threlte/core'
  import { Spring } from 'svelte/motion'
  import { Mesh } from 'three'

  let hovering = $state({ left: false, right: false })
  let pressed = $state({ left: false, right: false })

  const isHovered = $derived(hovering.left || hovering.right)
  const isPressed = $derived(pressed.left || pressed.right)

  let { color, ...rest } = $props()

  const pressDepth = 0.03

  const press = new Spring(0)

  const mesh = new Mesh()

  $effect(() => {
    mesh.position.z = (rest.position.z ?? 0) - press.current * pressDepth
  })
</script>

<T
  is={mesh}
  onpointerenter={((event: { handedness: 'left' }) => {
    hovering[event.handedness] = true
  }) as any}
  onpointerleave={((event: { handedness: 'left' }) => {
    hovering[event.handedness] = false
  }) as any}
  onpointerdown={((event: { handedness: 'left' }) => {
    pressed[event.handedness] = true
    press.set(1)
  }) as any}
  onpointerup={((event: { handedness: 'left' }) => {
    pressed[event.handedness] = false
    if (!isPressed) press.set(0)
  }) as any}
  {...rest}
>
  <T.BoxGeometry args={[0.08, 0.08, 0.04]} />
  <T.MeshStandardMaterial
    {color}
    emissive={color}
    emissiveIntensity={isHovered ? 0.4 : 0.1}
  />
</T>
