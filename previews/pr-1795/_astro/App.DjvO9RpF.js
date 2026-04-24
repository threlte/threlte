import"./disclose-version.DsnmJJEf.js";import"./legacy.CUIl4KX-.js";import{p as F,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.D20saW8m.js";import{f as B,a as D}from"./template.DY3hUOmN.js";import{a as E}from"./await.BumtOvqZ.js";import{c as O}from"./svelte-component.C-qodc9T.js";import{b as y,ar as S,aE as I,T as _}from"./observe.svelte.DDw9hZ_4.js";/* empty css                                                      */import{u as $}from"./useTask.svelte.DgOMa9PG.js";import{u as A}from"./useGltf.ZR5rIxEC.js";import"./raycast.B6Zw1_kC.js";import{u as G}from"./useFBO.svelte.BMVUlZHL.js";import{E as L}from"./Environment.CRAweEeB.js";import{O as M}from"./OrbitControls.CrWp9T58.js";import{F as Q}from"./Pass.Cdk1Cs3_.js";import{C as j}from"./Canvas.CXRz6bAw.js";import"./branches.HJW2H96n.js";import"./snippet.ZYtLD8wA.js";import"./props.BLzNsRtJ.js";import"./store.Djq20Duq.js";import"./index.XLhfXAo9.js";import"./events.D9j-qKmp.js";import"./create-subscriber.DvowZspB.js";import"./GLTFLoader.D-tR-qzR.js";import"./BufferGeometryUtils.TdCEhyr-.js";import"./if.KLqBe-U_.js";import"./index-client.Ci3t-hyE.js";import"./useStage.D-sVePfc.js";import"./injectPlugin.DRFifCzz.js";import"./transitions.Dv_byTtB.js";import"./loop.BGGTUj09.js";import"./render.CEiySluT.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.VTREYDhc.js";import"./useEnvironment.svelte.jXZSs9jD.js";import"./OrbitControls.BHSexTlS.js";import"./useControlsContext.q2OBSLe7.js";import"./useThrelteUserContext.CqzfZKqo.js";const z=`
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
	`,w=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new I({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);O(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);E(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:b}=i(s);return{scene:b}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);L(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Re(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Re as default};
