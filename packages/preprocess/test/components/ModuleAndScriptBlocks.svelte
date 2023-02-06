<!--
	This test ensures that the preprocessor can handle components that have a
	context module and a regular script block.
-->
<script context="module">
  import { Mesh } from 'three'
  import { useGltf } from '@threlte/extras'
</script>

<script>
  import { T } from '@threlte/core'
</script>

<T.Mesh />
