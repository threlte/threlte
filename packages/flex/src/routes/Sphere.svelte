<script lang="ts">
  import { T } from '@threlte/core'

  export let color: string = 'white'
</script>

<T.Mesh>
  <T.SphereGeometry />
  <T.MeshBasicMaterial {color} />
</T.Mesh>
