import type { CollisionGroupsBitMask } from '../types/types'

type N = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15

export type Groups = N[]
export type MembershipsAndFilter = N[]

export const computeBitMask = (
  groups: Groups,
  filter: MembershipsAndFilter,
  memberships: MembershipsAndFilter
): number => {
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
