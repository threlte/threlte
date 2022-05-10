import { AudioLoader } from 'three'
import { useLoader } from './useLoader'

export const useAudio = (url: string): Promise<AudioBuffer> => {
  return new Promise((resolve, reject) => {
    const loader = useLoader(AudioLoader, () => new AudioLoader())
    loader.load(
      url,
      (buffer) => {
        resolve(buffer)
      },
      undefined,
      (e) => reject(e.message)
    )
  })
}
