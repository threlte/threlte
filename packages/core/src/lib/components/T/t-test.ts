type AnyProps = Record<string, any>

type Pierced = Partial<Record<`position.${'x'|'y'|'z'}`, number>>

// Current shape: AnyProps intersected with pierced keys
type WithAny = AnyProps & Pierced
// Narrowed dotted-pattern index instead of Record<string, any>
type DottedIndex = { [k: `${string}.${string}`]: any }
type WithDotted = DottedIndex & Pierced
// No covering index at all
type NoIndex = Pierced

declare const a: WithAny
declare const b: WithDotted
declare const c: NoIndex

// what type does position.x resolve to in each?
const ax: number = a["position.x"]   // if this errors, value is not number
const bx: number = b["position.x"]
const cx: number = c["position.x"]

// typo behavior on a FLAT prop
type FlatChecked = Pierced & { fov: number }
declare const d: FlatChecked
// @ts-expect-error unknown prop should error when no string index
d.positon
