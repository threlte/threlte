import { Color } from 'three'
import type { ColorRepresentation } from 'three'

export const convertColorRepresentationToColor = (
	colorRep: ColorRepresentation,
	linear: boolean
) => {
	if (linear) return new Color(colorRep)
	return new Color().setHex(new Color(colorRep).getHex()).convertSRGBToLinear()
}
