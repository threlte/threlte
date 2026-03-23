import { NotEqualStencilFunc, EqualStencilFunc, KeepStencilOp } from 'three'
/**
 * Use in combination with the Mask component.
 *
 * @param id number to link useMask objects with <Mask>
 * @param inverse inverse the mask
 */
export const useMask = (id = 1, inverse = false) => {
  return {
    stencilRef: id,
    stencilWrite: true,
    stencilFunc: inverse ? NotEqualStencilFunc : EqualStencilFunc,
    stencilFail: KeepStencilOp,
    stencilZFail: KeepStencilOp,
    stencilZPass: KeepStencilOp
  }
}
