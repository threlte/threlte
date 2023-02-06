<!--
	This test ensures that the preprocessor can handle complex markup.
-->
<script>
  import { T } from '@threlte/core'

  const length = 10
  let yes = true
</script>

<T.PerspectiveCamera />

<T.DirectionalLight />

<T.Mesh>
  <T.MeshStandardMaterial color="red" />
  <T.BoxGeometry args={[1, 1, 5]} />
</T.Mesh>

{#each new Array(length) as _}
  <T.Mesh>
    <T.MeshStandardMaterial />
    <T.BoxGeometry />
  </T.Mesh>
{/each}

{#if yes}
  <T.Mesh>
    <T.MeshStandardMaterial />
    <T.BoxGeometry />
  </T.Mesh>
{/if}
