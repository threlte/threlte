<script lang="ts">
  import { Three } from '@threlte/core'

  import { T } from '@threlte/core'
  import { Mesh } from 'three'

  const x = 5
</script>

<T is={Mesh} position.x={10} />

<Three type={Mesh} position.x={10} />
