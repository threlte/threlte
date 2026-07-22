import"./disclose-version.DwdwGuwu.js";import{A as je,Ft as u,H as ye,It as t,Kt as P,Ot as ze,Pt as De,R as _,Ut as m,V as Ce,Vt as o,Xt as Me,Yt as Ue,et as Ee,ht as e,it as g,kt as Be,n as v,nn as Xe,nt as l,o as He,rt as ne,s as Le}from"./client.CmGS4DHB.js";import{Do as Ye,Qr as Fe,Xr as Ne,_o as y,a as Qe,ei as Ze,f as Ke,l as i,s as We,so as ke,va as qe}from"./lib.BP7gumtS.js";import{At as Je,Q as et,ft as tt,h as rt,o as at,pt as nt,rt as ot,wt as st}from"./lib.CCfBeaz9.js";import{t as ge}from"./motion.DDxCnjxt.js";import{a as de}from"./easing.BRnDC4Ae.js";import{_ as lt,c as ut,l as Ie,p as D,v as Ae}from"./dist.C7OXXE4P.js";var it=`varying vec2 vUv;
uniform sampler2D uAlphaTexture;
uniform float uTime;

layout (location = 1) out vec4 gR;
layout (location = 2) out vec4 gG;
layout (location = 3) out vec4 gB;
layout (location = 4) out vec4 gA;

float rand(vec2 n) {
	return fract(sin(dot(n, vec2(12.9898f, 4.1414f))) * 43758.5453f);
}

		// https://www.shadertoy.com/view/tljXR1
float noise(vec2 p) {
	vec2 ip = floor(p);
	vec2 u = fract(p);
	u = u * u * (3.0f - 2.0f * u);

	float res = mix(mix(rand(ip), rand(ip + vec2(1.0f, 0.0f)), u.x), mix(rand(ip + vec2(0.0f, 1.0f)), rand(ip + vec2(1.0f, 1.0f)), u.x), u.y);
	return res * res;
}

		#define NUM_OCTAVES 5

float fbm(vec2 x) {
	float v = 0.0f;
	float a = 0.5f;
	vec2 shift = vec2(100);
			// Rotate to reduce axial bias
	mat2 rot = mat2(cos(0.5f), sin(0.5f), -sin(0.5f), cos(0.50f));
	for (int i = 0; i < NUM_OCTAVES; ++i) {
		v += a * noise(x);
		x = rot * x * 2.0f + shift;
		a *= 0.5f;
	}
	return v;
}

float hexGrid(float scale) {
	vec2 u = scale * vUv;
	vec2 s = vec2(1.f, 1.732f);
	vec2 a = mod(u, s) * 2.f - s;
	vec2 b = mod(u + s * .5f, s) * 2.f - s;

	return pow(0.5f * min(dot(a, a), dot(b, b)), 3.f) * 2.f;
}

void main() {
	vec2 p = vUv * 0.5f - 1.f;
	float t = uTime * 0.15f;
	float rad = atan(p.x, p.y) + t * 0.2f;
	float hue = fbm(35.f * vec2(cos(rad), sin(rad)) + 30.f * vec2(fbm(p + t), -fbm(p + t)));
	hue = pow(hue, 2.f);

	float saturation = clamp(pow(distance(0.5f, fract((vUv.x + vUv.y) + uTime * 0.2f)), 2.f) * 10.f, 0.f, 1.f);

	float lightness = clamp(hexGrid(8.f) * pow(distance(0.5f, fract(vUv.x * 16.f + uTime)), 2.f) * 20.f, 0.f, 1.f);

	float alpha = texture2D(uAlphaTexture, vUv).r;

	pc_fragColor = vec4(hue, saturation, lightness, alpha);
	gR = vec4(hue, 0.f, 0.f, 1.f);
	gG = vec4(0.f, saturation, 0.f, 1.f);
	gB = vec4(0.f, 0.f, lightness, 1.f);
	gA = vec4(alpha, alpha, alpha, 1.f);

}
`,ct=`varying vec2 vUv;
void main() {
	gl_Position = vec4(position, 1.0f);
	vUv = uv;
}
`,ht=class extends Ze{constructor(C,...s){super(...s);const w=this.parameters.width*.5,b=new y(-w,0),k=new y(0,C),c=new y(w,0),d=new y().subVectors(b,k),S=new y().subVectors(k,c),I=new y().subVectors(b,c),A=new y(0,C-d.length()*S.length()*I.length()/(2*Math.abs(d.cross(I)))),M=(new y().subVectors(b,A).angle()-Math.PI*.5)*2,U=this.getAttribute("uv"),$=this.getAttribute("position"),R=new y;for(let f=0;f<U.count;f+=1){const p=1-U.getX(f),N=$.getY(f);R.copy(c).rotateAround(A,M*p),$.setXYZ(f,R.x,N,-R.y)}$.needsUpdate=!0}},fe=800,mt=class{radius=new ge(.1,{duration:fe,easing:de});scale=new ge(1,{duration:fe,easing:de});zoom=new ge(1,{duration:fe,easing:de});url;constructor(C){this.url=C}},vt=["/textures/paintings/caravaggio.jpg","/textures/paintings/vangogh.jpg","/textures/paintings/klimt.jpg","/textures/paintings/seghers.jpg","/textures/paintings/vollon.jpg","/textures/paintings/swan.jpg"],gt=5,pe=["Hue(R)","Saturation(G)","Lightness(B)","Alpha(A)"],dt=g("<!> <!>",1),ft=g("<!> <!>",1),pt=g("<span> </span>"),xt=g("<!> <!>",1),_t=g("<!> <!>",1),wt=g("<!> <!>",1),bt=g("<!> <!> <!> <!>",1);function St(C,s){Me(s,!0);const w=()=>Le(N,"$viewport",b),[b,k]=He();let c=v(s,"alphaSmoothing",3,.15),d=v(s,"alphaThreshold",3,.5),S=v(s,"brightness",3,0),I=v(s,"contrast",3,0),A=v(s,"hue",3,0),M=v(s,"lightness",3,0),U=v(s,"monochromeColor",3,"#ed8922"),$=v(s,"monochromeStrength",3,0),R=v(s,"negative",3,!1),f=v(s,"saturation",3,0),p=v(s,"textureOverrideEnabled",3,!1);const N=st(),{autoRenderTask:Z,renderer:E}=We();at();const L=1.4,oe=2*Math.PI,G=P(()=>vt.map(a=>new mt(a))),O=new ke(0),V=new ke(null);Je("/textures/alpha.jpg").then(a=>{V.value=a});const h=new qe,K=new Ne(-1,1,0,-1,1),B=new Ye(256,256,{count:gt}),W=P(()=>{if(p())return B.textures[0]});for(let a=0,j=pe.length;a<j;a+=1){const x=B.textures[a+1];x&&(x.name=pe[a]??"")}Qe(a=>{O.value+=a;const j=E.getRenderTarget();E.setRenderTarget(B),E.render(h,K),E.setRenderTarget(j)},{running:()=>p(),before:Z});const q=new Fe;var r=bt(),xe=u(r);i(xe,{get is(){return q},makeDefault:!0,fov:20,position:[2,2,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:0},children:(a,j)=>{et(a,{autoRotate:!0,enableDamping:!0,enableZoom:!1,enablePan:!1})},$$slots:{default:!0}});var _e=t(xe,2);_(_e,()=>i.Mesh,(a,j)=>{j(a,{get attach(){return h},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:1},children:(x,Q)=>{var Y=dt(),n=u(Y);_(n,()=>i.PlaneGeometry,(H,T)=>{T(H,{args:[2,2],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:2}})});var X=t(n,2);_(X,()=>i.ShaderMaterial,(H,T)=>{T(H,{get fragmentShader(){return it},get vertexShader(){return ct},get"uniforms.uTime"(){return O},get"uniforms.uAlphaTexture"(){return V},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:3}})}),l(x,Y)},$$slots:{default:!0}})});var we=t(_e,2);tt(we,{children:(a,j)=>{var x=_t(),Q=u(x);_(Q,()=>i.OrthographicCamera,(n,X)=>{X(n,{makeDefault:!0,"position.z":10,zoom:100,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:4}})});var Y=t(Q,2);{let n=P(()=>-1*w().width+1),X=P(()=>1*.5*w().height+1);_(Y,()=>i.Group,(H,T)=>{T(H,{get"position.x"(){return e(n)},get"position.y"(){return e(X)},get visible(){return p()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:5},children:(J,be)=>{var ee=ne(),se=u(ee);Ce(se,17,()=>pe,ye,(le,ue,z)=>{var ie=ne(),te=u(ie);_(te,()=>i.Group,(re,Re)=>{Re(re,{"position.x":z,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:6},children:(Ge,Ct)=>{var Se=xt(),$e=u(Se);_($e,()=>i.Mesh,(ce,Te)=>{Te(ce,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:7},children:(F,he)=>{var ae=ft(),Pe=u(ae);{let me=P(()=>B.textures[z+1]??null);_(Pe,()=>i.MeshBasicMaterial,(ve,Ve)=>{Ve(ve,{get map(){return e(me)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:8}})})}var Oe=t(Pe,2);_(Oe,()=>i.PlaneGeometry,(me,ve)=>{ve(me,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:9}})}),l(F,ae)},$$slots:{default:!0}})}),nt(t($e,2),{center:!0,children:(ce,Te)=>{var F=pt();let he;var ae=De(F,!0);Xe(F),ze(()=>{he=je(F,"",he,{color:"white",opacity:+p()}),Ee(ae,e(ue))}),l(ce,F)},$$slots:{default:!0}}),l(Ge,Se)},$$slots:{default:!0}})}),l(le,ie)}),l(J,ee)},$$slots:{default:!0}})})}l(a,x)},$$slots:{default:!0}}),rt(t(we,2),{children:(a,j)=>{var x=ne(),Q=u(x);Ce(Q,17,()=>e(G),ye,(Y,n,X)=>{const H=P(()=>X/e(G).length),T=P(()=>e(H)*oe);var J=ne(),be=u(J);{let ee=P(()=>[L*Math.sin(e(T)),0,L*Math.cos(e(T))]),se=P(()=>[0,Math.PI+e(T),0]);_(be,()=>i.Mesh,(le,ue)=>{ue(le,{get scale(){return e(n).scale.current},get position(){return e(ee)},get rotation(){return e(se)},onpointerenter:z=>{z.stopPropagation(),e(n).radius.set(.25),e(n).scale.set(1.3),e(n).zoom.set(1.25)},onpointerleave:z=>{z.stopPropagation(),e(n).radius.set(.1),e(n).scale.set(1),e(n).zoom.set(1)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:10},children:(z,ie)=>{var te=wt(),re=u(te);i(re,{get is(){return ht},args:[.1,1,1,20,20],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:11}}),ot(t(re,2),{get radius(){return e(n).radius.current},get side(){return 2},transparent:!0,get url(){return e(n).url},get zoom(){return e(n).zoom.current},get alphaSmoothing(){return c()},get alphaThreshold(){return d()},get brightness(){return S()},get colorProcessingTexture(){return e(W)},get contrast(){return I()},get hue(){return A()},get lightness(){return M()},get monochromeColor(){return U()},get monochromeStrength(){return $()},get negative(){return R()},get saturation(){return f()}}),l(z,te)},$$slots:{default:!0}})})}l(Y,J)}),l(a,x)},$$slots:{default:!0}}),l(C,r),Ue(),k()}var $t=g("<!> <!> <!> <!> <!> <!> <!> <!>",1),Tt=g("<!> <!> <!>",1),Pt=g("<!> <!>",1),yt=g("<!> <!>",1);function Ot(C,s){Me(s,!0);let w=m(0),b=m(0),k=m(!1),c=m(0),d=m(0),S=m(0),I=m("#ed8922"),A=m(0),M=m(!1),U=m(.5),$=m(.15);Be(()=>{o(c,0),o(d,0),o(S,0),e(M)&&(o(c,.2),o(d,-1),o(S,.15))});var R=yt(),f=u(R);Ke(f,{children:(p,N)=>{St(p,{get alphaSmoothing(){return e($)},get alphaThreshold(){return e(U)},get brightness(){return e(w)},get contrast(){return e(b)},get hue(){return e(c)},get lightness(){return e(S)},get monochromeColor(){return e(I)},get monochromeStrength(){return e(A)},get negative(){return e(k)},get saturation(){return e(d)},get textureOverrideEnabled(){return e(M)}})},$$slots:{default:!0}}),ut(t(f,2),{title:"Image",position:"fixed",children:(p,N)=>{var Z=Pt(),E=u(Z);Ie(E,{title:"Color processing",children:(L,oe)=>{var G=$t(),O=u(G);D(O,{label:"brightness",min:-1,max:1,get value(){return e(w)},set value(r){o(w,r,!0)}});var V=t(O,2);D(V,{label:"contrast",min:-1,max:1,get value(){return e(b)},set value(r){o(b,r,!0)}});var h=t(V,2);D(h,{label:"hue",min:0,max:1,get value(){return e(c)},set value(r){o(c,r,!0)}});var K=t(h,2);D(K,{label:"saturation",min:-1,max:1,get value(){return e(d)},set value(r){o(d,r,!0)}});var B=t(K,2);D(B,{label:"lightness",min:-1,max:1,get value(){return e(S)},set value(r){o(S,r,!0)}});var W=t(B,2);D(W,{label:"monochromeStrength",min:0,max:1,get value(){return e(A)},set value(r){o(A,r,!0)}});var q=t(W,2);lt(q,{label:"monochromeColor",get value(){return e(I)},set value(r){o(I,r,!0)}}),Ae(t(q,2),{label:"negative",get value(){return e(k)},set value(r){o(k,r,!0)}}),l(L,G)},$$slots:{default:!0}}),Ie(t(E,2),{title:"Color processing with a texture",children:(L,oe)=>{var G=Tt(),O=u(G);Ae(O,{label:"enabled",get value(){return e(M)},set value(h){o(M,h,!0)}});var V=t(O,2);D(V,{label:"alphaThreshold",min:0,max:1,get value(){return e(U)},set value(h){o(U,h,!0)}}),D(t(V,2),{label:"alphaSmoothing",min:0,max:1,get value(){return e($)},set value(h){o($,h,!0)}}),l(L,G)},$$slots:{default:!0}}),l(p,Z)},$$slots:{default:!0}}),l(C,R),Ue()}export{Ot as default};
