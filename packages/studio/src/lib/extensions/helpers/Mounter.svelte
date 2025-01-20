<script lang="ts">
  import { T } from '@threlte/core'
  import type { Snippet } from 'svelte'
  import { Object3D } from 'three'

  type Props = {
    parent: Object3D
		children?: Snippet
  }

  let { parent, children }: Props = $props()

	const object = new Object3D()
	object.add = (child) => {
		return parent.add(child)
	}
	object.remove = (child) => {
		return parent.remove(child)
	}
</script>

<T is={object} attach={false}>
	{@render children?.()}
</T>
