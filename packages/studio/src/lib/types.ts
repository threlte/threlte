/**
 * This is the type of the props that are passed to the <T> component by the
 * vite plugin.
 */
export type StudioProps = {
  moduleId: string
  index: number
  pathItems?: string[]
}

/** A modifier of a property passed by JSDoc tags (e.g. `@min 0` or `@max 1`) */
export type Modifier = {
  /** The name of the modifier (e.g. `min` or `max`) */
  name: string
  /** The value of the modifier (e.g. `'0'` or `'1'`) */
  value: string
}

export type Member = {
  /** The name of the property (e.g. `opacity`) */
  name: string
  /** The start and end of the call expression arguments of the property (`$state(arguments)`) */
  argument: {
    start: number
    end: number
  }
  /** Modifiers of the property passed by JSDoc tags (e.g. `@min 0` or `@max 1`) */
  modifiers: Modifier[]
}

export type Members = Member[]

export type StaticStateMeta = {
  /** If the class is in the module block script tag of a component */
  module: boolean
  /** The id of the module */
  id: string
  /** The members of the class */
  members: Member[]
}
