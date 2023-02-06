<!--
	This test ensures that the preprocessor can handle overlapping imports. If the
	component imports Mesh from 'three', the import should not be added by the
	preprocessor.
-->
<script>
  import { T } from '@threlte/core'
  import { Mesh } from 'three'
</script>

<T.Mesh />
