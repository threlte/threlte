<script lang="ts">
  import { getContext, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'
  import type { Object3D } from 'three'
  import DisposableObject from '../../internal/DisposableObject.svelte'
  import SceneGraphObject from '../../internal/SceneGraphObject.svelte'
  import type { DisposableThreeObject } from '../../types/components'
  import { useAttach } from '../utils/useAttach'
  import { useCamera } from '../utils/useCamera'
  import { useEvents } from '../utils/useEvents'
  import { usePlugins } from '../utils/usePlugins'
  import { useProps } from '../utils/useProps'
  import type { PrimitiveEvents, PrimitiveProps, PrimitiveSlots } from './types'

  type Type = $$Generic

  type AllProps = {
    object: Type
  } & PrimitiveProps<Type>
  type $$Props = AllProps
  type $$Events = PrimitiveEvents<Type>
  type $$Slots = PrimitiveSlots<Type>

  export let object: Type
  export let attach: AllProps['attach'] = undefined as AllProps['attach']
  export let manual: AllProps['manual'] = undefined as unknown as AllProps['manual']
  export let makeDefault: AllProps['makeDefault'] = undefined as unknown as AllProps['makeDefault']
  export let dispose: AllProps['dispose'] = undefined as unknown as AllProps['dispose']

  type ThrelteThreeParentContext = Writable<any | undefined>
  const parent = getContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context')

  const objectStore = writable(object)
  $: objectStore.set(object)
  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', objectStore)

  // Plugins
  // Plugins are initialized here so that pluginsProps
  // is available in the props update
  const plugins = usePlugins({ ref: object, props: $$props })
  const pluginsProps = plugins?.pluginsProps ?? []

  // Props
  const props = useProps()
  $: props.updateProps(object, $$restProps, {
    manualCamera: manual,
    pluginsProps
  })

  // Camera
  const camera = useCamera()
  $: camera.update(object, manual)
  $: camera.makeDefaultCamera(object, makeDefault)

  // Attachment
  const attachment = useAttach()
  $: attachment.update(object, $parent, attach)

  // Events
  const events = useEvents()
  $: events.updateRef(object)

  // update plugins after all other updates
  $: plugins?.updateRef(object)
  $: plugins?.updateProps($$props)
  $: plugins?.updateRestProps($$restProps)

  const extendsObject3D = (object: any): object is Object3D => {
    return !!(object as any).isObject3D
  }

  const isDisposableObject = (object: any): object is DisposableThreeObject => {
    return (object as any).dispose !== undefined
  }
</script>

{#if isDisposableObject(object)}
  <DisposableObject {object} {dispose} />
{/if}

{#if extendsObject3D(object)}
  <SceneGraphObject {object}>
    <slot ref={object} />
  </SceneGraphObject>
{:else}
  <slot ref={object} />
{/if}
