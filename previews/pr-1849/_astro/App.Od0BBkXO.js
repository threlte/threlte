import"./disclose-version.DsnmJJEf.js";import"./legacy.Bo3sEplC.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.DLdkg5Kz.js";import{f as B,a as D}from"./template.B2QqRX6L.js";import{a as O}from"./await.C_JQfC3T.js";import{c as y}from"./svelte-component.E5E5S4yf.js";import{U as S,a0 as E,a as _}from"./observe.svelte.CmjctptC.js";/* empty css                                                      */import{u as I}from"./useThrelte.BExRv3o8.js";import{u as $}from"./useTask.svelte.wM_--mkW.js";import{u as A}from"./useGltf.BODxNeax.js";import"./raycast.BAM67R9A.js";import{u as G}from"./useFBO.svelte.BZ9m3w5t.js";import{E as L}from"./Environment.CVXcWSzo.js";import{O as M}from"./OrbitControls.DtYlyT3e.js";import"./index.illIopZv.js";import{F as Q}from"./Pass.Dup4FtjX.js";import{C as j}from"./Canvas.DAOEWUup.js";import"./branches.2gxZijTC.js";import"./events.BHDVKm3g.js";import"./create-subscriber.CY3q5QYX.js";import"./index.DoIdvkJn.js";import"./snippet.CCzzTW4D.js";import"./if.CWhf68p6.js";import"./props.C0aiEMAr.js";import"./store.BOc5wNBj.js";import"./GLTFLoader.Bj6ImPY7.js";import"./BufferGeometryUtils.DZHwJS_O.js";import"./index-client.Bk7KcdZe.js";import"./transitions._xWTTcFI.js";import"./loop.BGGTUj09.js";import"./render.jaBnYzsZ.js";import"./injectPlugin.BsikqEG8.js";import"./RGBELoader.BsOlX4bu.js";import"./HDRLoader.h9UW-DqN.js";import"./useEnvironment.svelte.BivZeci8.js";import"./OrbitControls.DEbzxhIh.js";import"./useControlsContext.svelte.fzcq7XpI.js";import"./this.C9eRW5mT.js";import"./Context.DcsLklHM.js";const z=`
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
	`,w=A("/models/spaceships/Bob.gltf"),U=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new E({fragmentShader:k,uniforms:{uScene:U,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);y(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);O(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:F}=i(s);return{scene:F}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var C=g(v,2);L(C,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function De(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{De as default};
