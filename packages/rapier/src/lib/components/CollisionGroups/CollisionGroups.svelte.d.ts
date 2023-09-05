import { SvelteComponent } from 'svelte'

type N = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export type Groups = N[]

export type MembershipsAndFilter = N[]

type GroupsProps = {
  groups: N[]

  filter?: never
  memberships?: never
}

type MembershipsAndFilterProps = {
  filter: N[]
  memberships: N[]

  groups?: never
}

type GroupsDef = GroupsProps | MembershipsAndFilterProps

export type CollisionGroupsProps<TGroupsDef extends GroupsDef> = TGroupsDef extends GroupsProps
  ? GroupsProps
  : MembershipsAndFilterProps

export default class CollisionGroups<TGroupsDef extends GroupsDef> extends SvelteComponent<
  CollisionGroupsProps<TGroupsDef>
> {}
