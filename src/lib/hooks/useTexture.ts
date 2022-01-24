import { get } from 'svelte/store'
import { sRGBEncoding, Texture, TextureLoader } from 'three'
import { invalidateGlobally } from '../Canvas.svelte'
import { browser } from '../lib/browser'
import { useLoader } from './useLoader'
import { useThrelteRoot } from './useThrelteRoot'

type UseTextureOptions = {
  onLoad?: (texture: Texture) => void
  onProgress?: (event: ProgressEvent<EventTarget>) => void
  onError?: (event: ErrorEvent) => void
}

const loader = useLoader(TextureLoader, () => new TextureLoader())

const loadTexture = (path: string, options?: UseTextureOptions) => {
  return loader.load(
    path,
    (t) => {
      invalidateGlobally('useTexture')
      options?.onLoad?.(t)
    },
    (e) => {
      options?.onProgress?.(e)
    },
    (e) => {
      options?.onError?.(e)
    }
  )
}

const pathsIsString = <T extends string>(
  paths: string | string[] | Record<T, string>
): paths is string => {
  return typeof paths === 'string'
}

const pathsIsArray = <T extends string>(
  paths: string | string[] | Record<T, string>
): paths is string[] => {
  return Array.isArray(paths)
}

const convertTextureColor = (texture: Texture) => {
  try {
    const rootCtx = useThrelteRoot()
    if (!rootCtx) return texture
    if (!get(rootCtx.linear)) texture.encoding = sRGBEncoding
  } catch (error) {
    console.warn(
      'Calling useTexture outside component initialization does not support color correction.'
    )
  }
  return texture
}

export function useTexture(path: string, options?: UseTextureOptions): Texture
export function useTexture(paths: string[], options?: UseTextureOptions): Texture[]
export function useTexture<T extends string>(
  paths: Record<T, string>,
  options?: UseTextureOptions
): Record<T, Texture>
export function useTexture<T extends string>(
  paths: string | string[] | Record<T, string>,
  options?: UseTextureOptions
): Texture | Texture[] | Record<T, Texture> {
  if (pathsIsString(paths)) {
    if (!browser) return new Texture()
    return convertTextureColor(loadTexture(paths, options))
  } else if (pathsIsArray(paths)) {
    if (!browser) {
      return paths.map(() => new Texture())
    }
    return paths.map((path) => convertTextureColor(loadTexture(path, options)))
  } else {
    const entries = Object.entries(paths) as [T, string][]
    const map = entries.reduce((acc, [key, value]) => {
      acc[key] = browser ? loadTexture(value, options) : new Texture()
      return acc
    }, {} as Partial<Record<T, Texture>>) as unknown as Record<T, Texture>
    return map
  }
}
