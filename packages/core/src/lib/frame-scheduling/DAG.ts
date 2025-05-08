import mitt, { type Emitter } from 'mitt'

type Vertex<T> = { value: T | undefined; previous: Set<Key>; next: Set<Key> }

export type Key = string | symbol

export type AddNodeOptions<T> = {
  before?: (Key | T) | (Key | T)[] | undefined
  after?: (Key | T) | (Key | T)[] | undefined
}

type Events<T> = {
  'node:added': { key: Key; value: T; type: 'isolated' | 'connected' }
  'node:removed': { key: Key; type: 'isolated' | 'connected' }
}

export class DAG<T extends { key: Key }> {
  private allVertices: Record<Key, Vertex<T>> = {}

  /** Nodes that are fully unlinked */
  private isolatedVertices: Record<Key, Vertex<T>> = {}
  private connectedVertices: Record<Key, Vertex<T>> = {}

  private sortedConnectedValues: T[] = []
  private needsSort = false

  private emitter: Emitter<Events<T>> = mitt<Events<T>>()
  private emit: Emitter<Events<T>>['emit'] = this.emitter.emit.bind(this.emitter)
  public on: Emitter<Events<T>>['on'] = this.emitter.on.bind(this.emitter)
  public off: Emitter<Events<T>>['off'] = this.emitter.off.bind(this.emitter)

  protected get sortedVertices(): T[] {
    return this.mapNodes((value) => value)
  }

  private moveToIsolated(key: Key) {
    const vertex = this.connectedVertices[key]
    if (!vertex) return
    this.isolatedVertices[key] = vertex
    delete this.connectedVertices[key]
  }

  private moveToConnected(key: Key) {
    const vertex = this.isolatedVertices[key]
    if (!vertex) return
    this.connectedVertices[key] = vertex
    delete this.isolatedVertices[key]
  }

  private getKey = (v: T | Key): Key => {
    if (typeof v === 'object') {
      return v.key
    }
    return v
  }

  protected add(key: Key, value: T, options?: AddNodeOptions<T>) {
    if (this.allVertices[key] && this.allVertices[key].value !== undefined) {
      throw new Error(`A node with the key ${key.toString()} already exists`)
    }

    let vertex = this.allVertices[key]

    if (!vertex) {
      vertex = {
        value: value,
        previous: new Set(),
        next: new Set()
      }
      // add the vertex to the list of all vertices
      this.allVertices[key] = vertex
    } else if (vertex.value === undefined) {
      vertex.value = value
    }

    // if another node referenced this node before, we have inverse links
    const hasEdges = vertex.next.size > 0 || vertex.previous.size > 0

    if (!options?.after && !options?.before && !hasEdges) {
      // the node we're about to add is fully unlinked
      this.isolatedVertices[key] = vertex
      this.emit('node:added', {
        key,
        type: 'isolated',
        value
      })
      return
    } else {
      this.connectedVertices[key] = vertex
    }

    if (options?.after) {
      const afterArr = Array.isArray(options.after) ? options.after : [options.after]
      // we need to update the vertex to include the new "after" nodes
      afterArr.forEach((after) => {
        vertex.previous.add(this.getKey(after))
      })
      afterArr.forEach((after) => {
        const afterKey = this.getKey(after)
        // we get the vertex from the list of all vertices
        const linkedAfter = this.allVertices[afterKey]
        if (!linkedAfter) {
          // if it doesn't exist, we create it
          this.allVertices[afterKey] = {
            value: undefined, // uninitialized
            previous: new Set(),
            next: new Set([key])
          }
          this.connectedVertices[afterKey] = this.allVertices[afterKey]
        } else {
          // if it does exist, we update it
          linkedAfter.next.add(key)
          // we might need to move the vertex from isolated to connected
          this.moveToConnected(afterKey)
        }
      })
    }
    if (options?.before) {
      const beforeArr = Array.isArray(options.before) ? options.before : [options.before]
      // we need to update the vertex to include the new "before" nodes
      beforeArr.forEach((before) => {
        vertex.next.add(this.getKey(before))
      })
      beforeArr.forEach((before) => {
        const beforeKey = this.getKey(before)
        // we get the vertex from the list of all vertices
        const linkedBefore = this.allVertices[beforeKey]
        if (!linkedBefore) {
          // if it doesn't exist, we create it
          this.allVertices[beforeKey] = {
            value: undefined, // uninitialized
            previous: new Set([key]),
            next: new Set()
          }
          this.connectedVertices[beforeKey] = this.allVertices[beforeKey]
        } else {
          // if it does exist, we update it
          linkedBefore.previous.add(key)
          // we might need to move the vertex from isolated to connected
          this.moveToConnected(beforeKey)
        }
      })
    }

    this.emit('node:added', {
      key,
      type: 'connected',
      value
    })

    // Mark the graph as needing a re-sort
    this.needsSort = true
  }

  protected remove(key: Key | T) {
    const removeKey = this.getKey(key)
    // check if it's an unlinked vertex
    const unlinkedVertex = this.isolatedVertices[removeKey]
    if (unlinkedVertex) {
      delete this.isolatedVertices[removeKey]
      delete this.allVertices[removeKey]
      this.emit('node:removed', {
        key: removeKey,
        type: 'isolated'
      })
      return
    }

    // if it's not, it's a bit more complicated
    const linkedVertex = this.connectedVertices[removeKey]

    if (!linkedVertex) {
      // The node does not exist in the graph.
      return
    }

    // Update the 'next' nodes that this node points to
    linkedVertex.next.forEach((nextKey) => {
      const nextVertex = this.connectedVertices[nextKey]
      if (nextVertex) {
        nextVertex.previous.delete(removeKey)
        if (nextVertex.previous.size === 0 && nextVertex.next.size === 0) {
          this.moveToIsolated(nextKey)
        }
      }
    })

    // Update the 'previous' nodes that point to this node
    linkedVertex.previous.forEach((prevKey) => {
      const prevVertex = this.connectedVertices[prevKey]
      if (prevVertex) {
        prevVertex.next.delete(removeKey)
        if (prevVertex.previous.size === 0 && prevVertex.next.size === 0) {
          this.moveToIsolated(prevKey)
        }
      }
    })

    // Finally, remove the node from the graph
    delete this.connectedVertices[removeKey]
    delete this.allVertices[removeKey]

    this.emit('node:removed', {
      key: removeKey,
      type: 'connected'
    })

    // Mark the graph as needing a re-sort
    this.needsSort = true
  }

  protected mapNodes<U>(callback: (value: T, index: number) => U): U[] {
    if (this.needsSort) {
      this.sort()
    }
    const result: U[] = []
    this.forEachNode((value, index) => {
      result.push(callback(value, index))
    })
    return result
  }

  protected forEachNode(callback: (value: T, index: number) => void) {
    if (this.needsSort) {
      this.sort()
    }
    let index = 0
    for (; index < this.sortedConnectedValues.length; index++) {
      callback(this.sortedConnectedValues[index], index)
    }
    Reflect.ownKeys(this.isolatedVertices).forEach((key) => {
      const vertex = this.isolatedVertices[key]
      if (vertex.value !== undefined) callback(vertex.value, index++)
    })
  }

  protected getValueByKey(key: Key): T | undefined {
    return this.allVertices[key]?.value
  }

  protected getKeyByValue(value: T): Key | undefined {
    return (
      Reflect.ownKeys(this.connectedVertices).find(
        (key) => this.connectedVertices[key].value === value
      ) ??
      Reflect.ownKeys(this.isolatedVertices).find(
        (key) => this.isolatedVertices[key].value === value
      )
    )
  }

  private sort() {
    const inDegree: Map<Key, number> = new Map()
    const zeroInDegreeQueue: Key[] = []
    const result: Key[] = []

    // we're only interested in vertices that have a value
    const connectedVertexKeysWithValues = Reflect.ownKeys(this.connectedVertices).filter((key) => {
      const vertex = this.connectedVertices[key]
      return vertex.value !== undefined
    })

    // Initialize inDegree (count of incoming edges) for each vertex
    connectedVertexKeysWithValues.forEach((vertex) => {
      inDegree.set(vertex, 0)
    })

    // Calculate inDegree for each vertex
    connectedVertexKeysWithValues.forEach((vertexKey) => {
      const vertex = this.connectedVertices[vertexKey]
      vertex.next.forEach((next) => {
        // check if "next" vertex has a value
        const nextVertex = this.connectedVertices[next]
        if (!nextVertex) return
        inDegree.set(next, (inDegree.get(next) || 0) + 1)
      })
    })

    // Enqueue vertices with inDegree 0
    inDegree.forEach((degree, value) => {
      if (degree === 0) {
        zeroInDegreeQueue.push(value)
      }
    })

    // Process vertices with inDegree 0 and decrease inDegree of adjacent vertices
    while (zeroInDegreeQueue.length > 0) {
      const vertexKey = zeroInDegreeQueue.shift()!
      result.push(vertexKey)

      const v = connectedVertexKeysWithValues.find((key) => key === vertexKey)

      if (v) {
        this.connectedVertices[v]?.next.forEach((adjVertex) => {
          const adjVertexInDegree = (inDegree.get(adjVertex) || 0) - 1
          inDegree.set(adjVertex, adjVertexInDegree)
          if (adjVertexInDegree === 0) {
            zeroInDegreeQueue.push(adjVertex)
          }
        })
      }
    }

    // Check for cycles in the graph
    if (result.length !== connectedVertexKeysWithValues.length) {
      throw new Error('The graph contains a cycle, and thus can not be sorted topologically.')
    }

    const filterUndefined = <T>(value: T | undefined): value is T => value !== undefined

    this.sortedConnectedValues = result
      .map((key) => this.connectedVertices[key].value)
      .filter(filterUndefined)
    this.needsSort = false
  }

  protected clear() {
    this.allVertices = {}
    this.isolatedVertices = {}
    this.connectedVertices = {}
    this.sortedConnectedValues = []
    this.needsSort = false
  }

  public static isKey(value: any): value is Key {
    return typeof value === 'string' || typeof value === 'symbol'
  }

  public static isValue<T extends { key: Key }>(value: any): value is T {
    return typeof value === 'object' && 'key' in value
  }
}
