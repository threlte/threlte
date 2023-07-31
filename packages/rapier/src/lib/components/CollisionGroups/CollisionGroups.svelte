<script lang="ts">
  import { setContext } from 'svelte'
  import { writable } from 'svelte/store'
  import { computeBitMask } from '../../lib/computeBitMask'
  import type { CollisionGroupsContext } from '../../types/types'
  import type { CollisionGroupsProps, Groups, MembershipsAndFilter } from './CollisionGroups.svelte'

  type TGroupsDef = $$Generic<GroupsDef>
  type $$Props = CollisionGroupsProps<TGroupsDef>

  export let groups: $$Props['groups'] = undefined
  export let filter: $$Props['filter'] = undefined
  export let memberships: $$Props['memberships'] = undefined

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
