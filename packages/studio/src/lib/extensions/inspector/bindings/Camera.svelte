<script lang="ts">
  import * as CamerakitPlugin from '@tweakpane/plugin-camerakit'
  import { type OrthographicCamera, type PerspectiveCamera } from 'three'
  import TransactionalBinding from './TransactionalBinding.svelte'
  import { areOfType } from './utils'

  type Props = {
    objects: (PerspectiveCamera | OrthographicCamera)[]
  }

  let { objects }: Props = $props()

  const orthographicKeys = ['bottom', 'left', 'top', 'right'] as const
</script>

<TransactionalBinding
  {objects}
  key="near"
  label="near"
  on:change={() => {
    objects.forEach((object) => {
      object.updateProjectionMatrix()
    })
  }}
/>
<TransactionalBinding
  {objects}
  key="far"
  label="far"
  on:change={() => {
    objects.forEach((object) => {
      object.updateProjectionMatrix()
    })
  }}
/>
<TransactionalBinding
  {objects}
  key="zoom"
  label="zoom"
  options={{
    min: 0,
  }}
  on:change={() => {
    objects.forEach((object) => {
      object.updateProjectionMatrix()
    })
  }}
/>

{#if areOfType(objects, 'isPerspectiveCamera')}
  <TransactionalBinding
    {objects}
    key="fov"
    label="fov"
    plugin={CamerakitPlugin}
    options={{
      view: 'cameraring',
      min: 0,
      max: 180,
      format: (n) => `${n}°`,
    }}
    on:change={() => {
      objects.forEach((object) => {
        object.updateProjectionMatrix()
      })
    }}
  />
  <TransactionalBinding
    {objects}
    key="filmOffset"
    label="filmOffset"
    on:change={() => {
      objects.forEach((object) => {
        object.updateProjectionMatrix()
      })
    }}
  />
  <TransactionalBinding
    {objects}
    key="filmGauge"
    label="filmGauge"
    on:change={() => {
      objects.forEach((object) => {
        object.updateProjectionMatrix()
      })
    }}
  />
{:else if areOfType(objects, 'isOrthographicCamera')}
  {#each orthographicKeys as key (key)}
    <TransactionalBinding
      {objects}
      {key}
      label={key}
      on:change={() => {
        objects.forEach((object) => {
          object.updateProjectionMatrix()
        })
      }}
    />
  {/each}
{/if}
