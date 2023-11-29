import { AudioLoader } from 'three'
import { gameState } from './game/state'

const sounds = {
  bounce1: '/audio/ball_bounce_1.mp3',
  bounce2: '/audio/ball_bounce_2.mp3',
  bounce3: '/audio/ball_bounce_3.mp3',
  bounce4: '/audio/ball_bounce_4.mp3',
  bounce5: '/audio/ball_bounce_5.mp3',
  bounce6: '/audio/ball_bounce_6.mp3',
  bounce7: '/audio/ball_bounce_7.mp3',
  bounce8: '/audio/ball_bounce_8.mp3',
  bounce9: '/audio/ball_bounce_9.mp3',
  intro: '/audio/arcade_intro.mp3',
  intro2: '/audio/arcade_intro2.m4a',
  intro3: '/audio/arcade_intro3.m4a',
  levelSlow: '/audio/level_slow.m4a',
  levelComplete: '/audio/level_complete.m4a',
  gameOver: '/audio/game_over.m4a',
  gameOver2: '/audio/game_over2.m4a'
} as const
type Sound = keyof typeof sounds

type Groups = 'bounce'

const groups: Record<Groups, Sound[]> = {
  bounce: [
    'bounce1',
    'bounce2',
    'bounce3',
    'bounce4',
    'bounce5',
    'bounce6',
    'bounce7',
    'bounce8',
    'bounce9'
  ]
}

let context: AudioContext | undefined = undefined
let globalGainNode: GainNode | undefined = undefined
const audioBuffers: Record<Sound, AudioBuffer> = {} as Record<Sound, AudioBuffer>
const debounceInMs = 150
const randomLimits: [min: number, max: number] = [-20, 150]

const audioLoader = new AudioLoader()

const lastPlayed: Record<Groups, number> = Object.keys(groups).reduce((acc, key) => {
  acc[key as Groups] = 0
  return acc
}, {} as Record<Groups, number>)

export const resumeContext = () => {
  if (context) context.resume()
}

const loadAudioBuffer = (url: string): Promise<AudioBuffer> => {
  return new Promise((resolve) => {
    audioLoader.load(url, (buffer) => {
      resolve(buffer)
    })
  })
}

const init = async () => {
  context = new AudioContext()
  globalGainNode = context.createGain()
  globalGainNode.connect(context.destination)
  const promises = Object.entries(sounds).map(async ([sound, url]) => {
    if (!context) return
    const audioBuffer = await loadAudioBuffer(url)
    audioBuffers[sound as Sound] = audioBuffer
  })
  await Promise.all(promises)
}

const addEventListener = () => {
  if (typeof window === 'undefined') return
  window.addEventListener('click', () => {
    if (context) context.resume()
  })
  window.addEventListener('keydown', () => {
    if (context) context.resume()
  })
}

if (typeof window !== 'undefined') {
  init()
  addEventListener()
}

type PlayOptions = {
  when?: number
  loop?: boolean
  volume?: number
  playbackRate?: number
}

export type ArcadeAudio = {
  source: AudioBufferSourceNode
  gain: GainNode
  fade: (
    volume: number,
    duration: number,
    options?: { type?: 'linear' | 'exponential' }
  ) => Promise<void> | undefined
  setVolume: (volume: number) => void
  onEnded: () => Promise<void>
}

const handleMuted = (muted: boolean) => {
  console.log('muted', muted)

  if (!globalGainNode) return
  if (muted) {
    globalGainNode.gain.value = 0
  } else {
    resumeContext()
    globalGainNode.gain.value = 1
  }
}
const { muted } = gameState
muted.subscribe(handleMuted)

export const play = (sound: Sound, options?: PlayOptions): ArcadeAudio | undefined => {
  if (!context || !globalGainNode) return
  const now = Date.now()
  const groupsOfSound = Object.entries(groups).filter(([, sounds]) => sounds.includes(sound))

  const randomDebounce =
    debounceInMs + (Math.random() * (randomLimits[1] - randomLimits[0]) + randomLimits[0])
  const shouldBeSkipped = groupsOfSound.reduce((shouldBeSkipped, [group]) => {
    const lastPlayedTime = lastPlayed[group as Groups]
    if (now - lastPlayedTime < randomDebounce) return true
    return shouldBeSkipped
  }, false)
  if (shouldBeSkipped) return

  const buffer = audioBuffers[sound]
  if (!buffer) return
  if (context.state === 'suspended' || context.state === 'closed') context.resume()
  const source = context.createBufferSource()
  source.buffer = buffer
  const gainNode = context.createGain()
  source.connect(gainNode)
  gainNode.connect(globalGainNode)
  let volume = options?.volume ?? 1
  volume = volume === 0 ? 0.000000001 : volume
  gainNode.gain.value = volume
  source.loop = options?.loop ?? false
  source.playbackRate.value = options?.playbackRate ?? 1
  source.start(options?.when)

  groupsOfSound.forEach(([group]) => {
    lastPlayed[group as Groups] = now
  })

  const setVolume = (volume: number) => {
    if (!context) return
    gainNode.gain.cancelScheduledValues(context.currentTime)
    gainNode.gain.value = volume
  }

  const fade = (
    volume: number,
    duration: number,
    options?: {
      type?: 'linear' | 'exponential'
    }
  ) => {
    if (!context) return
    if (volume === 0) {
      volume = 0.000000001
    }
    gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime)
    if (options?.type === 'exponential') {
      gainNode.gain.exponentialRampToValueAtTime(volume, context.currentTime + duration / 1000)
    } else {
      gainNode.gain.exponentialRampToValueAtTime(volume, context.currentTime + duration / 1000)
    }
    return new Promise<void>((resolve) => setTimeout(resolve, duration))
  }

  return {
    source,
    gain: gainNode,
    fade,
    setVolume,
    onEnded: () => {
      return new Promise((resolve) => {
        const onEnded = () => {
          source.removeEventListener('ended', onEnded)
          resolve()
        }
        source.addEventListener('ended', onEnded)
      })
    }
  }
}
export const playFromGroup = (group: Groups, options?: PlayOptions) => {
  const sound = groups[group][Math.floor(Math.random() * groups[group].length)]
  const source = play(sound, options)
  return source
}
