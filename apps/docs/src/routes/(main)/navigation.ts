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
				title: 'Three',
				slug: '/core/three'
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
				title: 'InstancedMesh',
				slug: '/core/instanced-mesh'
			},
			{
				title: 'Instance',
				slug: '/core/instance'
			},
			{
				title: 'Group',
				slug: '/core/group'
			},
			{
				title: 'Object3D',
				slug: '/core/object3d'
			},
			{
				title: 'Line',
				slug: '/core/line'
			},
			{
				title: 'Line2',
				slug: '/core/line-2'
			},
			{
				title: 'LineSegments',
				slug: '/core/line-segments'
			},
			{
				title: 'Cameras',
				slug: ''
			},
			{
				title: 'PerspectiveCamera',
				slug: '/core/perspective-camera'
			},
			{
				title: 'OrthographicCamera',
				slug: '/core/orthographic-camera'
			},
			{
				title: 'Lights',
				slug: ''
			},
			{
				title: 'AmbientLight',
				slug: '/core/ambient-light'
			},
			{
				title: 'DirectionalLight',
				slug: '/core/directional-light'
			},
			{
				title: 'HemisphereLight',
				slug: '/core/hemisphere-light'
			},
			{
				title: 'PointLight',
				slug: '/core/point-light'
			},
			{
				title: 'SpotLight',
				slug: '/core/spot-light'
			},
			{
				title: 'Audio',
				slug: ''
			},
			{
				title: 'AudioListener',
				slug: '/core/audio-listener'
			},
			{
				title: 'Audio',
				slug: '/core/audio'
			},
			{
				title: 'PositionalAudio',
				slug: '/core/positional-audio'
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
				title: 'TransformControls',
				slug: '/core/transform-controls'
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
				title: 'Fog',
				slug: '/core/fog'
			},
			{
				title: 'FogExp2',
				slug: '/core/fog-exp-2'
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
				title: 'Helpers',
				slug: ''
			},
			{
				title: 'PositionalAudioHelper',
				slug: '/core/positional-audio-helper'
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
				title: 'CameraInstance',
				slug: '/core/camera-instance'
			},
			{
				title: 'LightInstance',
				slug: '/core/light-instance'
			},
			{
				title: 'AudioInstance',
				slug: '/core/audio-instance'
			},
			{
				title: 'LineInstance',
				slug: '/core/line-instance'
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
				title: 'LayerableObject',
				slug: '/core/layerable-object'
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
				title: 'useThrelteAudio',
				slug: '/core/use-threlte-audio'
			},
			{
				title: 'useFrame',
				slug: '/core/use-frame'
			},
			{
				title: 'useLoader',
				slug: '/core/use-loader'
			},
			{
				title: 'useTexture',
				slug: '/core/use-texture'
			},
			{
				title: 'useAudioListener',
				slug: '/core/use-audio-listener'
			}
		],
		'@threlte/preprocess': [
			{
				title: 'preprocessThrelte',
				slug: '/preprocess/preprocessThrelte'
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
				title: 'Grid',
				slug: '/extras/grid'
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
