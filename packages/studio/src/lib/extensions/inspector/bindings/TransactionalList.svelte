<script lang="ts">
  import { resolvePropertyPath } from '@threlte/core'
  import { List, type ListOptions } from 'svelte-tweakpane-ui'
  import { useTransactions } from '../../transactions/useTransactions.js'
  import { buildTransaction } from '../../transactions/TransactionQueue/buildTransaction.js'

  const { commit } = useTransactions()

  type Props = {
    objects: any[]
    key: string
    label: string
    options: ListOptions<any>
  }

  let { objects, key, label, options, ...rest }: Props = $props()

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
</script>

<List
  value={carrier[targetKey]}
  {options}
  {label}
  on:change={(e) => {
    commit(
      objects.map((object) =>
        buildTransaction({
          object,
          propertyPath: key,
          value: e.detail.value
        })
      )
    )
  }}
  on:change
  {...rest}
/>
