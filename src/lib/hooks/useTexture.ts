import { browser } from '../lib/browser'
import { sRGBEncoding, Texture, TextureLoader } from 'three'
import { invalidateGlobally } from '../Canvas.svelte'
import { useThrelteRoot } from './useThrelteRoot'
import { useLoader } from './useLoader'

const loader = useLoader(TextureLoader, () => new TextureLoader())

const loadTexture = (path: string) => {
  return loader.load(path, () => invalidateGlobally('useTexture'))
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
    if (!rootCtx.linear) texture.encoding = sRGBEncoding
  } catch (error) {
    console.warn(
      'Calling useTexture outside component initialization does not support color correction.'
    )
  }
  return texture
}

export function useTexture(path: string): Texture
export function useTexture(paths: string[]): Texture[]
export function useTexture<T extends string>(paths: Record<T, string>): Record<T, Texture>
export function useTexture<T extends string>(
  paths: string | string[] | Record<T, string>
): Texture | Texture[] | Record<T, Texture> {
  if (pathsIsString(paths)) {
    if (!browser) return new Texture()
    return convertTextureColor(loadTexture(paths))
  } else if (pathsIsArray(paths)) {
    if (!browser) {
      return paths.map(() => new Texture())
    }
    return paths.map((path) => convertTextureColor(loadTexture(path)))
  } else {
    const entries = Object.entries(paths) as [T, string][]
    const map = entries.reduce((acc, [key, value]) => {
      acc[key] = browser ? loadTexture(value) : new Texture()
      return acc
    }, {} as Partial<Record<T, Texture>>) as unknown as Record<T, Texture>
    return map
  }
}
