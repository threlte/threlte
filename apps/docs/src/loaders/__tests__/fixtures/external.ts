export interface ExternalBase {
  /** Inherited from outside the package, so it isn't listed. */
  position?: [number, number, number]

  /** This external declaration must not win over a package-local declaration. */
  opacity?: number
}
