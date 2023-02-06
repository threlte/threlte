<!--
	This test ensures that the preprocessor can handle complex markup.
-->
<script>
  import {
    PerspectiveCamera,
    DirectionalLight,
    Mesh,
    MeshStandardMaterial,
    BoxGeometry,
  } from 'three'
  import { Three } from '@threlte/core'

  const length = 10
  let yes = true
</script>

<Three type={PerspectiveCamera} />

<Three type={DirectionalLight} />

<Three type={Mesh}>
  <Three type={MeshStandardMaterial} color="red" />
  <Three type={BoxGeometry} args={[1, 1, 5]} />
</Three>

{#each new Array(length) as _}
  <Three type={Mesh}>
    <Three type={MeshStandardMaterial} />
    <Three type={BoxGeometry} />
  </Three>
{/each}

{#if yes}
  <Three type={Mesh}>
    <Three type={MeshStandardMaterial} />
    <Three type={BoxGeometry} />
  </Three>
{/if}
