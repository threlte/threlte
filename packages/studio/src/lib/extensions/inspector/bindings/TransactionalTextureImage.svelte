<script lang="ts">
  import { resolvePropertyPath, useLoader } from '@threlte/core'
  import { Binding, Image, List, type BindingRef, type ListOptions } from 'svelte-tweakpane-ui'
  import { useTransactions } from '../../transactions/useTransactions'
  import { buildTransaction } from '../buildTransaction'
  import * as plugin from '@kitschpatrol/tweakpane-image-plugin'
  import { TextureLoader } from 'three'

  const { commit } = useTransactions()

  type Props = {
    objects: any[]
    key: string
    label: string
  }

  let ref = $state<BindingRef>()

  let { objects, key, label }: Props = $props()

  const firstObject = $derived(objects[0])

  const carrier: Record<string, any> = {}
  const { target, key: targetKey } = resolvePropertyPath(firstObject, key)

  if (
    typeof target[targetKey] === 'object' &&
    target[targetKey] !== null &&
    'clone' in target[targetKey] &&
    typeof target[targetKey].clone === 'function'
  ) {
    const cloned = target[targetKey].clone()
    carrier[targetKey] = cloned
  } else {
    carrier[targetKey] = target[targetKey]
  }

  const textureSrc = $derived.by(() => {
    if (carrier[targetKey] && carrier[targetKey].image) {
      if (carrier[targetKey].image instanceof ImageBitmap) {
        return getImageBitmapUrl(carrier[targetKey].image)
      } else if (carrier[targetKey].image instanceof HTMLImageElement) {
        return carrier[targetKey].image.src
      }
    }
    return ''
  })

  const getImageBitmapUrl = (imageBitmap: ImageBitmap) => {
    const canvas = document.createElement('canvas')
    canvas.width = imageBitmap.width
    canvas.height = imageBitmap.height
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(imageBitmap, 0, 0)
      return canvas.toDataURL()
    }
    return ''
  }

  const obj = $derived({ textureSrc })

  const loader = useLoader(TextureLoader)

  const onChangeHandler = (e: { last: boolean; value: any }) => {
    const tex = loader.load(e.value.src)
    tex.then((texture) => {
      objects.forEach((object) => {
        const { target, key: targetKey } = resolvePropertyPath(object, key)
        target[targetKey] = texture
        // check for needsUpdate
      })
    })
  }

  $effect(() => {
    if (!ref) return
    ref.on('change', onChangeHandler)
    return () => {
      ref.off('change', onChangeHandler)
    }
  })
</script>

<!-- <Image
	value={textureSrc}
	{label}
	on:change={(e) => {
		console.log(e.detail.value)
	}}
/> -->

<Binding
  object={obj}
  key="textureSrc"
  {label}
  {plugin}
  options={{
    view: 'input-image',
  }}
  bind:ref
/>

<!-- <List
	bind:value={carrier[targetKey]}
	{options}
	{label}
	on:change={(e) => {
		commit(
			objects.map((object) =>
				buildTransaction({
					object,
					propertyPath: key,
					value: e.detail.value,
				}),
			),
		)
	}}
	on:change
	{...rest}
/> -->
