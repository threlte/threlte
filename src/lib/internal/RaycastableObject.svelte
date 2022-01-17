<script lang="ts">
  import { onDestroy } from 'svelte'
  import type { Object3D } from 'three'
  import { useThrelte } from '../hooks/useThrelte'
  import { useThrelteRoot } from '../hooks/useThrelteRoot'

  export let object: Object3D

  const { render } = useThrelte()

  const { addRaycastableObject, removeRaycastableObject } = useThrelteRoot()
  addRaycastableObject(object)
  render('RaycastableObject: added')

  onDestroy(() => {
    removeRaycastableObject(object)
    render('RaycastableObject: removed')
  })
</script>
