<script
  lang="ts"
  module
>
  import { Discard, Fn, vec4 } from 'three/tsl'

  // The node graph is constant, so it's built once and shared by every instance.
  const fragmentNode = Fn(() => {
    Discard()
    return vec4(0)
  })()
</script>

<script lang="ts">
  import { T, type Props as ThrelteProps } from '@threlte/core/webgpu'
  import { NodeMaterial } from 'three/webgpu'

  type Props = Omit<ThrelteProps<NodeMaterial>, 'fragmentNode'>

  let { children, ref = $bindable(), ...props }: Props = $props()

  const material = new NodeMaterial()
</script>

<T
  is={material}
  bind:ref
  {fragmentNode}
  {...props}
>
  {@render children?.({ ref: material })}
</T>
