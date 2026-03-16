<script lang="ts">
  import { useThrelte } from '@threlte/core'
  import { TreeViewItem, TreeViewWebComponent } from 'flexible-tree'
  import type * as THREE from 'three'
  import { useOnAdd } from '../../internal/useOnAdd.js'
  import { useOnRemove } from '../../internal/useOnRemove.js'
  import { useObjectSelection } from '../object-selection/useObjectSelection.svelte.js'
  import { onMount, tick } from 'svelte'
  import { useStudioObjectsRegistry } from '../studio-objects-registry/useStudioObjectsRegistry.svelte.js'

  const treeview = new TreeViewWebComponent()
  treeview.scrollable = true
  treeview.allowRenaming = false
  treeview.dom.style.cssText = `
--text-secondary: #bbbcc4b3;
font-family: Roboto Mono, Source Code Pro, Menlo, Courier, monospace;
font-size: 11px;
height: auto;
max-height: 50vh;
`

  const style = document.createElement('style')
  style.innerHTML = `
.tv-container:nth-child(2)::before {
	top: -2px
}

.tv-item-icon:before {
	width: 12px;
}

.tv-item-icon:after {
	filter: saturate(0) brightness(10);
	display: inline-flex;
	justify-content: center;
	align-items: center;
}

.font-regular {
	font-weight: 500;
}
`
  treeview.shadowRoot.appendChild(style)

  const { scene } = useThrelte()
  const objectSelection = useObjectSelection()
  const studioObjectsRegistry = useStudioObjectsRegistry()

  const treeroot = new TreeViewItem({
    text: 'Scene',
    allowSelect: false,
    allowDrag: false,
    allowDrop: false
  })
  treeview.append(treeroot)

  const objectToTreeItem = new WeakMap<THREE.Object3D, TreeViewItem>()
  const treeItemToObject = new WeakMap<TreeViewItem, THREE.Object3D>()
  const selectedItems = new Set<TreeViewItem>()

  treeItemToObject.set(treeroot, scene)
  objectToTreeItem.set(scene, treeroot)

  const deregister = (object: THREE.Object3D) => {
    if (studioObjectsRegistry.isOrIsChildOfStudioObject(object)) return

    object.traverse((child) => {
      if (object !== child) {
        deregister(child)
      }
    })

    const item = objectToTreeItem.get(object)
    objectToTreeItem.delete(object)

    if (objectSelection.selectedObjects.includes(object)) {
      objectSelection.removeFromSelection([object])
    }

    // @TODO investigate
    if (item !== undefined) {
      treeItemToObject.delete(item)
      item.destroy()
    }
  }

  const orphaned = new Map()

  let observeChanges = true

  const register = (object: THREE.Object3D) => {
    if (studioObjectsRegistry.isOrIsChildOfStudioObject(object)) {
      return
    }

    if ('userData' in object && 'hideInTree' in object.userData && object.userData.hideInTree) {
      return
    }

    const { parent } = object
    const name = object.name
    const parentItem = parent === scene ? treeroot : objectToTreeItem.get(parent!)
    const text = `${name ? `${name} ` : ''}(${object.type})`
    const icons = {
      isCamera: '🎥',
      isLight: '💡',
      isMesh: '📐',
      isGroup: '⚪️',
      isObject3D: '📦'
    }
    const findIcon = (object: THREE.Object3D) => {
      for (const [key, value] of Object.entries(icons)) {
        if (key in object) {
          return value
        }
      }
      return '📦'
    }
    const item = new TreeViewItem({
      text,
      allowDrop: false,
      icon: findIcon(object).codePointAt(0)?.toString(16)
    })
    item.open = true
    item.selected = objectSelection.selectedObjects.includes(object)
    objectToTreeItem.set(object, item)
    treeItemToObject.set(item, object)

    if (parentItem) {
      parentItem.append(item)
    } else if (object.parent) {
      orphaned.set(object.parent.uuid, item)
    }

    const orphan = orphaned.get(object.uuid)

    if (orphan && !orphan._destroyed) {
      item.append(orphan)
      orphaned.delete(object.uuid)
    }

    for (const child of object.children) {
      if (!studioObjectsRegistry.isOrIsChildOfStudioObject(object)) {
        register(child)
      }
    }
  }

  let initialized = false
  onMount(() => {
    tick().then(() => {
      scene.children.forEach((object) => {
        register(object)
      })
      initialized = true
    })
  })

  const handleSelect = async (item: TreeViewItem) => {
    if (!observeChanges) return
    selectedItems.add(item)
    const object = treeItemToObject.get(item)
    if (!object) return
    objectSelection.addToSelection([object])
  }

  treeview.on('deselect', (item: TreeViewItem) => {
    if (!observeChanges) return
    selectedItems.delete(item)
    const object = treeItemToObject.get(item)
    if (!object) return
    objectSelection.removeFromSelection([object])
  })

  treeview.on('select', handleSelect)

  useOnAdd(async (object) => {
    if (!initialized) return
    await tick()
    register(object)
  })

  useOnRemove(async (object) => {
    if (!initialized) return
    await tick()
    deregister(object)
  })

  const noUndef = <T,>(v: T | undefined): v is T => v !== undefined

  $effect(() => {
    observeChanges = false

    const treeItems = objectSelection.selectedObjects
      .map((object) => {
        const treeitem = objectToTreeItem.get(object)
        return treeitem
      })
      .filter(noUndef)

    treeItems.forEach((treeitem) => {
      treeitem.selected = true
    })

    observeChanges = true
    return () => {
      observeChanges = false

      treeItems.forEach((treeitem) => {
        try {
          treeitem.selected = false
        } catch {
          // ignore
        }
      })
      observeChanges = true
    }
  })

  const replace = (node: HTMLElement) => {
    node.replaceWith(treeview.wc)
    return {
      destroy() {
        treeview.wc.replaceWith(node)
      }
    }
  }
</script>

<div use:replace></div>
