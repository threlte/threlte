import { useThrelteUserContext } from '@threlte/core'
import { get } from 'svelte/store'
import { Object3D } from 'three'
import { BatchedParticleRenderer, ParticleSystem, ParticleEmitter } from 'three.quarks'

type QuarksContext = {
	renderer: InstanceType<typeof BatchedParticleRenderer>
	systems: Set<ParticleSystem>
	addSystem: (system: ParticleSystem) => void
	removeSystem: (system: ParticleSystem) => void
	addObject: (object: Object3D) => ParticleSystem[]
	removeObject: (object: Object3D) => void
}

const isParticleEmitter = (obj: any): obj is ParticleEmitter<any> => obj.type === 'ParticleEmitter'

export const useQuarks = (createContext = false) => {
	if (createContext) {
		const context: QuarksContext = {
			renderer: new BatchedParticleRenderer(),
			systems: new Set<ParticleSystem>(),
			addSystem: (system: ParticleSystem) => {
				context.systems.add(system)
				context.renderer.addSystem(system)
			},
			removeSystem: (system: ParticleSystem) => {
				context.systems.delete(system)
				context.renderer.deleteSystem(system)
			},
			addObject: (object: Object3D) => {
				const systems: ParticleSystem[] = []
				object.traverse((child) => {
					if (isParticleEmitter(child)) {
						context.addSystem(child.system)
						systems.push(child.system)
					}
				})
				if (isParticleEmitter(object)) {
					context.addSystem(object.system)
					systems.push(object.system)
				}
				return systems
			},
			removeObject: (object: Object3D) => {
				object.traverse((child) => {
					if (isParticleEmitter(child)) {
						context.removeSystem(child.system)
					}
				})
				if (isParticleEmitter(object)) {
					context.removeSystem(object.system)
				}
			}
		}
		return useThrelteUserContext('quarks', context, {
			existing: 'skip'
		})
	} else {
		return get(useThrelteUserContext<QuarksContext>('quarks'))
	}
}
