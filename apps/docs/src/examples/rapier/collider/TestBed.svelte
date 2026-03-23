<script lang="ts">
  import type { Snippet } from 'svelte'
  import { T } from '@threlte/core'
  import { HTML } from '@threlte/extras'
  import { AutoColliders } from '@threlte/rapier'
  import { BoxGeometry, MeshStandardMaterial, MathUtils } from 'three'

  interface Props {
    title: string
    useGround?: boolean
    text?: Snippet
    children?: Snippet
  }

  let { title, useGround = true, text, children }: Props = $props()
</script>

{#if useGround}
  <T.Group position={[1, -0.5, 0]}>
    <AutoColliders shape={'cuboid'}>
      <T.Mesh
        receiveShadow
        geometry={new BoxGeometry(12, 1, 10)}
        material={new MeshStandardMaterial()}
      />
    </AutoColliders>
  </T.Group>
{/if}

<HTML
  transform
  rotation.z={90 * MathUtils.DEG2RAD}
  rotation.x={-90 * MathUtils.DEG2RAD}
  position.x={5.8}
  pointerEvents={'none'}
  scale={0.6}
>
  <div class="w-[500px] -translate-y-1/2 transform text-black">
    <h2>{title}</h2>
    <div class="leading-normal">
      {@render text?.()}
    </div>
  </div>
</HTML>

{@render children?.()}
