import"./disclose-version.DsnmJJEf.js";import"./legacy.BGYm4LQg.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.BBxoejyG.js";import{f as B,a as D}from"./template.Bs5bR2Nc.js";import{a as O}from"./await.BJOnrYV7.js";import{c as y}from"./svelte-component.BCRxooPF.js";import{as as S,aF as E,ah as _}from"./observe.svelte.CFYFNOc8.js";/* empty css                                                      */import{u as I}from"./useThrelte.o9barqGH.js";import{u as $}from"./useTask.svelte.B27ZeBux.js";import{u as A}from"./useGltf.BJ41WDVK.js";import"./raycast.CJUCE62l.js";import{u as G}from"./useFBO.svelte.D4BjBsib.js";import{E as L}from"./Environment.BYWa43nj.js";import{O as M}from"./OrbitControls.DcjeGTES.js";import{F as Q}from"./Pass.CdU30v92.js";import{C as j}from"./Canvas.BXbx6C4n.js";import"./branches.Bg9W3cxg.js";import"./events.C6-11v6q.js";import"./create-subscriber.CDornkmJ.js";import"./snippet.DUyBEcRR.js";import"./if.UXK_Jlz6.js";import"./props.CGk66viq.js";import"./store.5lYVrety.js";import"./index.DMCjpMEg.js";import"./GLTFLoader.AxzGpG1v.js";import"./BufferGeometryUtils.xrzs_Nyi.js";import"./index-client.Cy63zNyZ.js";import"./useStage.DT-BgVhI.js";import"./injectPlugin.D3y05FLP.js";import"./transitions.Bdo3_t96.js";import"./loop.BGGTUj09.js";import"./render.D4buDWGY.js";import"./RGBELoader.Cij1OawQ.js";import"./useEnvironment.svelte.DQeN6zwm.js";import"./OrbitControls.CPMLV8H2.js";import"./useControlsContext.DO9EMCAm.js";import"./this.q4pHlqVj.js";import"./Context.lmo6U6Sz.js";const z=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var H=B("<!> <!> <!>",1);function J(t,o){b(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=I(),m=G(),k=`
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
	`,w=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new E({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);y(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);O(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:U}=i(s);return{scene:U}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var F=g(v,2);L(F,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Be(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Be as default};
