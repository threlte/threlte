<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useInstancedMesh2 } from './InstancedMesh2Context.svelte'

  // todo
  import { interactivityEventNames } from '../../interactivity/plugin'
  import type { ColorRepresentation } from 'three'

  // todo turn to pierced (measureperf impact)
  type InstanceProps = {
    x?: number
    y?: number
    z?: number
    id: number
    rotation?: [x: number, y: number, z: number, w: number]
    scale?: [x: number, y: number, z: number]
    visibility?: boolean
    color?: ColorRepresentation
  }

  let {
    children,
    color,
    x,
    y,
    z,
    id,
    rotation,
    scale,
    visibility,
    ...rest
  }: InstanceProps & { children?: Snippet } = $props()

  const mesh = useInstancedMesh2()

  $effect.pre(() => {
    if (!rest) return
    // todo perf
    for (let i = 0; i < interactivityEventNames.length; i++) {
      if (rest[interactivityEventNames[i]]) {
        mesh.registerEvent(id, interactivityEventNames[i], rest[interactivityEventNames[i]])
      }
    }
    // todo unregister
  })

  // MATRIX4
  // todo bench effect performance impact and different ways of updating m4
  $effect.pre(() => {
    if (!mesh.ref) return

    mesh.tempPositionV3.set(x ?? 0, y ?? 0, z ?? 0)

    if (rotation) {
      mesh.tempQuat.set(rotation[0], rotation[1], rotation[2], rotation[3])
    } else {
      mesh.tempQuat.set(0, 0, 0, 0)
    }

    if (scale) {
      mesh.tempScaleV3.set(scale[0], scale[1], scale[2])
    } else {
      mesh.tempScaleV3.set(1, 1, 1)
    }

    mesh.tempM4.compose(mesh.tempPositionV3, mesh.tempQuat, mesh.tempScaleV3)
    mesh.ref.setMatrixAt(id ?? 0, mesh.tempM4)
  })

  // VISIBILITY
  $effect.pre(() => {
    if (!mesh.ref) return
    if (visibility !== undefined) {
      mesh.ref.setVisibilityAt(id, visibility)
    }
  })

  // COLOR
  $effect.pre(() => {
    if (!mesh.ref) return
    if (color) mesh.ref.setColorAt(id, color)
  })
</script>

{@render children?.()}
