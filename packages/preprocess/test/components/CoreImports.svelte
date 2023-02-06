<!--
	This test ensures that the preprocessor can handle additional imports from
	'@threlte/core'.
-->
<script>
  import { T, useFrame } from '@threlte/core'

  useFrame(() => {
    console.log('hello')
  })
</script>

<T.Mesh />
