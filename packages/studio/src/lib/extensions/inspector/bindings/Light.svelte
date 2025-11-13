<script lang="ts">
  import { Folder } from 'svelte-tweakpane-ui'
  import type {
    AmbientLight,
    DirectionalLight,
    HemisphereLight,
    PointLight,
    RectAreaLight,
    SpotLight
  } from 'three'
  import Shadow from './Shadow.svelte'
  import TransactionalBinding from './TransactionalBinding.svelte'
  import { haveProperty } from './utils.js'

  type Props = {
    lights: (
      | AmbientLight
      | DirectionalLight
      | PointLight
      | SpotLight
      | HemisphereLight
      | RectAreaLight
    )[]
  }

  let { lights }: Props = $props()

  const filterUndefined = <T>(value: T | undefined): value is T => value !== undefined
</script>

<Folder
  title="Light"
  expanded
>
  <TransactionalBinding
    objects={lights}
    key="color"
    label="color"
    options={{ color: { type: 'float' } }}
  />

  <TransactionalBinding
    objects={lights}
    key="intensity"
    label="intensity"
    options={{ step: 0.01, min: 0 }}
  />

  {#if haveProperty(lights, 'isDirectionalLight')}
    <TransactionalBinding
      objects={lights}
      key="target.position"
      label="target"
    />
  {:else if haveProperty(lights, 'isPointLight')}
    <TransactionalBinding
      objects={lights}
      key="decay"
      label="decay"
    />
    <TransactionalBinding
      objects={lights}
      key="distance"
      label="distance"
    />
    <TransactionalBinding
      objects={lights}
      key="power"
      label="power"
    />
  {:else if haveProperty(lights, 'isSpotLight')}
    <TransactionalBinding
      objects={lights}
      key="target.position"
      label="target"
    />
    <TransactionalBinding
      objects={lights}
      key="angle"
      label="angle"
      options={{ min: 0, max: Math.PI / 2 }}
    />
    <TransactionalBinding
      objects={lights}
      key="decay"
      label="decay"
    />
    <TransactionalBinding
      objects={lights}
      key="distance"
      label="distance"
    />
    <TransactionalBinding
      objects={lights}
      key="penumbra"
      label="penumbra"
      options={{ min: 0, max: 1 }}
    />
    <TransactionalBinding
      objects={lights}
      key="power"
      label="power"
    />
  {:else if haveProperty(lights, 'isHemisphereLight')}
    <TransactionalBinding
      objects={lights}
      key="groundColor"
      label="groundColor"
    />
  {:else if haveProperty(lights, 'isRectAreaLight')}
    <TransactionalBinding
      objects={lights}
      key="power"
      label="power"
    />
    <TransactionalBinding
      objects={lights}
      key="width"
      label="width"
    />
    <TransactionalBinding
      objects={lights}
      key="height"
      label="height"
    />
  {/if}

  {#if haveProperty(lights, 'shadow')}
    <Folder
      expanded={false}
      title="Shadow"
    >
      <Shadow objects={lights.map((light) => light.shadow).filter(filterUndefined)} />
    </Folder>
  {/if}
</Folder>
