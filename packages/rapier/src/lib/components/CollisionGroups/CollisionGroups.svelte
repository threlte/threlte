<script
  lang="ts"
  generics="TGroupsDef extends GroupsDef"
>
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { computeBitMask } from '../../lib/computeBitMask'
  import type { CollisionGroupsContext } from '../../types/types'
  import type { CollisionGroupsProps, Groups, GroupsDef, MembershipsAndFilter } from './types'

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
