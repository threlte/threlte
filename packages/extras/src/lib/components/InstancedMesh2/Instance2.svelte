<script lang="ts">
  import type { Snippet } from 'svelte'
  import { useInstancedMesh2 } from './InstancedMesh2Context.svelte'
  import { Matrix4, Vector3, type Vector3Like } from 'three'

  // turn to pierced
  type InstanceProps = {
    x?: number
    y?: number
    z?: number
    id?: number
  }

  let { children, x, y, z, id }: InstanceProps & { children?: Snippet } = $props()

  const mesh = useInstancedMesh2()

  $effect(() => {
    if (mesh.ref) {
      mesh.tempV3.set(x ?? 0, y ?? 0, z ?? 0)
      mesh.tempM4.setPosition(mesh.tempV3)

      mesh.ref.setMatrixAt(id ?? 0, mesh.tempM4)
    }
  })
</script>

{@render children?.()}
