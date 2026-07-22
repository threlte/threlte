import"./disclose-version.DwdwGuwu.js";import{Ft as F,G as R,It as g,Kt as h,R as b,Xt as q,Yt as P,ht as o,it as y,kt as B,nt as D}from"./client.CmGS4DHB.js";import"./legacy.BVIVHw1B.js";import{a as S,f as I,l as _,s as G,so as $,ya as O}from"./lib.BP7gumtS.js";import{Nt as Q,Q as A,at as E,kt as K}from"./lib.CCfBeaz9.js";import{t as M}from"./Pass.BE1N5Sqb.js";var N=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`,X=y("<!> <!> <!>",1);function Y(t,s){q(s,!0);const{camera:i,renderStage:k,renderer:r,scene:x}=G(),u=K(),T=`
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
	`,w=Q("/models/spaceships/Bob.gltf"),U=new $(u.texture),l=new $(0);S(e=>{l.value+=e});const c=new O({fragmentShader:T,uniforms:{uScene:U,uTime:l},vertexShader:N}),d=new M(c);B(()=>()=>{d.dispose(),c.dispose()}),S(()=>{const e=r.getRenderTarget();r.setRenderTarget(u),r.render(x,i.current),r.setRenderTarget(e),d.render(r)},{stage:k});var v=X(),m=F(v);b(m,()=>_.PerspectiveCamera,(e,a)=>{a(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(n,f)=>{A(n,{})},$$slots:{default:!0}})});var p=g(m,2);R(p,()=>w,null,(e,a)=>{var n=h(()=>{var{scene:C}=o(a);return{scene:C}}),f=h(()=>o(n).scene);_(e,{get is(){return o(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})}),E(g(p,2),{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,v),P()}function W(t){I(t,{autoRender:!1,children:(s,i)=>{Y(s,{})},$$slots:{default:!0}})}export{W as default};
