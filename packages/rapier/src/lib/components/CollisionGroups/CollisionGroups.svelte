<script lang="ts">
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import type { CollisionGroupsBitMask, CollisionGroupsContext } from '../../types/types'

  type Groups = $$Generic<
    (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15)[] | undefined
  >

  type MembershipsAndFilter = $$Generic<
    Groups extends undefined
      ? (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15)[]
      : undefined
  >

  interface WithGroups {
    groups: Groups
  }

  interface WithMembershipsAndFilter {
    filter: MembershipsAndFilter
    memberships: MembershipsAndFilter
  }

  type $$Props = WithGroups | WithMembershipsAndFilter

  export let groups: Groups = undefined as Groups
  export let filter: MembershipsAndFilter = undefined as MembershipsAndFilter
  export let memberships: MembershipsAndFilter = undefined as MembershipsAndFilter

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

  const store = writable<number>(computeBitMask(groups, filter, memberships))
  $: store.set(computeBitMask(groups, filter, memberships))
  setContext<NonNullable<CollisionGroupsContext>>('threlte-rapier-collision-group', store)
</script>

<slot />
