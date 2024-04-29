import type { Object3D } from 'three'
import { getInternalContext } from './context'

// inspectorOptions={{ id: '${id}', start: ${node.start}, index: ${index} }}`
export const useTransaction = (object: Object3D) => {
  const { sync } = getInternalContext()

  const details = object.userData.inspectorOptions
    ? {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        fileId: object.userData.inspectorOptions.id as string,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        componentIndex: object.userData.inspectorOptions.index as number,
      }
    : undefined

  const addTransaction = (attributeName: string, attributeValue: unknown) => {
    if (!details) return
    sync.addTransaction({
      fileId: details.fileId,
      componentIndex: details.componentIndex,
      attributeName,
      attributeValue,
      path: object.userData.inspectorOptions.path,
    })
  }

  return {
    addTransaction,
  }
}
