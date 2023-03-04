<script lang="ts">
  import { T } from '@threlte/core'
  import { Mesh } from 'three'

  const x = 5
</script>

<T
  is={Mesh}
  position.x={10}
/>

<T.Mesh position.x={10} />
