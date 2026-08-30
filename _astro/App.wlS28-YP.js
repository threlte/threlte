import"./disclose-version.DsnmJJEf.js";import"./legacy.CFq86F04.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.Cq5xh0TU.js";import{f as B,a as D}from"./template.L6xDPO6U.js";import{a as O}from"./await.CvR1qv4C.js";import{c as y}from"./svelte-component.B_Rq4ZKt.js";import{au as S,aH as E,a as _}from"./observe.svelte.DGtC0W2K.js";/* empty css                                                      */import{u as I}from"./useThrelte.Bj7aS8bK.js";import{u as $}from"./useTask.svelte.-OFSceYc.js";import{u as A}from"./useGltf.DwLKN9qT.js";import"./raycast.DUx7E7ZN.js";import{u as G}from"./useFBO.svelte.CYBaLh8x.js";import{E as H}from"./Environment.Cg6RdUT-.js";import{O as L}from"./OrbitControls.D_sx7gN_.js";import{F as M}from"./Pass.B2ZMwWLi.js";import{C as Q}from"./Canvas.XtXJWPA2.js";import"./branches.CjZ4fCu_.js";import"./events.-BVBOS9k.js";import"./create-subscriber.Cxqb2LK-.js";import"./snippet.B1WTn4og.js";import"./if.eGY2C9_P.js";import"./props.BuNG_qsO.js";import"./store.Bdk9semh.js";import"./index.D-QOJTr1.js";import"./GLTFLoader.CGmWy7Pi.js";import"./BufferGeometryUtils.BCFa2xsx.js";import"./index-client.CbnisDQz.js";import"./useStage.Boj8h06y.js";import"./injectPlugin.jO4qRgoB.js";import"./transitions.Bigw4laK.js";import"./loop.BGGTUj09.js";import"./render.DOVvO0Mi.js";import"./RGBELoader.Bz0Kjuk5.js";import"./useEnvironment.svelte._asstwAI.js";import"./OrbitControls.BBY0MsSW.js";import"./useControlsContext.ZfGs-Zwn.js";import"./this.BCeOz4X_.js";import"./Context.Dzp0D_fh.js";const j=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var z=B("<!> <!> <!>",1);function J(t,o){b(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=I(),m=G(),k=`
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
	`,w=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new E({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:j}),l=new M(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=z(),d=P(c);y(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{L(a,{})},$$slots:{default:!0}})});var v=g(d,2);O(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:F}=i(s);return{scene:F}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);H(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Be(t){Q(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Be as default};
