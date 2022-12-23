import InteractivityIcon from '~icons/ri/cursor-fill'
import ViewportAwarenessIcon from '~icons/ri/fullscreen-line'
import ReactivityIcon from '~icons/ri/swap-box-fill'
import DisposalIcon from '~icons/ri/delete-bin-fill'
import MiscellaneousIcon from '~icons/ri/menu-4-line'

export const sidebar = {
	links: {
		'.': [
			{
				title: 'Introduction',
				slug: '/'
			},
			{
				title: 'Getting Started',
				slug: '/getting-started'
			},
			{
				title: 'Examples',
				slug: '/examples'
			},
			{
				title: 'Features',
				slug: '/features'
			},
			{
				title: 'Types',
				slug: '/types'
			},
			{
				title: 'Concepts',
				slug: ''
			},
			{
				title: 'Interactivity',
				slug: '/concepts/interactivity',
				icon: {
					before: InteractivityIcon
				}
			},
			{
				title: 'Viewport Awareness',
				slug: '/concepts/viewport-awareness',
				icon: {
					before: ViewportAwarenessIcon
				}
			},
			{
				title: 'Plugins',
				slug: '/concepts/plugins'
			},
			{
				title: 'Reactivity',
				slug: '/concepts/reactivity',
				icon: {
					before: ReactivityIcon
				}
			},
			{
				title: 'Disposal',
				slug: '/concepts/disposal',
				icon: {
					before: DisposalIcon
				}
			},
			{
				title: 'Miscellaneous',
				slug: '/concepts/miscellaneous',
				icon: {
					before: MiscellaneousIcon
				}
			}
		],
		'@threlte/core': [
			{
				title: 'Canvas',
				slug: '/core/canvas'
			},
			{
				title: 'T',
				slug: '/core/t'
			},
			{
				title: 'Objects',
				slug: ''
			},
			{
				title: 'Mesh',
				slug: '/core/mesh'
			},
			{
				title: 'Controls',
				slug: ''
			},
			{
				title: 'OrbitControls',
				slug: '/core/orbit-controls'
			},
			{
				title: 'Post Processing',
				slug: ''
			},
			{
				title: 'Pass',
				slug: '/core/pass'
			},
			{
				title: 'Misc',
				slug: ''
			},
			{
				title: 'Layers',
				slug: '/core/layers'
			},
			{
				title: 'ContextBridge',
				slug: '/core/context-bridge'
			},
			{
				title: 'Instances',
				slug: ''
			},
			{
				title: 'Object3DInstance',
				slug: '/core/object3d-instance'
			},
			{
				title: 'MeshInstance',
				slug: '/core/mesh-instance'
			},
			{
				title: 'Traits',
				slug: ''
			},
			{
				title: 'HierarchicalObject',
				slug: '/core/hierarchical-object'
			},
			{
				title: 'SceneGraphObject',
				slug: '/core/scene-graph-object'
			},
			{
				title: 'TransformableObject',
				slug: '/core/transformable-object'
			},
			{
				title: 'ViewportAwareObject',
				slug: '/core/viewport-aware-object'
			},
			{
				title: 'InteractiveObject',
				slug: '/core/interactive-object'
			},
			{
				title: 'DisposableObject',
				slug: '/core/disposable-object'
			},
			{
				title: 'Hooks',
				slug: ''
			},
			{
				title: 'useThrelte',
				slug: '/core/use-threlte'
			},
			{
				title: 'useThrelteRoot',
				slug: '/core/use-threlte-root'
			},
			{
				title: 'useFrame',
				slug: '/core/use-frame'
			},
			{
				title: 'useRender',
				slug: '/core/use-render'
			},
			{
				title: 'useLoader',
				slug: '/core/use-loader'
			},
			{
				title: 'useTexture',
				slug: '/core/use-texture'
			}
		],
		'@threlte/extras': [
			{
				title: 'Hooks',
				slug: ''
			},
			{
				title: 'useGltf',
				slug: '/extras/use-gltf'
			},
			{
				title: 'useGltfAnimations',
				slug: '/extras/use-gltf-animations'
			},
			{
				title: 'useCursor',
				slug: '/extras/use-cursor'
			},
			{
				title: 'useProgress',
				slug: '/extras/use-progress'
			},
			{
				title: 'Components',
				slug: ''
			},
			{
				title: 'GLTF',
				slug: '/extras/gltf'
			},
			{
				title: 'Text',
				slug: '/extras/text'
			},
			{
				title: 'Edges',
				slug: '/extras/edges'
			},
			{
				title: 'HTML',
				slug: '/extras/html'
			},
			{
				title: 'Float',
				slug: '/extras/float'
			},
			{
				title: 'ContactShadows',
				slug: '/extras/contact-shadows'
			},
			{
				title: 'Disposables',
				slug: '/extras/disposables'
			},
			{
				title: 'Environment',
				slug: '/extras/environment'
			},
			{
				title: 'TransformControls',
				slug: '/extras/transform-controls'
			},
			{
				title: 'Grid',
				slug: '/extras/grid'
			},
			{
				title: 'Audio',
				slug: ''
			},
			{
				title: 'AudioListener',
				slug: '/extras/audio-listener'
			},
			{
				title: 'Audio',
				slug: '/extras/audio'
			},
			{
				title: 'PositionalAudio',
				slug: '/extras/positional-audio'
			},
			{
				title: 'useAudioListener',
				slug: '/extras/use-audio-listener'
			},
			{
				title: 'useThrelteAudio',
				slug: '/extras/use-threlte-audio'
			},
			{
				title: 'Instance',
				slug: '/extras/instance'
			},
			{
				title: 'InstancedMesh',
				slug: '/extras/instanced-mesh'
			}
		],
		'@threlte/theatre': [
			{
				title: 'Getting Started',
				slug: '/theatre/getting-started'
			},
			{
				title: 'Components',
				slug: ''
			},
			{
				title: 'Theatre',
				slug: '/theatre/theatre'
			},
			{
				title: 'Studio',
				slug: '/theatre/studio'
			},
			{
				title: 'Project',
				slug: '/theatre/project'
			},
			{
				title: 'Sheet',
				slug: '/theatre/sheet'
			},
			{
				title: 'Editable',
				slug: '/theatre/editable'
			}
		],
		'@threlte/rapier': [
			{
				title: 'Getting Started',
				slug: '/rapier/getting-started'
			},
			{
				title: 'Components',
				slug: ''
			},
			{
				title: 'World',
				slug: '/rapier/world'
			},

			{
				title: 'RigidBody',
				slug: '/rapier/rigid-body'
			},
			{
				title: 'Collider',
				slug: '/rapier/collider'
			},
			{
				title: 'AutoColliders',
				slug: '/rapier/auto-colliders'
			},
			{
				title: 'CollisionGroups',
				slug: '/rapier/collision-groups'
			},
			{
				title: 'Attractor',
				slug: '/rapier/attractor'
			},
			{
				title: 'Debug',
				slug: '/rapier/debug'
			},
			{
				title: 'Hooks',
				slug: ''
			},
			{
				title: 'useRapier',
				slug: '/rapier/use-rapier'
			},
			{
				title: 'useCollisionGroups',
				slug: '/rapier/use-collision-groups'
			},
			{
				title: 'useRigidBody',
				slug: '/rapier/use-rigid-body'
			},
			{
				title: 'Joints',
				slug: ''
			},
			{
				title: 'About Joints',
				slug: '/rapier/about-joints'
			},
			{
				title: 'useJoint',
				slug: '/rapier/use-joint'
			},
			{
				title: 'useFixedJoint',
				slug: '/rapier/use-fixed-joint'
			},
			{
				title: 'useRevoluteJoint',
				slug: '/rapier/use-revolute-joint'
			},
			{
				title: 'useSphericalJoint',
				slug: '/rapier/use-spherical-joint'
			},
			{
				title: 'usePrismaticJoint',
				slug: '/rapier/use-prismatic-joint'
			},
			{
				title: 'Recipes',
				slug: ''
			},
			{
				title: 'Basic Vehicle Controller',
				slug: '/rapier/basic-vehicle-controller'
			}
		]
	}
}
