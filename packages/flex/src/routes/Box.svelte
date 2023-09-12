<script lang="ts">
  import { T } from '@threlte/core'

  export let color: string = 'white'
</script>

<T.Mesh>
  <T.BoxGeometry />
  <T.MeshBasicMaterial {color} />
</T.Mesh>
