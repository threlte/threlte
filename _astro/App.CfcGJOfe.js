import"./disclose-version.DsnmJJEf.js";import"./legacy.Bo3sEplC.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.DLdkg5Kz.js";import{f as B,a as D}from"./template.B2QqRX6L.js";import{a as O}from"./await.C_JQfC3T.js";import{c as y}from"./svelte-component.E5E5S4yf.js";import{U as S,a0 as E,a as _}from"./observe.svelte.B1r-IgYf.js";/* empty css                                                      */import{u as I}from"./useThrelte.liR9utg-.js";import{u as $}from"./useTask.svelte.DEJ5MCcn.js";import{u as A}from"./useGltf.C62Tas11.js";import"./raycast.BjhfX-4A.js";import{u as G}from"./useFBO.svelte.CuxIarUy.js";import{E as L}from"./Environment.DSN9XblM.js";import{O as M}from"./OrbitControls.iWEa_L38.js";import"./index.BAuDuV2T.js";import{F as Q}from"./Pass.DtQsnuVG.js";import{C as j}from"./Canvas.BTZmQUQq.js";import"./branches.2gxZijTC.js";import"./events.BHDVKm3g.js";import"./create-subscriber.CY3q5QYX.js";import"./snippet.CCzzTW4D.js";import"./if.CWhf68p6.js";import"./props.BNYK5s9I.js";import"./store.Dey8hlVV.js";import"./index.DoIdvkJn.js";import"./GLTFLoader.BkQh8lVK.js";import"./BufferGeometryUtils.CYMkqXV6.js";import"./index-client.Bk7KcdZe.js";import"./transitions._xWTTcFI.js";import"./loop.BGGTUj09.js";import"./render.jaBnYzsZ.js";import"./injectPlugin.izpkY7Uc.js";import"./RGBELoader.D_V0hotj.js";import"./HDRLoader.DCqVbxAX.js";import"./useEnvironment.svelte.B4pLLnQm.js";import"./OrbitControls.U41HijPW.js";import"./useControlsContext.Bq9mIL5S.js";import"./this.C9eRW5mT.js";import"./Context.CoN_Jksw.js";const z=`
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
