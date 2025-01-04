/**
 * This is the type of the props that are passed to the <T> component by the
 * vite plugin.
 */
export type StudioProps = {
  moduleId: string
  index: number
  signature: string
  pathItems?: string[]
}

export type Modifier = {
  name: string
  value: string
}

export type Member = {
  name: string
  argument: {
    start: number
    end: number
  }
  modifiers: Modifier[]
}

export type Members = Member[]

export type StaticStateMeta = {
  id: string
  members: Member[]
}
