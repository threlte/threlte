import { MeshBasicMaterial, Object3D, SkinnedMesh, WebGLRenderer, type XRHandSpace } from "three";
import { GLTFLoader, XRHandModelFactory } from "three/examples/jsm/Addons.js";

let hand1: XRHandSpace, hand2: XRHandSpace;

export function setupHands(renderer: WebGLRenderer)
{      
  
const gltf = new GLTFLoader();
gltf.setPath('/models/xr/');

 const updateHandMesh = (object: Object3D)=>{
    const mesh = object.getObjectByProperty( 'type', 'SkinnedMesh' ) as SkinnedMesh;

    if (mesh)
    {
	mesh.material = new MeshBasicMaterial({color: "#1b2866" });
	mesh.frustumCulled = false;
	mesh.castShadow = false;
	mesh.receiveShadow = false;
    }
    };

    const handModelFactory = new XRHandModelFactory(gltf, updateHandMesh);

  	hand1 = renderer.xr.getHand( 0 );    
    hand1.add(handModelFactory.createHandModel( hand1, 'mesh' ));
                
    hand2 = renderer.xr.getHand( 1 );    
    hand2.add(handModelFactory.createHandModel( hand2, 'mesh' ));

    return {leftHand: hand1, rightHand: hand2, handFactory: handModelFactory};
}