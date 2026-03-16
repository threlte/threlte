<script
  lang="ts"
  module
>
  /**
   * If the target is an object,it very likely has a clone method. We use that
   * to clone the object. Otherwise, we just return the value. Example: carrier
   * is an object with a property 'position' that is a Vector3. The result is a
   * clone of the Vector3.
   */
  const getClonedValue = (target: any, key: string) => {
    if (
      typeof target[key] === 'object' &&
      target[key] !== null &&
      'clone' in target[key] &&
      typeof target[key].clone === 'function'
    ) {
      return target[key].clone()
    }
    if (typeof target[key] === 'object' && target[key] !== null) {
      console.error('The object does not have a clone method', target[key])
    }
    return target[key]
  }
</script>

<script lang="ts">
  import { resolvePropertyPath, useTask } from '@threlte/core'
  import { onMount, tick } from 'svelte'
  import { Binding, type BindingRef, type Plugin } from 'svelte-tweakpane-ui'
  import { useTransactions } from '../../transactions/useTransactions.js'
  import { buildTransaction } from '../../transactions/TransactionQueue/buildTransaction.js'

  const { commit, onTransaction } = useTransactions()

  type Props = {
    objects: any[]
    key: string
    label: string
    plugin?: Plugin
    autoUpdate?: boolean
    /** Transform values from and to display values, e.g. radians to degrees and vice versa */
    transform?: {
      /** The transformation applied when reading the initial value */
      read: (value: any) => any
      /** The transformation applied when writing the value back to the object */
      write: (value: any) => any
    }
    ref?: BindingRef
    options?: any
  }

  let { objects, key, label, autoUpdate = false, ref = $bindable(), transform, ...rest }: Props = $props()

  const firstObject = $derived(objects[0])

  const carrier: Record<string, any> = {}

  // This first resolves the target object and the key of the property we want to
  // bind. Example: firstObject is an object with a property 'position' that is a
  // Vector3. The result is target = firstObject and targetKey = 'position'. We
  // use this to clone the object.
  const { target, key: targetKey } = resolvePropertyPath(firstObject, key)

  carrier[targetKey] = getClonedValue(target, targetKey)

  // Maybe transform, e.g. radian to degree
  if (transform) {
    carrier[targetKey] = transform.read(carrier[targetKey])
  }

  let ignoreChangeEvent = false

  let running = $derived(autoUpdate)

  useTask(
    async () => {
      if (!ref) return
      if (typeof carrier[targetKey] === 'object' && carrier[targetKey] !== null) {
        if ('copy' in carrier[targetKey] && typeof carrier[targetKey].copy === 'function') {
          carrier[targetKey].copy(target[targetKey])
        }
      } else {
        carrier[targetKey] = target[targetKey]
      }
      if (transform) {
        carrier[targetKey] = transform.read(carrier[targetKey])
      }
      ignoreChangeEvent = true
      ref.refresh()
      await tick()
      ignoreChangeEvent = false
    },
    {
      autoInvalidate: false,
      running: () => running
    }
  )

  onMount(() => onTransaction(() => (running = true)))

  let isFirst = true
  // Because properties can be mutated continouosly but should only record
  // history on interaction start, we need to store the value of the first
  // change event.
  let historicValue: any | undefined

  // This function is called when the value of the binding changes. It writes
  // the value to the target object and commits the change to the transaction
  // queue. Arguably, this is the most important part of the binding.
  const changeHandler = (e: { last: boolean; value: any }) => {
    if (ignoreChangeEvent) return

    // Only write the value to the target object if it's the last or the first
    // change event.
    if (isFirst) {
      // no need to transform here, because the value is already transformed
      historicValue = getClonedValue(target, targetKey)
    }

    let value = getClonedValue(carrier, targetKey)
    if (transform) {
      value = transform.write(value)
    }

    // we commit the changes made to the object, but we only record history on
    // the last user interaction. syncing also only happens when the last user
    // interaction is completed.
    commit(
      objects.map((object) =>
        buildTransaction({
          object,
          propertyPath: key,
          value,
          historicValue,
          createHistoryRecord: e.last,
          sync: e.last
        })
      )
    )

    // on the last user interaction, e.last is true. We use that to reset the
    // isFirst flag.
    isFirst = e.last
  }

  $effect(() => {
    if (!ref) return
    ref.on('change', changeHandler)
    return () => {
      if (!ref) return
      ref.off('change', changeHandler)
    }
  })
</script>

<Binding
  object={carrier}
  key={targetKey}
  {label}
  bind:ref
  on:change
  {...rest}
/>
