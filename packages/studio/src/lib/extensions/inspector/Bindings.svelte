<script lang="ts">
  import { Folder, Textarea } from 'svelte-tweakpane-ui'
  import type { Object3D } from 'three'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte.js'
  import Camera from './bindings/Camera.svelte'
  import Light from './bindings/Light.svelte'
  import Material from './bindings/Material.svelte'
  import Object3DBinding from './bindings/Object3D.svelte'
  import { areCamera, areLight, haveMaterialProperty } from './bindings/utils.js'

  const objectSelection = useObjectSelection()
  const keyFromObjects = (objects: Object3D[]) => {
    return objects.map((object) => object.uuid).join()
  }

  const firstObjectUserData = $derived(
    JSON.stringify(objectSelection.selectedObjects[0].userData, null, 2)
  )

  const objects = $derived(objectSelection.selectedObjects)
</script>

{#if objects.length}
  {#key keyFromObjects(objects)}
    <Object3DBinding {objects} />

    {#if areCamera(objects)}
      <Folder
        title="Camera"
        expanded
      >
        <Camera {objects} />
      </Folder>
    {/if}

    {#if haveMaterialProperty(objects)}
      <Material {objects} />
    {/if}

    {#if areLight(objects)}
      <Light lights={objects} />
    {/if}
  {/key}
{/if}

{#if firstObjectUserData}
  <Folder
    title="User Data"
    expanded={false}
  >
    <Textarea
      value={firstObjectUserData}
      disabled
      rows={5}
    />
  </Folder>
{/if}
