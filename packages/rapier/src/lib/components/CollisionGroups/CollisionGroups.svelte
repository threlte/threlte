<script lang="ts">
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { CollisionGroupsBitMask, CollisionGroupsContext } from '../../types/types'
  import type { CollisionGroupsProps, Groups, MembershipsAndFilter } from './CollisionGroups.svelte'

  type TGroupsDef = $$Generic<GroupsDef>
  type Props = CollisionGroupsProps<TGroupsDef>

  export let groups: Props['groups'] = undefined
  export let filter: Props['filter'] = undefined
  export let memberships: Props['memberships'] = undefined

  const computeBitMask = (
    groups: Groups,
    filter: MembershipsAndFilter,
    memberships: MembershipsAndFilter
  ) => {
    if (groups !== undefined) {
      // groups is setting the filter and memberships at once
      const g = groups as CollisionGroupsBitMask
      const mask =
        g.reduce((acc, f) => {
          return acc | (1 << (f as number))
        }, 0 as number) |
        g.reduce((acc, m) => {
          return acc | (1 << ((m as number) + 16))
        }, 0 as number)
      return mask
    }
    const mask =
      (memberships as CollisionGroupsBitMask).reduce((acc, f) => {
        return acc | (1 << (f as number))
      }, 0 as number) |
      (filter as CollisionGroupsBitMask).reduce((acc, m) => {
        return acc | (1 << ((m as number) + 16))
      }, 0 as number)
    return mask
  }

  const store = writable<number>(
    computeBitMask(
      groups as Groups,
      filter as MembershipsAndFilter,
      memberships as MembershipsAndFilter
    )
  )
  $: store.set(
    computeBitMask(
      groups as Groups,
      filter as MembershipsAndFilter,
      memberships as MembershipsAndFilter
    )
  )
  setContext<NonNullable<CollisionGroupsContext>>('threlte-rapier-collision-group', store)
</script>

<slot />
