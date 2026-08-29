import"./disclose-version.DsnmJJEf.js";import{p as Se,Z as i,f as v,n as qe,a as Te,s as u,g as t,u as H,c as Fe,r as He,t as Le,L as Ne,b as h,d as R}from"./runtime.Cq5xh0TU.js";import{c as oe,a as g,f as U}from"./template.L6xDPO6U.js";import{s as Xe}from"./render.DOVvO0Mi.js";import{e as Re,i as Ie}from"./each.BnTYX0wD.js";import{c as V}from"./svelte-component.B_Rq4ZKt.js";import{s as Ze}from"./style.B7VQCyQc.js";import{p as a,s as We,r as Ye}from"./props.D2nmUwxA.js";import{u as Je,av as l,r as Ke,C as Ue,V as I,aI as Qe,i as $e,T as w,bn as et,aF as tt,a5 as rt,aw as ot,a3 as at,D as nt}from"./observe.svelte.TvC_xpcN.js";import{f as xe}from"./index.IuXc8keW.js";import{T as be}from"./tweened.C-qkNWAH.js";/* empty css                                                      */import{u as Oe}from"./useThrelte.VmojktKP.js";import{u as Ee}from"./useTask.svelte.BxJSwWIP.js";import{u as st,a as Ge,c as lt,y as it}from"./raycast.C0iVgLjf.js";import{H as ut}from"./HTML.Ck75qlwh.js";import{H as ct}from"./HUD.BM5vkHfg.js";import{s as mt}from"./snippet.B1WTn4og.js";import{s as ht,a as gt}from"./store.3KrUyxeZ.js";import{O as ft}from"./OrbitControls.DvI1KsXZ.js";import{S as vt}from"./Suspense.DtwOFlkt.js";import{i as dt}from"./index.BGjQZJHf.js";import{C as pt}from"./Canvas.DCMAFG-V.js";import"./legacy.CFq86F04.js";import{P as xt}from"./tweakpane-plugin-waveform.Cv4Bc8Ou.js";/* empty css                                                           */import{C as ke}from"./Checkbox.CHEo0QyS.js";import{C as bt}from"./Color.B0r8A87K.js";import{S as Y}from"./Slider.BmKO9zvs.js";import{F as Ae}from"./Folder.BC_VJqHJ.js";/* empty css                                                       *//* empty css                                                       */import"./events.-BVBOS9k.js";import"./create-subscriber.Cxqb2LK-.js";import"./branches.CjZ4fCu_.js";import"./attributes.B79LgCJy.js";import"./index.D-QOJTr1.js";import"./if.eGY2C9_P.js";import"./loop.BGGTUj09.js";import"./utils.vK_o3JBb.js";import"./index-client.CbnisDQz.js";import"./useStage.BE_Gz_ew.js";import"./injectPlugin.PIq3zzX0.js";import"./transitions.Bigw4laK.js";import"./svelte-element.BmWbrHVE.js";import"./actions.CqLXpYcm.js";import"./attributes.zNsP-kBs.js";import"./class.BJ3gECX0.js";import"./select.dABtaSYy.js";import"./this.BCeOz4X_.js";import"./OrbitControls.D1AV46m0.js";import"./useControlsContext.svelte.Dv7Tlgil.js";import"./Context.7Jzo4MMn.js";import"./slot.D_7HTdDr.js";import"./lifecycle.wtIJeE0B.js";/* empty css                                                                     */import"./misc.DJFr2OVT.js";import"./GenericInput.CWrVV9Hz.js";import"./GenericBinding.Bk_u6Xea.js";import"./index.DgAtSlAd.js";import"./GenericInputFolding.CwCJHoGw.js";import"./GenericSlider.5rawTSfv.js";const wt=`
varying vec2 vUv;
varying vec2 vPos;
void main () {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vPos = position.xy;
}
`,_t=`
// Majority from https://gist.github.com/statico/df64c5d167362ecf7b34fca0b1459a44
varying vec2 vUv;
varying vec2 vPos;
uniform vec2 scale;
uniform vec2 imageBounds;
uniform float resolution;
uniform vec3 color;
uniform sampler2D map;
uniform sampler2D colorProccessingTexture;
uniform float radius;
uniform float zoom;
uniform float alphaThreshold;
uniform float alphaSmoothing;
uniform float brightness;
uniform float contrast;
uniform float monochromeStrength;
uniform vec3 monochromeColor;
uniform float negative;
uniform vec3 hsl;
uniform float grayscale;
uniform float opacity;
uniform int colorProcessingEnabled;
uniform int colorProcessingTextureOverride;

#define PI 3.14159265;

vec2 aspect(vec2 size) {
  return size / min(size.x, size.y);
}

// from https://iquilezles.org/articles/distfunctions
float udRoundBox(vec2 p, vec2 b, float r) {
  return length(max(abs(p) - b + r, 0.0)) - r;
}

float hueToRgb(float p, float q, float t) {
  if (t < 0.0f)
    t += 1.0f;
  if (t > 1.0f)
    t -= 1.0f;
  if (t < 1.0f / 6.0f)
    return p + (q - p) * 6.0f * t;
  if (t < 1.0f / 2.0f)
    return q;
  if (t < 2.0f / 3.0f)
    return p + (q - p) * (2.0f / 3.0f - t) * 6.0f;
  return p;
}

vec3 rgbToHsl(vec3 color) {
  float max = max(max(color.r, color.g), color.b);
  float min = min(min(color.r, color.g), color.b);
  float h, s, l = (max + min) / 2.0f;

  if (max == min) {
    h = s = 0.0f;
  } else {
    float d = max - min;
    s = l > 0.5f ? d / (2.0f - max - min) : d / (max + min);
    if (max == color.r) {
      h = (color.g - color.b) / d + (color.g < color.b ? 6.0f : 0.0f);
    } else if (max == color.g) {
      h = (color.b - color.r) / d + 2.0f;
    } else if (max == color.b) {
      h = (color.r - color.g) / d + 4.0f;
    }
    h /= 6.0f;
  }

  return vec3(h, s, l);
}

vec3 hslToRgb(vec3 hsl) {
  float h = hsl.x;
  float s = hsl.y;
  float l = hsl.z;

  float r, g, b;

  if (s == 0.0f) {
    r = g = b = l;
  } else {
    float q = l < 0.5f ? l * (1.0f + s) : l + s - l * s;
    float p = 2.0f * l - q;
    r = hueToRgb(p, q, h + 1.0f / 3.0f);
    g = hueToRgb(p, q, h);
    b = hueToRgb(p, q, h - 1.0f / 3.0f);
  }

  return vec3(r, g, b);
}

vec3 monochrome(float x, vec3 col) {
  return col * exp(4.0 * x - 1.0);
}

void processColors (inout vec4 colors) {
	vec4 strength = vec4(1.0);

	if (colorProcessingTextureOverride == 1) {
		strength = texture2D(colorProccessingTexture, vUv);

		float smoothedAlpha = smoothstep(1.0 - alphaThreshold - alphaSmoothing, 1.0 - alphaThreshold, strength.a + 0.0001);
		colors.a *= smoothedAlpha;

		if (gl_FragColor.a == 0.0) {
			discard;
			return;
		}
	}

	// BRIGHTNESS
	colors.rgb = max(colors.rgb + brightness, 0.0);

	// CONTRAST
  colors.rgb = max(((colors.rgb - 0.5) * max(contrast + 1.0, 0.0)) + 0.5, 0.0);

	// HSL
	vec3 hslColor = rgbToHsl(colors.rgb);
	hslColor.x = mod(hslColor.x + hsl.x * strength.r ,1.0);
	hslColor.y *= (1.0 + hsl.y * strength.g);
	hslColor.z += hsl.z * strength.b;
	colors.rgb = max(hslToRgb(hslColor), vec3(0.0));

	// MONOCHROME
	colors.rgb = mix(colors.rgb, monochrome(hslColor.z, monochromeColor), monochromeStrength);
}

void main() {
  vec2 s = aspect(scale);
  vec2 i = aspect(imageBounds);
  float rs = s.x / s.y;
  float ri = i.x / i.y;
  vec2 new = rs < ri ? vec2(i.x * s.y / i.y, s.y) : vec2(s.x, i.y * s.x / i.x);
  vec2 offset = (rs < ri ? vec2((new.x - s.x) / 2.0, 0.0) : vec2(0.0, (new.y - s.y) / 2.0)) / new;
  vec2 uv = vUv * s / new + offset;
  vec2 zUv = (uv - vec2(0.5, 0.5)) / zoom + vec2(0.5, 0.5);

  vec2 res = vec2(scale * resolution);
  vec2 halfRes = 0.5 * res;
  float b = udRoundBox(vUv.xy * res - halfRes, halfRes, resolution * radius);
  vec3 a = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 0.0), smoothstep(0.0, 1.0, b));

	gl_FragColor = texture2D(map, zUv) * vec4(color, opacity * a);

	if (colorProcessingEnabled == 1) {
	  processColors(gl_FragColor);
	}

	if (gl_FragColor.a == 0.0) {
	  discard;
	}

  #include <tonemapping_fragment>
  #include <colorspace_fragment>
	gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(1.0) - gl_FragColor.rgb, negative);
}
`;function St(J,e){Se(e,!0);const y=()=>ht(j,"$textureStore",L),[L,k]=gt();let x=a(e,"color",3,"white"),_=a(e,"zoom",3,1),b=a(e,"radius",3,0),A=a(e,"alphaThreshold",3,0),B=a(e,"alphaSmoothing",3,.1),S=a(e,"brightness",3,0),O=a(e,"contrast",3,0),d=a(e,"hue",3,0),N=a(e,"saturation",3,0),X=a(e,"lightness",3,0),E=a(e,"negative",3,!1),P=a(e,"opacity",3,1),D=a(e,"toneMapped",3,!0),C=a(e,"transparent",3,!1),p=a(e,"ref",15),Z=Ye(e,["$$slots","$$events","$$legacy","color","zoom","radius","alphaThreshold","alphaSmoothing","brightness","contrast","hue","saturation","lightness","negative","opacity","toneMapped","transparent","texture","monochromeColor","monochromeStrength","colorProcessingTexture","side","url","ref","children"]);const{invalidate:o,size:$}=Oe(),j=st()(e.url?Ge(e.url):lt(Promise.resolve(e.texture))),q=Je(),r={color:new l(new Ue),scale:new l(new I),imageBounds:new l(new I(1,1)),resolution:new l(1024),map:new l(null),zoom:new l(1),radius:new l(0),alphaThreshold:new l(0),alphaSmoothing:new l(.1),brightness:new l(0),contrast:new l(0),monochromeColor:new l(new Ue),monochromeStrength:new l(0),negative:new l(0),opacity:new l(1),hsl:new l(new Ke),colorProccessingTexture:new l(null),colorProcessingTextureOverride:new l(0),colorProcessingEnabled:new l(1)},f=new Qe({uniforms:r,vertexShader:wt,fragmentShader:_t});i(()=>{e.side&&(f.side=e.side,o())}),i(()=>{r.color.value.set(x()),o()}),i(()=>{r.imageBounds.value.set(y()?.image.width??0,y()?.image.height??0),o()}),i(()=>{r.resolution.value=Math.max($.current.width,$.current.height),o()}),i(()=>{r.zoom.value=_(),o()}),i(()=>{r.radius.value=b(),o()}),i(()=>{r.opacity.value=P(),o()}),i(()=>{r.alphaThreshold.value=A(),o()}),i(()=>{r.alphaSmoothing.value=B(),o()}),i(()=>{r.brightness.value=S(),o()}),i(()=>{r.contrast.value=O(),o()}),i(()=>{r.hsl.value.x=d(),o()}),i(()=>{r.hsl.value.z=X(),o()}),i(()=>{r.negative.value=E()?1:0,o()}),i(()=>{r.map.value=y()??null,o()}),i(()=>{r.colorProccessingTexture.value=e.colorProcessingTexture??null,o()}),i(()=>{r.colorProcessingTextureOverride.value=e.colorProcessingTexture?1:0,o()}),i(()=>{e.monochromeColor!==void 0?(r.monochromeColor.value.set(e.monochromeColor),r.monochromeStrength.value=e.monochromeStrength??1):r.monochromeStrength.value=0,o()}),i(()=>{let c=0;const T=(e.monochromeColor?1:0)*(e.monochromeStrength===void 0?1:e.monochromeStrength);for(const z of[S(),O(),d(),N(),X(),T,e.colorProcessingTexture?1:0])if(z!==0){c=1;break}r.colorProcessingEnabled.value=c,o()}),Ee(()=>{const c=q.current;if(!$e(c,"Mesh"))return;r.scale.value.set(c.scale.x,c.scale.y);const T=c.geometry;if(T!==void 0&&"parameters"in T){const{width:z,height:n}=T.parameters;r.scale.value.set(r.scale.value.x*z,r.scale.value.y*n)}},{autoInvalidate:!1}),w(J,We({get is(){return f},get toneMapped(){return D()},get transparent(){return C()}},()=>Z,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ImageMaterial/ImageMaterial.svelte",index:0},get ref(){return p()},set ref(c){p(c)},children:(c,T)=>{var z=oe(),n=v(z);mt(n,()=>e.children??qe,()=>({ref:f})),g(c,z)},$$slots:{default:!0}})),Te(),k()}const Tt=`varying vec2 vUv;
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
`,yt=`varying vec2 vUv;
void main() {
	gl_Position = vec4(position, 1.0f);
	vUv = uv;
}
`;class Pt extends et{constructor(e,...y){super(...y);const k=this.parameters.width*.5,x=new I(-k,0),_=new I(0,e),b=new I(k,0),A=new I().subVectors(x,_),B=new I().subVectors(_,b),S=new I().subVectors(x,b),O=A.length()*B.length()*S.length()/(2*Math.abs(A.cross(S))),d=new I(0,e-O),E=(new I().subVectors(x,d).angle()-Math.PI*.5)*2,P=this.getAttribute("uv"),D=this.getAttribute("position"),C=new I;for(let p=0;p<P.count;p+=1){const Z=1-P.getX(p),o=D.getY(p);C.copy(b).rotateAround(d,E*Z),D.setXYZ(p,C.x,o,-C.y)}D.needsUpdate=!0}}const we=800;class Ct{radius=new be(.1,{duration:we,easing:xe});scale=new be(1,{duration:we,easing:xe});zoom=new be(1,{duration:we,easing:xe});url;constructor(e){this.url=e}}const Mt=["/textures/paintings/caravaggio.jpg","/textures/paintings/vangogh.jpg","/textures/paintings/klimt.jpg","/textures/paintings/seghers.jpg","/textures/paintings/vollon.jpg","/textures/paintings/swan.jpg"],zt=5,_e=["Hue(R)","Saturation(G)","Lightness(B)","Alpha(A)"];var Rt=U("<!> <!>",1),It=U("<!> <!>",1),Ut=U("<span> </span>"),kt=U("<!> <!>",1),At=U("<!> <!>",1),Ot=U("<!> <!>",1),Et=U("<!> <!> <!> <!>",1);function Gt(J,e){Se(e,!0);let y=a(e,"alphaSmoothing",3,.15),L=a(e,"alphaThreshold",3,.5),k=a(e,"brightness",3,0),x=a(e,"contrast",3,0),_=a(e,"hue",3,0),b=a(e,"lightness",3,0),A=a(e,"monochromeColor",3,"#ed8922"),B=a(e,"monochromeStrength",3,0),S=a(e,"negative",3,!1),O=a(e,"saturation",3,0),d=a(e,"textureOverrideEnabled",3,!1);const N=it(),{autoRenderTask:X,renderer:E}=Oe();dt();const P=1.4,D=2*Math.PI,C=H(()=>Mt.map(n=>new Ct(n))),p=new l(0),Z=new l(null);Ge("/textures/alpha.jpg").then(n=>{Z.value=n});const o=new tt,$=new rt(-1,1,0,-1,1),M=new ot(256,256,{count:zt}),j=H(()=>{if(d())return M.textures[0]});for(let n=0,s=_e.length;n<s;n+=1){const G=M.textures[n+1];G&&(G.name=_e[n]??"")}Ee(n=>{p.value+=n;const s=E.getRenderTarget();E.setRenderTarget(M),E.render(o,$),E.setRenderTarget(s)},{running:()=>d(),before:X});const q=new at;var r=Et(),f=v(r);w(f,{get is(){return q},makeDefault:!0,fov:20,position:[2,2,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:0},children:(n,s)=>{ft(n,{autoRotate:!0,enableDamping:!0,enableZoom:!1,enablePan:!1})},$$slots:{default:!0}});var c=u(f,2);V(c,()=>w.Mesh,(n,s)=>{s(n,{get attach(){return o},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:1},children:(G,re)=>{var ee=Rt(),m=v(ee);V(m,()=>w.PlaneGeometry,(Q,F)=>{F(Q,{args:[2,2],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:2}})});var K=u(m,2);V(K,()=>w.ShaderMaterial,(Q,F)=>{F(Q,{get fragmentShader(){return Tt},get vertexShader(){return yt},get"uniforms.uTime"(){return p},get"uniforms.uAlphaTexture"(){return Z},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:3}})}),g(G,ee)},$$slots:{default:!0}})});var T=u(c,2);ct(T,{children:(n,s)=>{var G=At(),re=v(G);V(re,()=>w.OrthographicCamera,(m,K)=>{K(m,{makeDefault:!0,"position.z":10,zoom:100,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:4}})});var ee=u(re,2);{let m=H(()=>-1*N.current.width+1),K=H(()=>1*.5*N.current.height+1);V(ee,()=>w.Group,(Q,F)=>{F(Q,{get"position.x"(){return t(m)},get"position.y"(){return t(K)},get visible(){return d()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:5},children:(ae,ye)=>{var ne=oe(),ue=v(ne);Re(ue,17,()=>_e,Ie,(ce,me,W)=>{var he=oe(),se=v(he);V(se,()=>w.Group,(le,ge)=>{ge(le,{"position.x":W,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:6},children:(Ve,qt)=>{var Pe=kt(),Ce=v(Pe);V(Ce,()=>w.Mesh,(fe,Me)=>{Me(fe,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:7},children:(te,ve)=>{var ie=It(),ze=v(ie);{let de=H(()=>M.textures[W+1]??null);V(ze,()=>w.MeshBasicMaterial,(pe,je)=>{je(pe,{get map(){return t(de)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:8}})})}var De=u(ze,2);V(De,()=>w.PlaneGeometry,(de,pe)=>{pe(de,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:9}})}),g(te,ie)},$$slots:{default:!0}})});var Be=u(Ce,2);ut(Be,{center:!0,children:(fe,Me)=>{var te=Ut();let ve;var ie=Fe(te,!0);He(te),Le(()=>{ve=Ze(te,"",ve,{color:"white",opacity:+d()}),Xe(ie,t(me))}),g(fe,te)},$$slots:{default:!0}}),g(Ve,Pe)},$$slots:{default:!0}})}),g(ce,he)}),g(ae,ne)},$$slots:{default:!0}})})}g(n,G)},$$slots:{default:!0}});var z=u(T,2);vt(z,{children:(n,s)=>{var G=oe(),re=v(G);Re(re,17,()=>t(C),Ie,(ee,m,K)=>{const Q=H(()=>K/t(C).length),F=H(()=>t(Q)*D);var ae=oe(),ye=v(ae);{let ne=H(()=>[P*Math.sin(t(F)),0,P*Math.cos(t(F))]),ue=H(()=>[0,Math.PI+t(F),0]);V(ye,()=>w.Mesh,(ce,me)=>{me(ce,{get scale(){return t(m).scale.current},get position(){return t(ne)},get rotation(){return t(ue)},onpointerenter:W=>{W.stopPropagation(),t(m).radius.set(.25),t(m).scale.set(1.3),t(m).zoom.set(1.25)},onpointerleave:W=>{W.stopPropagation(),t(m).radius.set(.1),t(m).scale.set(1),t(m).zoom.set(1)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:10},children:(W,he)=>{var se=Ot(),le=v(se);w(le,{get is(){return Pt},args:[.1,1,1,20,20],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:11}});var ge=u(le,2);St(ge,{get radius(){return t(m).radius.current},get side(){return nt},transparent:!0,get url(){return t(m).url},get zoom(){return t(m).zoom.current},get alphaSmoothing(){return y()},get alphaThreshold(){return L()},get brightness(){return k()},get colorProcessingTexture(){return t(j)},get contrast(){return x()},get hue(){return _()},get lightness(){return b()},get monochromeColor(){return A()},get monochromeStrength(){return B()},get negative(){return S()},get saturation(){return O()}}),g(W,se)},$$slots:{default:!0}})})}g(ee,ae)}),g(n,G)},$$slots:{default:!0}}),g(J,r),Te()}var Vt=U("<!> <!> <!> <!> <!> <!> <!> <!>",1),Bt=U("<!> <!> <!>",1),Dt=U("<!> <!>",1),jt=U("<!> <!>",1);function Jr(J,e){Se(e,!0);let y=R(0),L=R(0),k=R(!1),x=R(0),_=R(0),b=R(0),A=R("#ed8922"),B=R(0),S=R(!1),O=R(.5),d=R(.15);Ne(()=>{h(x,0),h(_,0),h(b,0),t(S)&&(h(x,.2),h(_,-1),h(b,.15))});var N=jt(),X=v(N);pt(X,{children:(P,D)=>{Gt(P,{get alphaSmoothing(){return t(d)},get alphaThreshold(){return t(O)},get brightness(){return t(y)},get contrast(){return t(L)},get hue(){return t(x)},get lightness(){return t(b)},get monochromeColor(){return t(A)},get monochromeStrength(){return t(B)},get negative(){return t(k)},get saturation(){return t(_)},get textureOverrideEnabled(){return t(S)}})},$$slots:{default:!0}});var E=u(X,2);xt(E,{title:"Image",position:"fixed",children:(P,D)=>{var C=Dt(),p=v(C);Ae(p,{title:"Color processing",children:(o,$)=>{var M=Vt(),j=v(M);Y(j,{label:"brightness",min:-1,max:1,get value(){return t(y)},set value(s){h(y,s,!0)}});var q=u(j,2);Y(q,{label:"contrast",min:-1,max:1,get value(){return t(L)},set value(s){h(L,s,!0)}});var r=u(q,2);Y(r,{label:"hue",min:0,max:1,get value(){return t(x)},set value(s){h(x,s,!0)}});var f=u(r,2);Y(f,{label:"saturation",min:-1,max:1,get value(){return t(_)},set value(s){h(_,s,!0)}});var c=u(f,2);Y(c,{label:"lightness",min:-1,max:1,get value(){return t(b)},set value(s){h(b,s,!0)}});var T=u(c,2);Y(T,{label:"monochromeStrength",min:0,max:1,get value(){return t(B)},set value(s){h(B,s,!0)}});var z=u(T,2);bt(z,{label:"monochromeColor",get value(){return t(A)},set value(s){h(A,s,!0)}});var n=u(z,2);ke(n,{label:"negative",get value(){return t(k)},set value(s){h(k,s,!0)}}),g(o,M)},$$slots:{default:!0}});var Z=u(p,2);Ae(Z,{title:"Color processing with a texture",children:(o,$)=>{var M=Bt(),j=v(M);ke(j,{label:"enabled",get value(){return t(S)},set value(f){h(S,f,!0)}});var q=u(j,2);Y(q,{label:"alphaThreshold",min:0,max:1,get value(){return t(O)},set value(f){h(O,f,!0)}});var r=u(q,2);Y(r,{label:"alphaSmoothing",min:0,max:1,get value(){return t(d)},set value(f){h(d,f,!0)}}),g(o,M)},$$slots:{default:!0}}),g(P,C)},$$slots:{default:!0}}),g(J,N),Te()}export{Jr as default};
