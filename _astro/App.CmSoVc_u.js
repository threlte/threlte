import"./disclose-version.DsnmJJEf.js";import"./legacy.zjNW9yEZ.js";import{p as F,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.HAn2cbcW.js";import{f as B,a as D}from"./template.D0onEdCl.js";import{a as E}from"./await.BVhhPuM0.js";import{c as O}from"./svelte-component.DYzPROXC.js";import{b as y,ar as S,aE as I,T as _}from"./observe.svelte.itpAhydl.js";/* empty css                                                      */import{u as $}from"./useTask.svelte.DDWhef3l.js";import{u as A}from"./useGltf.DJr9CqBA.js";import"./raycast.Drgejvs7.js";import{u as G}from"./useFBO.svelte.D5TtQaqs.js";import{E as L}from"./Environment.BV89llbb.js";import{O as M}from"./OrbitControls.DLaH5z45.js";import{F as Q}from"./Pass.BGbVM5i6.js";import{C as j}from"./Canvas.BCv1lvD-.js";import"./branches.DmVhxYr2.js";import"./snippet.ILc-veMr.js";import"./props.DsKWk81K.js";import"./store.BmD_Ou3p.js";import"./index.BH4vLsnN.js";import"./events.BvDTqhu8.js";import"./create-subscriber.BzboetKF.js";import"./GLTFLoader.DWTADoD_.js";import"./BufferGeometryUtils.DXyhYUWx.js";import"./if.Lug6H8hl.js";import"./index-client.CKKesSrH.js";import"./useStage.Dfwqv9S8.js";import"./injectPlugin.BSvvg6Ez.js";import"./transitions.BxEO2i3S.js";import"./loop.BGGTUj09.js";import"./render.Bbi3B6Ko.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.BZKP4Ssh.js";import"./useEnvironment.svelte.CuOAPEI9.js";import"./OrbitControls.Ex9Zyenw.js";import"./useControlsContext.BkW1Ewt2.js";import"./useThrelteUserContext.BZnrmjYn.js";const z=`
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
