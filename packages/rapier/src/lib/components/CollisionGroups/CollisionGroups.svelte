<script
  lang="ts"
  generics="TGroupsDef extends GroupsDef"
>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { computeBitMask } from '../../lib/computeBitMask.js'
  import type { CollisionGroupsContext } from '../../types/types.js'
  import type { CollisionGroupsProps, Groups, GroupsDef, MembershipsAndFilter } from './types.js'

  let { groups, filter, memberships, children }: CollisionGroupsProps<TGroupsDef> = $props()

  const store = writable<number>(
    computeBitMask(
      groups as Groups,
      filter as MembershipsAndFilter,
      memberships as MembershipsAndFilter
    )
  )
  $effect.pre(() =>
    store.set(
      computeBitMask(
        groups as Groups,
        filter as MembershipsAndFilter,
        memberships as MembershipsAndFilter
      )
    )
  )

  setContext<NonNullable<CollisionGroupsContext>>('threlte-rapier-collision-group', store)
</script>

{@render children?.()}
