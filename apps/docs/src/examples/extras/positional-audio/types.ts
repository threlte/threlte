import type { Props } from '@threlte/core'
import type { Group } from 'three'

export type TurntableProps = Props<Group> & {
  isPlaying?: boolean
  volume?: number
}

export type SpeakerProps = Props<Group> & {
  volume?: number
}

export type DiscProps = Props<Group> & {
  discSpeed?: number
}

export type ButtonProps = Props<Group> & {
  text: string
  onClick: () => void
}
