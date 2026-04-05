type Vertex<T> = { value: T | undefined; previous: Set<Key>; next: Set<Key> }

export type Key = string | symbol

export type AddNodeOptions<T> = {
  before?: (Key | T) | (Key | T)[] | undefined
  after?: (Key | T) | (Key | T)[] | undefined
}

type DAGEventType = 'node:added' | 'node:removed'

type DAGEvents<T> = {
  'node:added': { key: Key; value: T; type: 'isolated' | 'connected' }
  'node:removed': { key: Key; type: 'isolated' | 'connected' }
}

export class DAG<T extends { key: Key }> {
  private allVertices: Map<Key, Vertex<T>> = new Map()

  /** Nodes that are fully unlinked */
  private isolatedVertices: Map<Key, Vertex<T>> = new Map()
  private connectedVertices: Map<Key, Vertex<T>> = new Map()

  private sortedConnectedValues: T[] = []
  private needsSort = false

  private listeners = new Map<DAGEventType, Set<(data: any) => void>>()

  private emit<K extends DAGEventType>(type: K, data: DAGEvents<T>[K]) {
    const set = this.listeners.get(type)
    if (set) {
      for (const handler of set) handler(data)
    }
  }

  public on<K extends DAGEventType>(type: K, handler: (data: DAGEvents<T>[K]) => void) {
    let set = this.listeners.get(type)
    if (!set) {
      set = new Set()
      this.listeners.set(type, set)
    }
    set.add(handler)
  }

  public off<K extends DAGEventType>(type: K, handler: (data: DAGEvents<T>[K]) => void) {
    this.listeners.get(type)?.delete(handler)
  }

  protected get sortedVertices(): T[] {
    return this.mapNodes((value) => value)
  }

  private moveToIsolated(key: Key) {
    const vertex = this.connectedVertices.get(key)
    if (!vertex) return
    this.isolatedVertices.set(key, vertex)
    this.connectedVertices.delete(key)
  }

  private moveToConnected(key: Key) {
    const vertex = this.isolatedVertices.get(key)
    if (!vertex) return
    this.connectedVertices.set(key, vertex)
    this.isolatedVertices.delete(key)
  }

  private getKey = (v: T | Key): Key => {
    if (typeof v === 'object') {
      return v.key
    }
    return v
  }

  protected add(key: Key, value: T, options?: AddNodeOptions<T>) {
    let vertex = this.allVertices.get(key)

    if (vertex && vertex.value !== undefined) {
      throw new Error(`A node with the key ${key.toString()} already exists`)
    }

    if (!vertex) {
      vertex = {
        value: value,
        previous: new Set(),
        next: new Set()
      }
      // add the vertex to the list of all vertices
      this.allVertices.set(key, vertex)
    } else if (vertex.value === undefined) {
      vertex.value = value
    }

    // if another node referenced this node before, we have inverse links
    const hasEdges = vertex.next.size > 0 || vertex.previous.size > 0

    if (!options?.after && !options?.before && !hasEdges) {
      // the node we're about to add is fully unlinked
      this.isolatedVertices.set(key, vertex)
      this.emit('node:added', {
        key,
        type: 'isolated',
        value
      })
      return
    } else {
      this.connectedVertices.set(key, vertex)
    }

    if (options?.after) {
      const afterArr = Array.isArray(options.after) ? options.after : [options.after]
      // we need to update the vertex to include the new "after" nodes
      for (const after of afterArr) {
        vertex.previous.add(this.getKey(after))
      }
      for (const after of afterArr) {
        const afterKey = this.getKey(after)
        // we get the vertex from the list of all vertices
        const linkedAfter = this.allVertices.get(afterKey)
        if (!linkedAfter) {
          // if it doesn't exist, we create it
          const newVertex: Vertex<T> = {
            value: undefined, // uninitialized
            previous: new Set(),
            next: new Set([key])
          }
          this.allVertices.set(afterKey, newVertex)
          this.connectedVertices.set(afterKey, newVertex)
        } else {
          // if it does exist, we update it
          linkedAfter.next.add(key)
          // we might need to move the vertex from isolated to connected
          this.moveToConnected(afterKey)
        }
      }
    }
    if (options?.before) {
      const beforeArr = Array.isArray(options.before) ? options.before : [options.before]
      // we need to update the vertex to include the new "before" nodes
      for (const before of beforeArr) {
        vertex.next.add(this.getKey(before))
      }
      for (const before of beforeArr) {
        const beforeKey = this.getKey(before)
        // we get the vertex from the list of all vertices
        const linkedBefore = this.allVertices.get(beforeKey)
        if (!linkedBefore) {
          // if it doesn't exist, we create it
          const newVertex: Vertex<T> = {
            value: undefined, // uninitialized
            previous: new Set([key]),
            next: new Set()
          }
          this.allVertices.set(beforeKey, newVertex)
          this.connectedVertices.set(beforeKey, newVertex)
        } else {
          // if it does exist, we update it
          linkedBefore.previous.add(key)
          // we might need to move the vertex from isolated to connected
          this.moveToConnected(beforeKey)
        }
      }
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
    const unlinkedVertex = this.isolatedVertices.get(removeKey)
    if (unlinkedVertex) {
      this.isolatedVertices.delete(removeKey)
      this.allVertices.delete(removeKey)
      this.emit('node:removed', {
        key: removeKey,
        type: 'isolated'
      })
      return
    }

    // if it's not, it's a bit more complicated
    const linkedVertex = this.connectedVertices.get(removeKey)

    if (!linkedVertex) {
      // The node does not exist in the graph.
      return
    }

    // Update the 'next' nodes that this node points to
    for (const nextKey of linkedVertex.next) {
      const nextVertex = this.connectedVertices.get(nextKey)
      if (nextVertex) {
        nextVertex.previous.delete(removeKey)
        if (nextVertex.previous.size === 0 && nextVertex.next.size === 0) {
          this.moveToIsolated(nextKey)
        }
      }
    }

    // Update the 'previous' nodes that point to this node
    for (const prevKey of linkedVertex.previous) {
      const prevVertex = this.connectedVertices.get(prevKey)
      if (prevVertex) {
        prevVertex.next.delete(removeKey)
        if (prevVertex.previous.size === 0 && prevVertex.next.size === 0) {
          this.moveToIsolated(prevKey)
        }
      }
    }

    // Finally, remove the node from the graph
    this.connectedVertices.delete(removeKey)
    this.allVertices.delete(removeKey)

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
    for (const [, vertex] of this.isolatedVertices) {
      if (vertex.value !== undefined) callback(vertex.value, index++)
    }
  }

  protected getValueByKey(key: Key): T | undefined {
    return this.allVertices.get(key)?.value
  }

  private sort() {
    const inDegree: Map<Key, number> = new Map()
    const zeroInDegreeQueue: Key[] = []
    const result: Key[] = []

    // Initialize inDegree for connected vertices that have a value
    for (const [key, vertex] of this.connectedVertices) {
      if (vertex.value !== undefined) {
        inDegree.set(key, 0)
      }
    }

    // Calculate inDegree for each vertex
    for (const [vertexKey] of inDegree) {
      const vertex = this.connectedVertices.get(vertexKey)!
      for (const next of vertex.next) {
        if (inDegree.has(next)) {
          inDegree.set(next, inDegree.get(next)! + 1)
        }
      }
    }

    // Enqueue vertices with inDegree 0
    for (const [key, degree] of inDegree) {
      if (degree === 0) {
        zeroInDegreeQueue.push(key)
      }
    }

    // Process vertices with inDegree 0 and decrease inDegree of adjacent vertices
    let queueIndex = 0
    while (queueIndex < zeroInDegreeQueue.length) {
      const vertexKey = zeroInDegreeQueue[queueIndex++]
      result.push(vertexKey)

      const nextSet = this.connectedVertices.get(vertexKey)?.next
      if (nextSet) {
        for (const adjVertex of nextSet) {
          const adjVertexInDegree = (inDegree.get(adjVertex) || 0) - 1
          inDegree.set(adjVertex, adjVertexInDegree)
          if (adjVertexInDegree === 0) {
            zeroInDegreeQueue.push(adjVertex)
          }
        }
      }
    }

    // Check for cycles in the graph
    if (result.length !== inDegree.size) {
      throw new Error('The graph contains a cycle, and thus can not be sorted topologically.')
    }

    this.sortedConnectedValues.length = 0
    for (let i = 0; i < result.length; i++) {
      const value = this.connectedVertices.get(result[i])!.value
      if (value !== undefined) {
        this.sortedConnectedValues.push(value)
      }
    }
    this.needsSort = false
  }

  protected clear() {
    this.allVertices.clear()
    this.isolatedVertices.clear()
    this.connectedVertices.clear()
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
