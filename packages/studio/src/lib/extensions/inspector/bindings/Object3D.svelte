<script lang="ts">
  import { Object3D } from 'three'
  import { DEG2RAD, RAD2DEG } from 'three/src/math/MathUtils.js'
  import { useSnapping } from '../../snapping/useSnapping.svelte.js'
  import TransactionalBinding from './TransactionalBinding.svelte'
  import { haveProperty } from './utils.js'

  type Props = {
    objects: Object3D[]
  }

  let { objects }: Props = $props()

  const snapping = useSnapping()
</script>

{#if haveProperty(objects, 'visible')}
  <TransactionalBinding
    {objects}
    key="visible"
    label="visible"
  />
{/if}

<TransactionalBinding
  {objects}
  key="position"
  label="position"
  autoUpdate
  options={{
    step: snapping.enabled ? snapping.translate : undefined
  }}
/>

<TransactionalBinding
  {objects}
  key="rotation"
  label="rotation"
  autoUpdate
  transform={{
    read(value) {
      return value.set(value.x * RAD2DEG, value.y * RAD2DEG, value.z * RAD2DEG)
    },
    write(value) {
      return value.set(value.x * DEG2RAD, value.y * DEG2RAD, value.z * DEG2RAD)
    }
  }}
  options={{
    format: (n: number) => `${n}°`,
    step: snapping.enabled ? snapping.rotate : undefined
  }}
/>

<TransactionalBinding
  {objects}
  key="scale"
  label="scale"
  autoUpdate
/>

{#if haveProperty(objects, 'isMesh') || haveProperty(objects, 'isPointLight') || haveProperty(objects, 'isSpotLight') || haveProperty(objects, 'isDirectionalLight')}
  <TransactionalBinding
    {objects}
    key="castShadow"
    label="castShadow"
  />
{/if}

{#if haveProperty(objects, 'isMesh')}
  <TransactionalBinding
    {objects}
    key="receiveShadow"
    label="receiveShadow"
  />
{/if}

<TransactionalBinding
  {objects}
  key="frustumCulled"
  label="frustumCulled"
/>
<TransactionalBinding
  {objects}
  key="matrixAutoUpdate"
  label="matrixAutoUpdate"
/>
<TransactionalBinding
  {objects}
  key="matrixWorldAutoUpdate"
  label="matrixWorldAutoUpdate"
/>
<TransactionalBinding
  {objects}
  key="renderOrder"
  label="renderOrder"
  options={{ step: 1 }}
/>
