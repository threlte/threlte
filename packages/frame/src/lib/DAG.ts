type Vertex<T> = { value: T; previous: Set<string>; next: Set<string> }

export type AddNodeOptions = {
  before?: string | string[]
  after?: string | string[]
}

export class DAG<T> {
  /**
   * inverse links are used to keep track of nodes that reference this node as "before" or "after"
   */
  public inverseLinks: Record<
    string,
    {
      /** Nodes in the next set referenced this node as "before" and are stored in linked */
      next: Set<string>
      /** Nodes in the previous set referenced this node as "after" and are stored in linked */
      previous: Set<string>
    }
  > = {}

  /** Nodes that are fully unlinked */
  public unlinked: Record<string, Vertex<T>> = {}

  public linked: Record<string, Vertex<T>> = {}

  public sortedLinked: T[] = []
  public sortedLabels: string[] = []
  public needsSort = false

  public add(label: string, value: T, options?: AddNodeOptions) {
    let inverseLinks = this.inverseLinks[label]

    if (!inverseLinks) {
      inverseLinks = {
        next: new Set(),
        previous: new Set()
      }
      this.inverseLinks[label] = inverseLinks
    }

    const vertex: Vertex<T> = {
      value,
      previous: inverseLinks.previous ?? new Set(),
      next: inverseLinks.next ?? new Set()
    }

    // if another node referenced this node before, we have inverse links
    const hasLinks = vertex.next.size > 0 || vertex.previous.size > 0

    if (!options?.after && !options?.before && !hasLinks) {
      // the node we're about to add is fully unlinked
      this.unlinked[label] = vertex
      return
    } else if (this.inverseLinks[label]) {
      // the node we're about to add needs to be linked to an existing node.
      const { next, previous } = this.inverseLinks[label]
      previous.forEach((p) => {
        vertex.previous.add(p)
      })
      next.forEach((n) => {
        vertex.next.add(n)
      })
    }

    if (options?.after) {
      const afterArr = Array.isArray(options.after) ? options.after : [options.after]
      vertex.previous = new Set(afterArr)
      afterArr.forEach((after) => {
        // the referenced vertex needs to be updated
        const linkedAfter = this.linked[after]
        if (linkedAfter) {
          linkedAfter.next.add(label)
        } else {
          // maybe it's unlinked?
          const unlinkedAfter = this.unlinked[after]
          if (unlinkedAfter) {
            unlinkedAfter.next.add(label)
            // move to linked
            this.linked[after] = unlinkedAfter
            delete this.unlinked[after]
          }
        }

        // update the inverse links
        const inverseLinks = this.inverseLinks[after]
        if (inverseLinks) {
          inverseLinks.next.add(label)
        } else {
          this.inverseLinks[after] = {
            next: new Set([label]),
            previous: new Set()
          }
        }
      })
    }
    if (options?.before) {
      const beforeArr = Array.isArray(options.before) ? options.before : [options.before]
      vertex.next = new Set(beforeArr)
      beforeArr.forEach((before) => {
        // the referenced vertex needs to be updated
        const linkedBefore = this.linked[before]
        if (linkedBefore) {
          linkedBefore.previous.add(label)
        } else {
          // maybe it's unlinked?
          const unlinkedBefore = this.unlinked[before]
          if (unlinkedBefore) {
            unlinkedBefore.previous.add(label)
            // move to linked
            this.linked[before] = unlinkedBefore
            delete this.unlinked[before]
          }
        }

        // update the inverse links
        const inverseLinks = this.inverseLinks[before]
        if (inverseLinks) {
          inverseLinks.previous.add(label)
        } else {
          this.inverseLinks[before] = {
            next: new Set(),
            previous: new Set([label])
          }
        }
      })
    }

    this.linked[label] = vertex
    this.needsSort = true
  }

  public remove(label: string) {
    // check if it's an unlinked node
    const unlinked = this.unlinked[label]
    if (unlinked) {
      delete this.unlinked[label]
      return
    }

    // if it's not, it's a bit more complicated
    const linked = this.linked[label]

    if (!linked) {
      // The node does not exist in the graph.
      return
    }

    // Update the 'next' nodes that this node points to
    linked.next.forEach((nextLabel) => {
      const nextNode = this.linked[nextLabel]
      if (nextNode) {
        nextNode.previous.delete(label)
        // If the next node has no more previous and next links, it becomes unlinked
        if (nextNode.previous.size === 0 && nextNode.next.size === 0) {
          this.unlinked[nextLabel] = nextNode
          delete this.linked[nextLabel]
        }
      }

      // Update inverse links for the next nodes
      if (this.inverseLinks[nextLabel]) {
        this.inverseLinks[nextLabel].previous.delete(label)
      }
    })

    // Update the 'previous' nodes that point to this node
    linked.previous.forEach((prevLabel) => {
      const prevNode = this.linked[prevLabel]
      if (prevNode) {
        prevNode.next.delete(label)
        // If the prev node has no more next links and no more previous links, it becomes unlinked
        if (prevNode.next.size === 0 && prevNode.previous.size === 0) {
          this.unlinked[prevLabel] = prevNode
          delete this.linked[prevLabel]
        }
      }

      // Update inverse links for the previous nodes
      if (this.inverseLinks[prevLabel]) {
        this.inverseLinks[prevLabel].next.delete(label)
      }
    })

    // Finally, delete the node from linked and inverseLinks
    delete this.linked[label]
    delete this.inverseLinks[label]

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
    for (; index < this.sortedLinked.length; index++) {
      callback(this.sortedLinked[index], index)
    }
    Object.values(this.unlinked).forEach((vertex) => {
      callback(vertex.value, index++)
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
    for (; index < this.sortedLabels.length; index++) {
      callback(this.sortedLabels[index], index)
    }
    Object.keys(this.unlinked).forEach((label) => {
      callback(label, index++)
    })
  }

  protected getValueByLabel(label: string): T | undefined {
    return this.linked[label].value ?? this.unlinked[label]?.value
  }

  protected getLabelByValue(value: T): string | undefined {
    return (
      Object.keys(this.linked).find((label) => this.linked[label].value === value) ??
      Object.keys(this.unlinked).find((label) => this.unlinked[label].value === value)
    )
  }

  public sort() {
    const inDegree: Map<string, number> = new Map()
    const zeroInDegreeQueue: string[] = []
    const result: string[] = []

    // Initialize inDegree (count of incoming edges) for each vertex
    Object.keys(this.linked).forEach((vertex) => {
      inDegree.set(vertex, 0)
    })

    // Calculate inDegree for each vertex
    Object.values(this.linked).forEach((vertex) => {
      vertex.next.forEach((next) => {
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

      const v = Object.keys(this.linked).find((label) => label === vertexLabel)

      if (v) {
        this.linked[v]?.next.forEach((adjVertex) => {
          const adjVertexInDegree = (inDegree.get(adjVertex) || 0) - 1
          inDegree.set(adjVertex, adjVertexInDegree)
          if (adjVertexInDegree === 0) {
            zeroInDegreeQueue.push(adjVertex)
          }
        })
      }
    }

    // Check for cycles in the graph
    if (result.length !== Object.keys(this.linked).length) {
      throw new Error('The graph contains a cycle, and thus can not be sorted topologically.')
    }

    this.sortedLinked = result.map((label) => this.linked[label].value)
    this.sortedLabels = result
    this.needsSort = false
  }
}
