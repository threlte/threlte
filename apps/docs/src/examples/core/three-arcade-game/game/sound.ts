import { AudioListener, AudioLoader } from 'three'

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
  levelComplete: '/audio/level_complete.m4a',
  gameOver2: '/audio/game_over2.m4a'
} as const
type Sounds = keyof typeof sounds

type Groups = 'bounce'

type PlayOptions = {
  when?: number
  loop?: boolean
  volume?: number
  playbackRate?: number
}

type ArcadeAudio = {
  source: AudioBufferSourceNode
  gain: GainNode
  setVolume: (volume: number) => void
  onEnded: () => Promise<void>
}

export class Sound {
  listener: AudioListener | undefined = undefined
  groups: Record<Groups, Sounds[]> = {
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
  audioBuffers: Record<Sounds, AudioBuffer> = {} as Record<Sounds, AudioBuffer>
  debounceInMs = 150
  randomLimits: [min: number, max: number] = [-20, 150]

  audioLoader = new AudioLoader()
  lastPlayed: Record<Groups, number> = Object.keys(this.groups).reduce(
    (acc, key) => {
      acc[key as Groups] = 0
      return acc
    },
    {} as Record<Groups, number>
  )

  init(listener: AudioListener) {
    if (this.listener) return
    this.listener = listener
    this.loadAll()
  }

  async loadAll() {
    await Promise.all(
      Object.entries(sounds).map(async ([sound, url]) => {
        this.audioBuffers[sound as Sounds] = await this.audioLoader.loadAsync(url)
      })
    )
  }

  play(sound: Sounds, options?: PlayOptions): ArcadeAudio | undefined {
    if (!this.listener) return
    const context = this.listener.context
    const now = Date.now()
    const groupsOfSound = Object.entries(this.groups).filter(([, sounds]) => sounds.includes(sound))

    const randomDebounce =
      this.debounceInMs +
      (Math.random() * (this.randomLimits[1] - this.randomLimits[0]) + this.randomLimits[0])
    const shouldBeSkipped = groupsOfSound.reduce((shouldBeSkipped, [group]) => {
      const lastPlayedTime = this.lastPlayed[group as Groups]
      if (now - lastPlayedTime < randomDebounce) return true
      return shouldBeSkipped
    }, false)
    if (shouldBeSkipped) return

    const buffer = this.audioBuffers[sound]
    if (!buffer) return
    const source = context.createBufferSource()
    source.buffer = buffer
    const gainNode = context.createGain()
    source.connect(gainNode)
    gainNode.connect(this.listener.gain)
    const volume = options?.volume === 0 ? 0.000000001 : (options?.volume ?? 1)
    gainNode.gain.value = volume
    source.loop = options?.loop ?? false
    source.playbackRate.value = options?.playbackRate ?? 1
    source.start(options?.when)

    groupsOfSound.forEach(([group]) => {
      this.lastPlayed[group as Groups] = now
    })

    const setVolume = (volume: number) => {
      gainNode.gain.cancelScheduledValues(context.currentTime)
      gainNode.gain.value = volume
    }

    return {
      source,
      gain: gainNode,
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
  playFromGroup(group: Groups, options?: PlayOptions) {
    const sound = this.groups[group][Math.floor(Math.random() * this.groups[group].length)]
    return this.play(sound!, options)
  }
}
