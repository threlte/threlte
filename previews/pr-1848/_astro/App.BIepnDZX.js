import"./disclose-version.DsnmJJEf.js";import"./legacy.DjCI_422.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.3jYt74No.js";import{f as B,a as D}from"./template.CpvGzssW.js";import{a as O}from"./await.DjhBPpzh.js";import{c as y}from"./svelte-component.qB0j9a7X.js";import{aw as S,aJ as E,T as _}from"./observe.svelte.CVlCLWA3.js";/* empty css                                                      */import{u as I}from"./useThrelte.CPL2gdtw.js";import{u as $}from"./useTask.svelte.BysGn3n3.js";import{u as A}from"./useGltf.BD964_Bf.js";import"./raycast.CzIU-juO.js";import{u as G}from"./useFBO.svelte.DxWUtcr1.js";import{E as J}from"./Environment.m8lp2pzm.js";import{O as L}from"./OrbitControls.D4hgZpY1.js";import{F as M}from"./Pass.Ds4SaRsF.js";import{C as Q}from"./Canvas.CEdw3g5V.js";import"./branches.Cxp0g7tn.js";import"./events.AJ0V1eO_.js";import"./create-subscriber.CFwRVhEX.js";import"./snippet.XPguuNiB.js";import"./if.BsgnrgNI.js";import"./props.CcFK4OJe.js";import"./store.loD0vJoI.js";import"./index.O4qDo1K1.js";import"./GLTFLoader.BVDuXeXQ.js";import"./BufferGeometryUtils.C-5JdX4o.js";import"./index-client.BGEJmJWi.js";import"./useStage.u1KOngrl.js";import"./injectPlugin.Hx3FzA5b.js";import"./transitions.DQHUIezk.js";import"./loop.BGGTUj09.js";import"./render.CwIN2h0S.js";import"./RGBELoader.DeCT1O9M.js";import"./useEnvironment.svelte.DLrjyxw2.js";import"./OrbitControls.BMV-o_Ms.js";import"./useControlsContext.C6FFAAAr.js";import"./this.ZsAq8vyK.js";import"./Context.BdDapL1z.js";const j=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var z=B("<!> <!> <!>",1);function H(t,o){b(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=I(),m=G(),w=`
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
	`,k=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new E({fragmentShader:w,uniforms:{uScene:C,uTime:p},vertexShader:j}),l=new M(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=z(),d=P(c);y(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{L(a,{})},$$slots:{default:!0}})});var v=g(d,2);O(v,()=>k,null,(e,s)=>{var a=h(()=>{var{scene:F}=i(s);return{scene:F}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);J(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Be(t){Q(t,{autoRender:!1,children:(o,n)=>{H(o,{})},$$slots:{default:!0}})}export{Be as default};
