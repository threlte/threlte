<script
  lang="ts"
  generics="TGroupsDef extends GroupsDef"
>
  import { setContext } from 'svelte'
  import { computeBitMask } from '../../lib/computeBitMask.js'
  import type { CollisionGroupsContext } from '../../types/types.js'
  import type { CollisionGroupsProps, Groups, GroupsDef, MembershipsAndFilter } from './types.js'

  let { groups, filter, memberships, children }: CollisionGroupsProps<TGroupsDef> = $props()

  setContext<NonNullable<CollisionGroupsContext>>('threlte-rapier-collision-group', () =>
    computeBitMask(
      groups as Groups,
      filter as MembershipsAndFilter,
      memberships as MembershipsAndFilter
    )
  )
</script>

{@render children?.()}
