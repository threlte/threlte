<!--
	This test ensures that the preprocessor can handle components that only have a
	context module.
-->
<script context="module">
  import { Mesh } from 'three'
  import { Three } from '@threlte/core'
</script>

<Three type={Mesh} />
