import"./disclose-version.DsnmJJEf.js";import"./legacy.BAky0bDD.js";import{p as b,L as q,f as O,s as g,g as i,u as h,a as P}from"./runtime.BedC1VoK.js";import{f as R,a as B}from"./template.CRvxzHa8.js";import{a as D}from"./await.CnP6XzEZ.js";import{c as y}from"./svelte-component.CJo0mFpZ.js";import{U as S,O as E,h as _}from"./observe.svelte.CfGpyHIb.js";/* empty css                                                      */import{u as I}from"./useThrelte.BeIV9kYF.js";import{u as $}from"./useTask.svelte.DevRmSGz.js";import{u as A}from"./useGltf.B50-9hqi.js";import"./raycast.CqghNW2K.js";import{u as G}from"./useFBO.svelte.BmsBomZa.js";import{E as L}from"./Environment.CzTYuqWM.js";import{O as M}from"./OrbitControls.Cw4GxMi0.js";import"./index.CuHW201-.js";import{F as Q}from"./Pass.4RuXbUTr.js";import{C as j}from"./Canvas.DTUL7dTb.js";import"./branches.DlyjgEAM.js";import"./events.B4V7XOco.js";import"./create-subscriber.BcgUO-BS.js";import"./snippet.DJLeyYvd.js";import"./if.CiNDarPD.js";import"./props.IXTf2h6r.js";import"./store.2D4VV-eu.js";import"./index.B1I5-WlL.js";import"./GLTFLoader.CNTaEwxv.js";import"./BufferGeometryUtils.DM4HpWZ8.js";import"./index-client.CdY_DjQS.js";import"./transitions.R9TyKVy9.js";import"./loop.BGGTUj09.js";import"./render.BWbGX-_p.js";import"./injectPlugin.DEz6-eQ3.js";import"./RGBELoader.Ds5kv_ke.js";import"./HDRLoader.C2ofd13u.js";import"./useEnvironment.svelte.CyHGh-EA.js";import"./OrbitControls.DOWVDKdd.js";import"./useControlsContext.IjVnfh6o.js";import"./this.C6Ymr4aF.js";import"./Context.Ujje1ITu.js";const z=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var H=R("<!> <!> <!>",1);function J(t,o){b(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=I(),m=G(),k=`
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
	`,w=A("/models/spaceships/Bob.gltf"),U=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new E({fragmentShader:k,uniforms:{uScene:U,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=O(c);y(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);D(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:F}=i(s);return{scene:F}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var C=g(v,2);L(C,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),B(t,c),P()}function Be(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Be as default};
