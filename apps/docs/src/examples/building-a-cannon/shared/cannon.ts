// The geometry the scenes need to know about the cannon. The barrel pivots
// about these values, so anything positioned relative to the muzzle — like a
// freshly spawned shot — has to derive from them rather than repeat them.

// A real barrel pivots about its trunnions, forward of the carriage's middle
// so the breech has room to swing down.
export const PIVOT_HEIGHT = 0.8
export const PIVOT_X = 0.35
export const BARREL_LENGTH = 1.6
