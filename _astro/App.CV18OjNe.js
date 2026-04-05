import"./disclose-version.DsnmJJEf.js";import"./legacy.CiYaW_ib.js";import{p as F,N as q,f as P,s as g,g as i,$ as h,a as R}from"./runtime.BsM9HEgF.js";import{f as B,a as D}from"./template.BGiQ9W-B.js";import{a as E}from"./await.7Smc-hRr.js";import{c as O}from"./svelte-component.BIfa6ww3.js";import{b as y,ar as S,aE as I,T as _}from"./observe.svelte.DrZEQxZT.js";/* empty css                                                      */import{u as $}from"./useTask.svelte.B76XSP68.js";import{u as A}from"./useGltf.DlV2tWCp.js";import"./raycast.DGjhj-Rw.js";import{u as G}from"./useFBO.svelte.BCdOv6bA.js";import{E as M}from"./Environment.CXI1CSae.js";import{O as N}from"./OrbitControls.DA4X0lbl.js";import{F as Q}from"./Pass.Hq7z92hK.js";import{C as j}from"./Canvas.B56uvUis.js";import"./branches.DU2v-rCt.js";import"./snippet.pNoFfLl0.js";import"./props.BdgQxxOQ.js";import"./store.BuonI5uc.js";import"./index.ujCWyV9u.js";import"./events.ClkcKFNI.js";import"./create-subscriber.Cjf9iS6d.js";import"./GLTFLoader.DRMQWSWK.js";import"./BufferGeometryUtils.B-Bv4goq.js";import"./if.DEmLpFs9.js";import"./index-client.D_TSzqy_.js";import"./useStage.lBzgv7QK.js";import"./injectPlugin.BWWIGXHB.js";import"./transitions.CSu2MFFA.js";import"./loop.BGGTUj09.js";import"./render.CLVLJyMH.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.CA3vvEq1.js";import"./useEnvironment.svelte.B3afAClG.js";import"./OrbitControls.DRA9WbJx.js";import"./useControlsContext.2WxRlw-O.js";import"./useThrelteUserContext.zvEopyMJ.js";const z=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var H=B("<!> <!> <!>",1);function J(t,o){F(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=y(),m=G(),k=`
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
	`,w=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new I({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);O(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{N(a,{})},$$slots:{default:!0}})});var v=g(d,2);E(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:b}=i(s);return{scene:b}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);M(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Re(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Re as default};
