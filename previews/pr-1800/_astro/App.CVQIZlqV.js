import"./disclose-version.DsnmJJEf.js";import{p as Pe,Z as l,f,n as Xe,a as Ce,s as i,g as t,u as N,c as Ze,r as $e,t as We,L as Ye,b as h,d as R}from"./runtime.HAn2cbcW.js";import{c as ne,a as g,f as k}from"./template.D0onEdCl.js";import{s as Je}from"./render.Bbi3B6Ko.js";import{e as Ue,i as Ae}from"./each.BYT7NPU8.js";import{c as B}from"./svelte-component.DYzPROXC.js";import{s as Ke}from"./style.fhjZYVWn.js";import{p as o,s as Qe,r as et}from"./props.DsKWk81K.js";import{a as ye,s as Ve}from"./store.BmD_Ou3p.js";import{u as tt,av as s,r as rt,C as Oe,V as I,aI as ot,i as at,T as b,c2 as nt,aF as st,a5 as lt,aw as it,a3 as ut,D as ct}from"./observe.svelte.BoKeyuw0.js";import{f as we}from"./index.IuXc8keW.js";import{T as _e}from"./tweened.NY0tNCsj.js";/* empty css                                                      */import{u as Be}from"./useThrelte.CoAYwyjF.js";import{u as De}from"./useTask.svelte.sgAOcP65.js";import{u as mt,a as je,c as ht,k as gt}from"./raycast.D2ggPI2E.js";import{H as ft}from"./HTML.BUhXqtO0.js";import{H as vt}from"./HUD.BX8onm2K.js";import{s as dt}from"./snippet.ILc-veMr.js";import{O as pt}from"./OrbitControls._-eLT11J.js";import{S as xt}from"./Suspense.BymOSUlz.js";import{i as bt}from"./index.b6sdPaV6.js";import{C as wt}from"./Canvas.Oa6fkcU5.js";import"./legacy.zjNW9yEZ.js";import{P as _t}from"./tweakpane-plugin-waveform.TT9db71o.js";/* empty css                                                           */import{C as Ee}from"./Checkbox.8ohTMWpS.js";import{C as St}from"./Color.CX_k6A1p.js";import{S as J}from"./Slider.lkqSscOU.js";import{F as Ge}from"./Folder.DRcVNPYW.js";/* empty css                                                       *//* empty css                                                       */import"./events.BvDTqhu8.js";import"./utils.NcpWCyqV.js";import"./create-subscriber.BzboetKF.js";import"./branches.DmVhxYr2.js";import"./attributes.B79LgCJy.js";import"./index.BH4vLsnN.js";import"./loop.BGGTUj09.js";import"./utils.vK_o3JBb.js";import"./if.Lug6H8hl.js";import"./index-client.CKKesSrH.js";import"./useStage.DXZWr2Ae.js";import"./injectPlugin.Cb942mpr.js";import"./transitions.BxEO2i3S.js";import"./actions.D_zJwGKn.js";import"./attributes.BsjBbrh5.js";import"./class.hTB891_b.js";import"./select.7nnKgsaP.js";import"./OrbitControls.eFUeTKHP.js";import"./useControlsContext.D_pJetmb.js";import"./useThrelteUserContext.BchTdPUD.js";import"./slot.BxHg17lX.js";import"./lifecycle.D2JJOSiE.js";/* empty css                                                                     */import"./misc.D3vMmY6z.js";import"./GenericInput.C7gzvn-t.js";import"./GenericBinding.D_OWe5Vs.js";import"./index.DgAtSlAd.js";import"./GenericInputFolding.DmHLqlVi.js";import"./GenericSlider.CO2xOFNW.js";const Tt=`
varying vec2 vUv;
varying vec2 vPos;
void main () {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vPos = position.xy;
}
`,yt=`
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
`;function Pt(K,e){Pe(e,!0);const w=()=>ye(H,"$textureStore",T),D=()=>ye(G,"$size",T),[T,v]=Ve();let _=o(e,"color",3,"white"),d=o(e,"zoom",3,1),U=o(e,"radius",3,0),j=o(e,"alphaThreshold",3,0),y=o(e,"alphaSmoothing",3,.1),A=o(e,"brightness",3,0),P=o(e,"contrast",3,0),X=o(e,"hue",3,0),Q=o(e,"saturation",3,0),C=o(e,"lightness",3,0),O=o(e,"negative",3,!1),q=o(e,"opacity",3,1),p=o(e,"toneMapped",3,!0),x=o(e,"transparent",3,!1),Z=o(e,"ref",15),E=et(e,["$$slots","$$events","$$legacy","color","zoom","radius","alphaThreshold","alphaSmoothing","brightness","contrast","hue","saturation","lightness","negative","opacity","toneMapped","transparent","texture","monochromeColor","monochromeStrength","colorProcessingTexture","side","url","ref","children"]);const{invalidate:a,size:G}=Be(),H=mt()(e.url?je(e.url):ht(Promise.resolve(e.texture))),M=tt(),r={color:new s(new Oe),scale:new s(new I),imageBounds:new s(new I(1,1)),resolution:new s(1024),map:new s(null),zoom:new s(1),radius:new s(0),alphaThreshold:new s(0),alphaSmoothing:new s(.1),brightness:new s(0),contrast:new s(0),monochromeColor:new s(new Oe),monochromeStrength:new s(0),negative:new s(0),opacity:new s(1),hsl:new s(new rt),colorProccessingTexture:new s(null),colorProcessingTextureOverride:new s(0),colorProcessingEnabled:new s(1)},$=new ot({uniforms:r,vertexShader:Tt,fragmentShader:yt});l(()=>{e.side&&($.side=e.side,a())}),l(()=>{r.color.value.set(_()),a()}),l(()=>{r.imageBounds.value.set(w()?.image.width??0,w()?.image.height??0),a()}),l(()=>{r.resolution.value=Math.max(D().width,D().height),a()}),l(()=>{r.zoom.value=d(),a()}),l(()=>{r.radius.value=U(),a()}),l(()=>{r.opacity.value=q(),a()}),l(()=>{r.alphaThreshold.value=j(),a()}),l(()=>{r.alphaSmoothing.value=y(),a()}),l(()=>{r.brightness.value=A(),a()}),l(()=>{r.contrast.value=P(),a()}),l(()=>{r.hsl.value.x=X(),a()}),l(()=>{r.hsl.value.z=C(),a()}),l(()=>{r.negative.value=O()?1:0,a()}),l(()=>{r.map.value=w()??null,a()}),l(()=>{r.colorProccessingTexture.value=e.colorProcessingTexture??null,a()}),l(()=>{r.colorProcessingTextureOverride.value=e.colorProcessingTexture?1:0,a()}),l(()=>{e.monochromeColor!==void 0?(r.monochromeColor.value.set(e.monochromeColor),r.monochromeStrength.value=e.monochromeStrength??1):r.monochromeStrength.value=0,a()}),l(()=>{let c=0;const S=(e.monochromeColor?1:0)*(e.monochromeStrength===void 0?1:e.monochromeStrength);for(const z of[A(),P(),X(),Q(),C(),S,e.colorProcessingTexture?1:0])if(z!==0){c=1;break}r.colorProcessingEnabled.value=c,a()}),De(()=>{const c=M.current;if(!at(c,"Mesh"))return;r.scale.value.set(c.scale.x,c.scale.y);const S=c.geometry;if(S!==void 0&&"parameters"in S){const{width:z,height:n}=S.parameters;r.scale.value.set(r.scale.value.x*z,r.scale.value.y*n)}},{autoInvalidate:!1}),b(K,Qe({get is(){return $},get toneMapped(){return p()},get transparent(){return x()}},()=>E,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ImageMaterial/ImageMaterial.svelte",index:0},get ref(){return Z()},set ref(c){Z(c)},children:(c,S)=>{var z=ne(),n=f(z);dt(n,()=>e.children??Xe,()=>({ref:$})),g(c,z)},$$slots:{default:!0}})),Ce(),v()}const Ct=`varying vec2 vUv;
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
`,Mt=`varying vec2 vUv;
void main() {
	gl_Position = vec4(position, 1.0f);
	vUv = uv;
}
`;class zt extends nt{constructor(e,...w){super(...w);const T=this.parameters.width*.5,v=new I(-T,0),_=new I(0,e),d=new I(T,0),U=new I().subVectors(v,_),j=new I().subVectors(_,d),y=new I().subVectors(v,d),A=U.length()*j.length()*y.length()/(2*Math.abs(U.cross(y))),P=new I(0,e-A),C=(new I().subVectors(v,P).angle()-Math.PI*.5)*2,O=this.getAttribute("uv"),q=this.getAttribute("position"),p=new I;for(let x=0;x<O.count;x+=1){const Z=1-O.getX(x),E=q.getY(x);p.copy(d).rotateAround(P,C*Z),q.setXYZ(x,p.x,E,-p.y)}q.needsUpdate=!0}}const Se=800;class Rt{radius=new _e(.1,{duration:Se,easing:we});scale=new _e(1,{duration:Se,easing:we});zoom=new _e(1,{duration:Se,easing:we});url;constructor(e){this.url=e}}const It=["/textures/paintings/caravaggio.jpg","/textures/paintings/vangogh.jpg","/textures/paintings/klimt.jpg","/textures/paintings/seghers.jpg","/textures/paintings/vollon.jpg","/textures/paintings/swan.jpg"],kt=5,Te=["Hue(R)","Saturation(G)","Lightness(B)","Alpha(A)"];var Ut=k("<!> <!>",1),At=k("<!> <!>",1),Ot=k("<span> </span>"),Et=k("<!> <!>",1),Gt=k("<!> <!>",1),Vt=k("<!> <!>",1),Bt=k("<!> <!> <!> <!>",1);function Dt(K,e){Pe(e,!0);const w=()=>ye(O,"$viewport",D),[D,T]=Ve();let v=o(e,"alphaSmoothing",3,.15),_=o(e,"alphaThreshold",3,.5),d=o(e,"brightness",3,0),U=o(e,"contrast",3,0),j=o(e,"hue",3,0),y=o(e,"lightness",3,0),A=o(e,"monochromeColor",3,"#ed8922"),P=o(e,"monochromeStrength",3,0),X=o(e,"negative",3,!1),Q=o(e,"saturation",3,0),C=o(e,"textureOverrideEnabled",3,!1);const O=gt(),{autoRenderTask:q,renderer:p}=Be();bt();const x=1.4,Z=2*Math.PI,E=N(()=>It.map(u=>new Rt(u))),a=new s(0),G=new s(null);je("/textures/alpha.jpg").then(u=>{G.value=u});const F=new st,H=new lt(-1,1,0,-1,1),M=new it(256,256,{count:kt}),r=N(()=>{if(C())return M.textures[0]});for(let u=0,W=Te.length;u<W;u+=1){const V=M.textures[u+1];V&&(V.name=Te[u]??"")}De(u=>{a.value+=u;const W=p.getRenderTarget();p.setRenderTarget(M),p.render(F,H),p.setRenderTarget(W)},{running:()=>C(),before:q});const $=new ut;var c=Bt(),S=f(c);b(S,{get is(){return $},makeDefault:!0,fov:20,position:[2,2,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:0},children:(u,W)=>{pt(u,{autoRotate:!0,enableDamping:!0,enableZoom:!1,enablePan:!1})},$$slots:{default:!0}});var z=i(S,2);B(z,()=>b.Mesh,(u,W)=>{W(u,{get attach(){return F},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:1},children:(V,ae)=>{var re=Ut(),m=f(re);B(m,()=>b.PlaneGeometry,(te,L)=>{L(te,{args:[2,2],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:2}})});var ee=i(m,2);B(ee,()=>b.ShaderMaterial,(te,L)=>{L(te,{get fragmentShader(){return Ct},get vertexShader(){return Mt},get"uniforms.uTime"(){return a},get"uniforms.uAlphaTexture"(){return G},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:3}})}),g(V,re)},$$slots:{default:!0}})});var n=i(z,2);vt(n,{children:(u,W)=>{var V=Gt(),ae=f(V);B(ae,()=>b.OrthographicCamera,(m,ee)=>{ee(m,{makeDefault:!0,"position.z":10,zoom:100,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:4}})});var re=i(ae,2);{let m=N(()=>-1*w().width+1),ee=N(()=>1*.5*w().height+1);B(re,()=>b.Group,(te,L)=>{L(te,{get"position.x"(){return t(m)},get"position.y"(){return t(ee)},get visible(){return C()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:5},children:(se,Me)=>{var le=ne(),me=f(le);Ue(me,17,()=>Te,Ae,(he,ge,Y)=>{var fe=ne(),ie=f(fe);B(ie,()=>b.Group,(ue,ve)=>{ve(ue,{"position.x":Y,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:6},children:(Fe,Lt)=>{var ze=Et(),Re=f(ze);B(Re,()=>b.Mesh,(de,Ie)=>{Ie(de,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:7},children:(oe,pe)=>{var ce=At(),ke=f(ce);{let xe=N(()=>M.textures[Y+1]??null);B(ke,()=>b.MeshBasicMaterial,(be,Ne)=>{Ne(be,{get map(){return t(xe)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:8}})})}var Le=i(ke,2);B(Le,()=>b.PlaneGeometry,(xe,be)=>{be(xe,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:9}})}),g(oe,ce)},$$slots:{default:!0}})});var He=i(Re,2);ft(He,{center:!0,children:(de,Ie)=>{var oe=Ot();let pe;var ce=Ze(oe,!0);$e(oe),We(()=>{pe=Ke(oe,"",pe,{color:"white",opacity:+C()}),Je(ce,t(ge))}),g(de,oe)},$$slots:{default:!0}}),g(Fe,ze)},$$slots:{default:!0}})}),g(he,fe)}),g(se,le)},$$slots:{default:!0}})})}g(u,V)},$$slots:{default:!0}});var qe=i(n,2);xt(qe,{children:(u,W)=>{var V=ne(),ae=f(V);Ue(ae,17,()=>t(E),Ae,(re,m,ee)=>{const te=N(()=>ee/t(E).length),L=N(()=>t(te)*Z);var se=ne(),Me=f(se);{let le=N(()=>[x*Math.sin(t(L)),0,x*Math.cos(t(L))]),me=N(()=>[0,Math.PI+t(L),0]);B(Me,()=>b.Mesh,(he,ge)=>{ge(he,{get scale(){return t(m).scale.current},get position(){return t(le)},get rotation(){return t(me)},onpointerenter:Y=>{Y.stopPropagation(),t(m).radius.set(.25),t(m).scale.set(1.3),t(m).zoom.set(1.25)},onpointerleave:Y=>{Y.stopPropagation(),t(m).radius.set(.1),t(m).scale.set(1),t(m).zoom.set(1)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:10},children:(Y,fe)=>{var ie=Vt(),ue=f(ie);b(ue,{get is(){return zt},args:[.1,1,1,20,20],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:11}});var ve=i(ue,2);Pt(ve,{get radius(){return t(m).radius.current},get side(){return ct},transparent:!0,get url(){return t(m).url},get zoom(){return t(m).zoom.current},get alphaSmoothing(){return v()},get alphaThreshold(){return _()},get brightness(){return d()},get colorProcessingTexture(){return t(r)},get contrast(){return U()},get hue(){return j()},get lightness(){return y()},get monochromeColor(){return A()},get monochromeStrength(){return P()},get negative(){return X()},get saturation(){return Q()}}),g(Y,ie)},$$slots:{default:!0}})})}g(re,se)}),g(u,V)},$$slots:{default:!0}}),g(K,c),Ce(),T()}var jt=k("<!> <!> <!> <!> <!> <!> <!> <!>",1),qt=k("<!> <!> <!>",1),Ft=k("<!> <!>",1),Ht=k("<!> <!>",1);function Kr(K,e){Pe(e,!0);let w=R(0),D=R(0),T=R(!1),v=R(0),_=R(0),d=R(0),U=R("#ed8922"),j=R(0),y=R(!1),A=R(.5),P=R(.15);Ye(()=>{h(v,0),h(_,0),h(d,0),t(y)&&(h(v,.2),h(_,-1),h(d,.15))});var X=Ht(),Q=f(X);wt(Q,{children:(O,q)=>{Dt(O,{get alphaSmoothing(){return t(P)},get alphaThreshold(){return t(A)},get brightness(){return t(w)},get contrast(){return t(D)},get hue(){return t(v)},get lightness(){return t(d)},get monochromeColor(){return t(U)},get monochromeStrength(){return t(j)},get negative(){return t(T)},get saturation(){return t(_)},get textureOverrideEnabled(){return t(y)}})},$$slots:{default:!0}});var C=i(Q,2);_t(C,{title:"Image",position:"fixed",children:(O,q)=>{var p=Ft(),x=f(p);Ge(x,{title:"Color processing",children:(E,a)=>{var G=jt(),F=f(G);J(F,{label:"brightness",min:-1,max:1,get value(){return t(w)},set value(n){h(w,n,!0)}});var H=i(F,2);J(H,{label:"contrast",min:-1,max:1,get value(){return t(D)},set value(n){h(D,n,!0)}});var M=i(H,2);J(M,{label:"hue",min:0,max:1,get value(){return t(v)},set value(n){h(v,n,!0)}});var r=i(M,2);J(r,{label:"saturation",min:-1,max:1,get value(){return t(_)},set value(n){h(_,n,!0)}});var $=i(r,2);J($,{label:"lightness",min:-1,max:1,get value(){return t(d)},set value(n){h(d,n,!0)}});var c=i($,2);J(c,{label:"monochromeStrength",min:0,max:1,get value(){return t(j)},set value(n){h(j,n,!0)}});var S=i(c,2);St(S,{label:"monochromeColor",get value(){return t(U)},set value(n){h(U,n,!0)}});var z=i(S,2);Ee(z,{label:"negative",get value(){return t(T)},set value(n){h(T,n,!0)}}),g(E,G)},$$slots:{default:!0}});var Z=i(x,2);Ge(Z,{title:"Color processing with a texture",children:(E,a)=>{var G=qt(),F=f(G);Ee(F,{label:"enabled",get value(){return t(y)},set value(r){h(y,r,!0)}});var H=i(F,2);J(H,{label:"alphaThreshold",min:0,max:1,get value(){return t(A)},set value(r){h(A,r,!0)}});var M=i(H,2);J(M,{label:"alphaSmoothing",min:0,max:1,get value(){return t(P)},set value(r){h(P,r,!0)}}),g(E,G)},$$slots:{default:!0}}),g(O,p)},$$slots:{default:!0}}),g(K,X),Ce()}export{Kr as default};
