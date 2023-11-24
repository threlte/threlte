type Vertex<T> = { value: T | undefined; previous: Set<string>; next: Set<string> }

export type AddNodeOptions = {
  before?: string | string[]
  after?: string | string[]
}

export class DAG<T> {
  public allVertices: Record<string, Vertex<T>> = {}

  /** Nodes that are fully unlinked */
  public isolatedVertices: Record<string, Vertex<T>> = {}
  public connectedVertices: Record<string, Vertex<T>> = {}

  public sortedConnectedValues: T[] = []
  public sortedConnectedLabels: string[] = []
  public needsSort = false

  private moveToIsolated(label: string) {
    const vertex = this.connectedVertices[label]
    if (!vertex) return
    this.isolatedVertices[label] = vertex
    delete this.connectedVertices[label]
  }

  private moveToConnected(label: string) {
    const vertex = this.isolatedVertices[label]
    if (!vertex) return
    this.connectedVertices[label] = vertex
    delete this.isolatedVertices[label]
  }

  public add(label: string, value: T, options?: AddNodeOptions) {
    if (this.allVertices[label] && this.allVertices[label].value !== undefined) {
      throw new Error(`A node with the label ${label} already exists`)
    }

    let vertex = this.allVertices[label]

    if (!vertex) {
      vertex = {
        value: value,
        previous: new Set(),
        next: new Set()
      }
      // add the vertex to the list of all vertices
      this.allVertices[label] = vertex
    } else if (vertex.value === undefined) {
      vertex.value = value
    }

    // if another node referenced this node before, we have inverse links
    const hasEdges = vertex.next.size > 0 || vertex.previous.size > 0

    if (!options?.after && !options?.before && !hasEdges) {
      // the node we're about to add is fully unlinked
      this.isolatedVertices[label] = vertex
      return
    } else {
      this.connectedVertices[label] = vertex
    }

    if (options?.after) {
      const afterArr = Array.isArray(options.after) ? options.after : [options.after]
      // we need to update the vertex to include the new "after" nodes
      afterArr.forEach((after) => {
        vertex.previous.add(after)
      })
      afterArr.forEach((after) => {
        // we get the vertex from the list of all vertices
        const linkedAfter = this.allVertices[after]
        if (!linkedAfter) {
          // if it doesn't exist, we create it
          this.allVertices[after] = {
            value: undefined, // uninitialized
            previous: new Set(),
            next: new Set([label])
          }
          this.connectedVertices[after] = this.allVertices[after]
        } else {
          // if it does exist, we update it
          linkedAfter.next.add(label)
          // we might need to move the vertex from isolated to connected
          this.moveToConnected(after)
        }
      })
    }
    if (options?.before) {
      const beforeArr = Array.isArray(options.before) ? options.before : [options.before]
      // we need to update the vertex to include the new "before" nodes
      beforeArr.forEach((before) => {
        vertex.next.add(before)
      })
      beforeArr.forEach((before) => {
        // we get the vertex from the list of all vertices
        const linkedBefore = this.allVertices[before]
        if (!linkedBefore) {
          // if it doesn't exist, we create it
          this.allVertices[before] = {
            value: undefined, // uninitialized
            previous: new Set([label]),
            next: new Set()
          }
          this.connectedVertices[before] = this.allVertices[before]
        } else {
          // if it does exist, we update it
          linkedBefore.previous.add(label)
          // we might need to move the vertex from isolated to connected
          this.moveToConnected(before)
        }
      })
    }

    // Mark the graph as needing a re-sort
    this.needsSort = true
  }

  public remove(label: string) {
    // check if it's an unlinked vertex
    const unlinkedVertex = this.isolatedVertices[label]
    if (unlinkedVertex) {
      delete this.isolatedVertices[label]
      delete this.allVertices[label]
      return
    }

    // if it's not, it's a bit more complicated
    const linkedVertex = this.connectedVertices[label]

    if (!linkedVertex) {
      // The node does not exist in the graph.
      return
    }

    // Update the 'next' nodes that this node points to
    linkedVertex.next.forEach((nextLabel) => {
      const nextVertex = this.connectedVertices[nextLabel]
      if (nextVertex) {
        nextVertex.previous.delete(label)
        if (nextVertex.previous.size === 0 && nextVertex.next.size === 0) {
          this.moveToIsolated(nextLabel)
        }
      }
    })

    // Update the 'previous' nodes that point to this node
    linkedVertex.previous.forEach((prevLabel) => {
      const prevVertex = this.connectedVertices[prevLabel]
      if (prevVertex) {
        prevVertex.next.delete(label)
        if (prevVertex.previous.size === 0 && prevVertex.next.size === 0) {
          this.moveToIsolated(prevLabel)
        }
      }
    })

    // Finally, remove the node from the graph
    delete this.connectedVertices[label]
    delete this.allVertices[label]

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
    Object.values(this.isolatedVertices).forEach((vertex) => {
      if (vertex.value !== undefined) callback(vertex.value, index++)
    })
  }

  protected mapLabels<U>(callback: (value: string, index: number) => U): U[] {
    if (this.needsSort) {
      this.sort()
    }
    const result: U[] = []
    this.forEachLabel((value, index) => {
      result.push(callback(value, index))
    })
    return result
  }

  protected forEachLabel(callback: (value: string, index: number) => void) {
    if (this.needsSort) {
      this.sort()
    }
    let index = 0
    for (; index < this.sortedConnectedLabels.length; index++) {
      callback(this.sortedConnectedLabels[index], index)
    }
    Object.entries(this.isolatedVertices).forEach(([label, vertex]) => {
      if (vertex.value !== undefined) callback(label, index++)
    })
  }

  protected getValueByLabel(label: string): T | undefined {
    return this.allVertices[label]?.value
  }

  protected getLabelByValue(value: T): string | undefined {
    return (
      Object.keys(this.connectedVertices).find(
        (label) => this.connectedVertices[label].value === value
      ) ??
      Object.keys(this.isolatedVertices).find(
        (label) => this.isolatedVertices[label].value === value
      )
    )
  }

  public sort() {
    const inDegree: Map<string, number> = new Map()
    const zeroInDegreeQueue: string[] = []
    const result: string[] = []

    // we're only interested in vertices that have a value
    const connectedVertexKeysWithValues = Object.entries(this.connectedVertices)
      .filter(([_, vertex]) => {
        return vertex.value !== undefined
      })
      .map(([key, _]) => key)

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
    while (zeroInDegreeQueue.length) {
      const vertexLabel = zeroInDegreeQueue.shift()!
      result.push(vertexLabel)

      const v = connectedVertexKeysWithValues.find((label) => label === vertexLabel)

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
      console.log(
        'result',
        result.length,
        'connectedVertexKeysWithValues',
        connectedVertexKeysWithValues.length,
        'result',
        result,
        'connectedVertexKeysWithValues',
        connectedVertexKeysWithValues
      )
      throw new Error('The graph contains a cycle, and thus can not be sorted topologically.')
    }

    const filterUndefined = <T>(value: T | undefined): value is T => value !== undefined

    this.sortedConnectedValues = result
      .map((label) => this.connectedVertices[label].value)
      .filter(filterUndefined)
    this.sortedConnectedLabels = result
    this.needsSort = false
  }

  public clear() {
    this.allVertices = {}
    this.isolatedVertices = {}
    this.connectedVertices = {}
    this.sortedConnectedValues = []
    this.sortedConnectedLabels = []
    this.needsSort = false
  }
}
