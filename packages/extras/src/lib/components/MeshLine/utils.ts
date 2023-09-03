export const setXYZXYZ = (array: number[], location: number, x: number, y: number, z: number) => {
    array[location + 0] = x
    array[location + 1] = y
    array[location + 2] = z

    array[location + 3] = x
    array[location + 4] = y
    array[location + 5] = z
}

export const setXY = (array: number[], location: number, x: number, y: number) => {
    array[location + 0] = x
    array[location + 1] = y
}

export const setXYZ = (array: number[], location: number, x: number, y: number, z: number) => {
    array[location + 0] = x
    array[location + 1] = y
    array[location + 2] = z
}

export const setXYZW = (array: number[], location: number, x: number, y: number, z: number, w: number) => {
    array[location + 0] = x
    array[location + 1] = y
    array[location + 2] = z
    array[location + 3] = w
}
