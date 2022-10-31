<script lang="ts">
  import { Object3D } from 'three'
  import type { ConditionalKeys, Primitive, Class } from 'type-fest'
  import DisposableObject from '../internal/DisposableObject.svelte'
  import SceneGraphObject from '../internal/SceneGraphObject.svelte'
  import type { DisposableThreeObject } from '../types/components'
  import { useAttach } from './utils2/useAttach'
  import type { Attach } from './utils2/types'
  import { useProps } from './utils2/useProps'
  import { getContext, setContext } from 'svelte'
  import { writable, type Writable } from 'svelte/store'
  import { useCamera } from './utils2/useCamera'
  import { useThrelte } from '../hooks/useThrelte'

  type AnyClass = new (...args: any) => any
  type AnyFn = (...args: any) => any

  /**
   * We hold a list of prop keys that should be ommited from the object props
   * that are infered by the provided type.
   */
  type OmittedPropKeys =
    | 'type'
    | 'args'
    | 'attach'
    | 'manual'
    | 'makeDefault'
    | 'id'
    | 'children'
    | `is${string}` // isMesh, isObject3D, etc
    | 'parent'
    | 'uuid'
    | 'name'

  // Basic Prop Types
  type Type = $$Generic
  type Instance = Type extends AnyClass ? InstanceType<Type> : Type
  type Manual = Instance extends { isCamera: true } ? boolean : never
  type MakeDefault = Instance extends { isCamera: true } ? boolean : never
  type Args = Type extends AnyClass ? ConstructorParameters<Type> : never

  /**
   * Record<string, any> allows the use of any prop as there could be pierced
   * props ("position.x") which are not picked up by the following types.
   */
  type AnyProps = Record<string, any>
  type ClassProps = Type extends AnyClass
    ? {
        args?: Args | any[]
      }
    : {}
  type BaseProps = {
    type: Type
    attach?: Attach<Type>
  }
  type CameraProps = Instance extends { isCamera: true }
    ? {
        manual?: Manual
        makeDefault?: MakeDefault
      }
    : {}
  type InstanceProps = Omit<
    Instance extends Primitive
      ? {}
      : {
          [K in keyof Instance]?: Instance[K] extends { set: (...args: any[]) => any }
            ? Parameters<Instance[K]['set']> | Parameters<Instance[K]['set']>[0]
            : Instance[K] extends AnyFn
            ? never
            : Instance[K]
        },
    ConditionalKeys<Instance, AnyFn> | OmittedPropKeys
  >

  type AllProps = AnyProps & BaseProps & CameraProps & InstanceProps & ClassProps
  type $$Props = AllProps

  export let type: Type
  export let args: Args = undefined as Args
  export let attach: Attach<Type> = undefined as Attach<Type>
  export let manual: Manual = undefined as unknown as Manual
  export let makeDefault: MakeDefault = undefined as unknown as MakeDefault

  type ThrelteThreeParentContext = Writable<any | undefined>
  const parent = getContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context')

  // Type Gaurds
  const isClass = (type: any): type is AnyClass => {
    return typeof type === 'function' && /^\s*class\s+/.test(type.toString())
  }
  const argsIsConstructorParameters = (args: any): args is ConstructorParameters<AnyClass> => {
    return Array.isArray(args)
  }

  // We can't create the object in a reactive statement due to providing context
  export let ref = (
    isClass(type) && argsIsConstructorParameters(args)
      ? new type(...(args as any)) // TODO: fix this any
      : isClass(type)
      ? new type()
      : type
  ) as Instance
  let initialized = false
  $: if (initialized) {
    ref = (
      isClass(type) && argsIsConstructorParameters(args)
        ? new type(...(args as any)) // TODO: fix this any
        : isClass(type)
        ? new type()
        : type
    ) as Instance
  } else {
    initialized = true
  }
  const objectStore = writable(ref)
  $: objectStore.set(ref)
  setContext<ThrelteThreeParentContext>('threlte-hierarchical-parent-context', objectStore)

  // Props
  $: props = useProps()
  $: props.updateProps(ref, $$restProps)

  // Camera
  const { size } = useThrelte()
  $: camera = useCamera()
  $: camera.update(ref, $size, manual)
  $: camera.makeDefaultCamera(ref, makeDefault)

  // Attachment
  $: attachment = useAttach(ref, attach)
  $: attachment.update(ref, $parent, attach)

  const extendsObject3D = (object: any): object is Object3D => {
    return (object as any) instanceof Object3D
  }

  const isDisposableObject = (object: any): object is DisposableThreeObject => {
    return (object as any).dispose !== undefined
  }
</script>

{#if isDisposableObject(ref)}
  <DisposableObject object={ref} />
{/if}

{#if extendsObject3D(ref)}
  <SceneGraphObject object={ref}>
    <slot {ref} />
  </SceneGraphObject>
{:else}
  <slot {ref} />
{/if}
