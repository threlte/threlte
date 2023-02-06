<!--
	This test ensures that the preprocessor can handle additional imports from
	'@threlte/core'.
-->
<script>
  import { Mesh } from 'three'
  import { Three } from '@threlte/core'

  import { useFrame } from '@threlte/core'

  useFrame(() => {
    console.log('hello')
  })
</script>

<Three type={Mesh} />
