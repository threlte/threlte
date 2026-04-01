import"./disclose-version.DsnmJJEf.js";import"./legacy.CiYaW_ib.js";import{p as F,N as q,f as P,s as g,g as i,$ as h,a as R}from"./runtime.BsM9HEgF.js";import{f as B,a as D}from"./template.BGiQ9W-B.js";import{a as O}from"./await.7Smc-hRr.js";import{c as y}from"./svelte-component.BIfa6ww3.js";import{u as E}from"./useGltf.CCjEgGbr.js";import{b as G,at as S,aG as I,T as _}from"./observe.svelte.CpLsxWCV.js";/* empty css                                                      */import{u as $}from"./useTask.svelte.BIdf647n.js";import"./raycast.BjdWmyxG.js";import{u as A}from"./useFBO.svelte.DJL2YooJ.js";import{E as M}from"./Environment.CZD-6oZG.js";import{O as N}from"./OrbitControls.Cepv2xU7.js";import{F as Q}from"./Pass.O0UmSIby.js";import{C as j}from"./Canvas.B2gaXdQD.js";import"./branches.DU2v-rCt.js";import"./GLTFLoader.B5uW6kkG.js";import"./BufferGeometryUtils.CCqzYzwA.js";import"./snippet.pNoFfLl0.js";import"./props.BdgQxxOQ.js";import"./store.BuonI5uc.js";import"./index.ujCWyV9u.js";import"./events.ClkcKFNI.js";import"./create-subscriber.Cjf9iS6d.js";import"./if.DEmLpFs9.js";import"./index-client.D_TSzqy_.js";import"./useStage.GPR6E9rH.js";import"./injectPlugin.oLpntuRh.js";import"./transitions.CSu2MFFA.js";import"./loop.BGGTUj09.js";import"./render.CLVLJyMH.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.DD-10_Rh.js";import"./useEnvironment.svelte.B-NkTRsP.js";import"./OrbitControls.DXY7XKCf.js";import"./useControlsContext.D6-GXOBu.js";import"./useThrelteUserContext.BnZJeu9W.js";const z=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var H=B("<!> <!> <!>",1);function J(t,o){F(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=G(),m=A(),k=`
		uniform sampler2D uScene;
		uniform float uTime;

		varying vec2 vUv;

		void main() {

			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

			vec2 center = vec2(0.5, 0.5);

			float radius = 1.0 - 0.5 * (1.0 + sin(uTime));

			if (length(center - vUv) - radius < 0.0) {
				gl_FragColor = texture2D(uScene, vUv);
			}
		}
	`,w=E("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new I({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);y(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{N(a,{})},$$slots:{default:!0}})});var v=g(d,2);O(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:b}=i(s);return{scene:b}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);M(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Re(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Re as default};
