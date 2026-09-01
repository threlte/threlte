import"./disclose-version.DsnmJJEf.js";import{p as Ce,L as l,b as u,d as P,g as t,f as p,n as Ne,a as Pe,s as m,u as N,c as $e,r as Xe,t as Ze}from"./runtime.BBxoejyG.js";import{c as se,a as v,f as U}from"./template.Bs5bR2Nc.js";import{s as Ye}from"./render.D4buDWGY.js";import{e as Ie,i as Ae}from"./each.BT71SVHo.js";import{c as j}from"./svelte-component.BCRxooPF.js";import{s as We}from"./style.Dj80DIfF.js";import{p as n,s as Je,r as Ke}from"./props.CGk66viq.js";import{s as Ve,a as Be}from"./store.5lYVrety.js";import{T as Qe,ai as et,as as i,i as tt,C as Oe,V as R,aF as rt,aj as ot,ah as S,bq as at,aC as nt,$ as st,at as lt,Z as it,z as ut}from"./observe.svelte.CFYFNOc8.js";import{f as _e}from"./index.IuXc8keW.js";import{T as Se}from"./tweened.Cv54qd0F.js";/* empty css                                                      */import{u as je}from"./useThrelte.o9barqGH.js";import{u as qe}from"./useTask.svelte.B27ZeBux.js";import{a as ct,b as mt,y as ht,i as ft}from"./raycast.B9A6jkWT.js";import{H as gt}from"./HTML.CJCWIOfh.js";import{H as vt}from"./HUD.Ctl4R4Fi.js";import{s as dt}from"./snippet.DUyBEcRR.js";import{O as pt}from"./OrbitControls.BezX-0tL.js";import{S as xt}from"./Suspense.B1B8a4OM.js";import{i as bt}from"./index.CDqRSIEv.js";import{C as wt}from"./Canvas.BXbx6C4n.js";import"./legacy.BGYm4LQg.js";import{P as _t}from"./tweakpane-plugin-waveform.x4F0czCQ.js";/* empty css                                                           */import{C as Ee}from"./Checkbox.ZyfT62YK.js";import{C as St}from"./Color.BjFdG_H9.js";import{S as Y}from"./Slider.CVGFkYhi.js";import{F as Ge}from"./Folder.xcp-_rUs.js";/* empty css                                                       *//* empty css                                                       */import"./events.C6-11v6q.js";import"./create-subscriber.CDornkmJ.js";import"./branches.Bg9W3cxg.js";import"./attributes.B79LgCJy.js";import"./index.DMCjpMEg.js";import"./if.UXK_Jlz6.js";import"./loop.BGGTUj09.js";import"./utils.vK_o3JBb.js";import"./index-client.Cy63zNyZ.js";import"./useStage.DT-BgVhI.js";import"./injectPlugin.D3y05FLP.js";import"./transitions.Bdo3_t96.js";import"./svelte-element.DnPD90Eo.js";import"./actions.CR0i-G7H.js";import"./attributes.OjPKe7tz.js";import"./class.BLDRDkbl.js";import"./select.BPWp3uRL.js";import"./this.q4pHlqVj.js";import"./OrbitControls.CPMLV8H2.js";import"./useControlsContext.BNHFb7l2.js";import"./Context.lmo6U6Sz.js";import"./slot.DjZXI7-J.js";import"./lifecycle.D7Zym_9W.js";/* empty css                                                                     */import"./misc.CzdH8owD.js";import"./GenericInput.CaVBFJub.js";import"./GenericBinding.C6U2xs-x.js";import"./index.DgAtSlAd.js";import"./GenericInputFolding.DsMMGGz4.js";import"./GenericSlider.DyrxG7l-.js";const Tt=`
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
`;function Ct(W,e){Ce(e,!0);const M=()=>Ve(G,"$size",$),[$,k]=Be();let b=n(e,"color",3,"white"),T=n(e,"zoom",3,1),w=n(e,"radius",3,0),I=n(e,"alphaThreshold",3,0),q=n(e,"alphaSmoothing",3,.1),y=n(e,"brightness",3,0),A=n(e,"contrast",3,0),z=n(e,"hue",3,0),J=n(e,"saturation",3,0),X=n(e,"lightness",3,0),O=n(e,"negative",3,!1),E=n(e,"opacity",3,1),D=n(e,"toneMapped",3,!0),_=n(e,"transparent",3,!1),x=n(e,"ref",15),K=Ke(e,["$$slots","$$events","$$legacy","color","zoom","radius","alphaThreshold","alphaSmoothing","brightness","contrast","hue","saturation","lightness","negative","opacity","toneMapped","transparent","texture","monochromeColor","monochromeStrength","colorProcessingTexture","side","url","ref","children"]);const{invalidate:o,renderer:te,size:G}=je(),V=ct(),F=mt(Qe);let f=P(void 0),d=0;l(()=>{const c=e.url,a=e.texture,C=++d;if(!c){u(f,a,!0);return}const s=F.load(c,{transform:g=>(g.colorSpace=te.outputColorSpace,g.needsUpdate=!0,g)}).catch(g=>{if(C===d)throw g});V(s).then(g=>{C===d&&u(f,g,!0)},()=>{C===d&&u(f,void 0)})});const re=et(),r={color:new i(new Oe),scale:new i(new R),imageBounds:new i(new R(1,1)),resolution:new i(1024),map:new i(null),zoom:new i(1),radius:new i(0),alphaThreshold:new i(0),alphaSmoothing:new i(.1),brightness:new i(0),contrast:new i(0),monochromeColor:new i(new Oe),monochromeStrength:new i(0),negative:new i(0),opacity:new i(1),hsl:new i(new tt),colorProccessingTexture:new i(null),colorProcessingTextureOverride:new i(0),colorProcessingEnabled:new i(1)},H=new rt({uniforms:r,vertexShader:Tt,fragmentShader:yt});l(()=>{e.side&&(H.side=e.side,o())}),l(()=>{r.color.value.set(b()),o()}),l(()=>{r.imageBounds.value.set(t(f)?.image.width??0,t(f)?.image.height??0),o()}),l(()=>{r.resolution.value=Math.max(M().width,M().height),o()}),l(()=>{r.zoom.value=T(),o()}),l(()=>{r.radius.value=w(),o()}),l(()=>{r.opacity.value=E(),o()}),l(()=>{r.alphaThreshold.value=I(),o()}),l(()=>{r.alphaSmoothing.value=q(),o()}),l(()=>{r.brightness.value=y(),o()}),l(()=>{r.contrast.value=A(),o()}),l(()=>{r.hsl.value.x=z(),o()}),l(()=>{r.hsl.value.z=X(),o()}),l(()=>{r.negative.value=O()?1:0,o()}),l(()=>{r.map.value=t(f)??null,o()}),l(()=>{r.colorProccessingTexture.value=e.colorProcessingTexture??null,o()}),l(()=>{r.colorProcessingTextureOverride.value=e.colorProcessingTexture?1:0,o()}),l(()=>{e.monochromeColor!==void 0?(r.monochromeColor.value.set(e.monochromeColor),r.monochromeStrength.value=e.monochromeStrength??1):r.monochromeStrength.value=0,o()}),l(()=>{let c=0;const a=(e.monochromeColor?1:0)*(e.monochromeStrength===void 0?1:e.monochromeStrength);for(const C of[y(),A(),z(),J(),X(),a,e.colorProcessingTexture?1:0])if(C!==0){c=1;break}r.colorProcessingEnabled.value=c,o()}),qe(()=>{const c=re.current;if(!ot(c,"Mesh"))return;r.scale.value.set(c.scale.x,c.scale.y);const a=c.geometry;if(a!==void 0&&"parameters"in a){const{width:C,height:s}=a.parameters;r.scale.value.set(r.scale.value.x*C,r.scale.value.y*s)}},{autoInvalidate:!1}),S(W,Je({get is(){return H},get toneMapped(){return D()},get transparent(){return _()}},()=>K,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ImageMaterial/ImageMaterial.svelte",index:0},get ref(){return x()},set ref(c){x(c)},children:(c,a)=>{var C=se(),s=p(C);dt(s,()=>e.children??Ne,()=>({ref:H})),v(c,C)},$$slots:{default:!0}})),Pe(),k()}const Pt=`varying vec2 vUv;
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
`;class zt extends at{constructor(e,...M){super(...M);const k=this.parameters.width*.5,b=new R(-k,0),T=new R(0,e),w=new R(k,0),I=new R().subVectors(b,T),q=new R().subVectors(T,w),y=new R().subVectors(b,w),A=I.length()*q.length()*y.length()/(2*Math.abs(I.cross(y))),z=new R(0,e-A),O=(new R().subVectors(b,z).angle()-Math.PI*.5)*2,E=this.getAttribute("uv"),D=this.getAttribute("position"),_=new R;for(let x=0;x<E.count;x+=1){const K=1-E.getX(x),o=D.getY(x);_.copy(w).rotateAround(z,O*K),D.setXYZ(x,_.x,o,-_.y)}D.needsUpdate=!0}}const Te=800;class Rt{radius=new Se(.1,{duration:Te,easing:_e});scale=new Se(1,{duration:Te,easing:_e});zoom=new Se(1,{duration:Te,easing:_e});url;constructor(e){this.url=e}}const Ut=["/textures/paintings/caravaggio.jpg","/textures/paintings/vangogh.jpg","/textures/paintings/klimt.jpg","/textures/paintings/seghers.jpg","/textures/paintings/vollon.jpg","/textures/paintings/swan.jpg"],kt=5,ye=["Hue(R)","Saturation(G)","Lightness(B)","Alpha(A)"];var It=U("<!> <!>",1),At=U("<!> <!>",1),Ot=U("<span> </span>"),Et=U("<!> <!>",1),Gt=U("<!> <!>",1),Vt=U("<!> <!>",1),Bt=U("<!> <!> <!> <!>",1);function jt(W,e){Ce(e,!0);const M=()=>Ve(E,"$viewport",$),[$,k]=Be();let b=n(e,"alphaSmoothing",3,.15),T=n(e,"alphaThreshold",3,.5),w=n(e,"brightness",3,0),I=n(e,"contrast",3,0),q=n(e,"hue",3,0),y=n(e,"lightness",3,0),A=n(e,"monochromeColor",3,"#ed8922"),z=n(e,"monochromeStrength",3,0),J=n(e,"negative",3,!1),X=n(e,"saturation",3,0),O=n(e,"textureOverrideEnabled",3,!1);const E=ht(),{autoRenderTask:D,renderer:_}=je();bt();const x=1.4,K=2*Math.PI,o=N(()=>Ut.map(s=>new Rt(s))),te=new i(0),G=new i(null);ft("/textures/alpha.jpg").then(s=>{G.value=s});const V=new nt,F=new st(-1,1,0,-1,1),f=new lt(256,256,{count:kt}),d=N(()=>{if(O())return f.textures[0]});for(let s=0,g=ye.length;s<g;s+=1){const B=f.textures[s+1];B&&(B.name=ye[s]??"")}qe(s=>{te.value+=s;const g=_.getRenderTarget();_.setRenderTarget(f),_.render(V,F),_.setRenderTarget(g)},{running:()=>O(),before:D});const re=new it;var r=Bt(),H=p(r);S(H,{get is(){return re},makeDefault:!0,fov:20,position:[2,2,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:0},children:(s,g)=>{pt(s,{autoRotate:!0,enableDamping:!0,enableZoom:!1,enablePan:!1})},$$slots:{default:!0}});var c=m(H,2);j(c,()=>S.Mesh,(s,g)=>{g(s,{get attach(){return V},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:1},children:(B,ne)=>{var oe=It(),h=p(oe);j(h,()=>S.PlaneGeometry,(ee,L)=>{L(ee,{args:[2,2],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:2}})});var Q=m(h,2);j(Q,()=>S.ShaderMaterial,(ee,L)=>{L(ee,{get fragmentShader(){return Pt},get vertexShader(){return Mt},get"uniforms.uTime"(){return te},get"uniforms.uAlphaTexture"(){return G},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:3}})}),v(B,oe)},$$slots:{default:!0}})});var a=m(c,2);vt(a,{children:(s,g)=>{var B=Gt(),ne=p(B);j(ne,()=>S.OrthographicCamera,(h,Q)=>{Q(h,{makeDefault:!0,"position.z":10,zoom:100,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:4}})});var oe=m(ne,2);{let h=N(()=>-1*M().width+1),Q=N(()=>1*.5*M().height+1);j(oe,()=>S.Group,(ee,L)=>{L(ee,{get"position.x"(){return t(h)},get"position.y"(){return t(Q)},get visible(){return O()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:5},children:(le,Me)=>{var ie=se(),he=p(ie);Ie(he,17,()=>ye,Ae,(fe,ge,Z)=>{var ve=se(),ue=p(ve);j(ue,()=>S.Group,(ce,de)=>{de(ce,{"position.x":Z,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:6},children:(De,Lt)=>{var ze=Et(),Re=p(ze);j(Re,()=>S.Mesh,(pe,Ue)=>{Ue(pe,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:7},children:(ae,xe)=>{var me=At(),ke=p(me);{let be=N(()=>f.textures[Z+1]??null);j(ke,()=>S.MeshBasicMaterial,(we,Le)=>{Le(we,{get map(){return t(be)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:8}})})}var He=m(ke,2);j(He,()=>S.PlaneGeometry,(be,we)=>{we(be,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:9}})}),v(ae,me)},$$slots:{default:!0}})});var Fe=m(Re,2);gt(Fe,{center:!0,children:(pe,Ue)=>{var ae=Ot();let xe;var me=$e(ae,!0);Xe(ae),Ze(()=>{xe=We(ae,"",xe,{color:"white",opacity:+O()}),Ye(me,t(ge))}),v(pe,ae)},$$slots:{default:!0}}),v(De,ze)},$$slots:{default:!0}})}),v(fe,ve)}),v(le,ie)},$$slots:{default:!0}})})}v(s,B)},$$slots:{default:!0}});var C=m(a,2);xt(C,{children:(s,g)=>{var B=se(),ne=p(B);Ie(ne,17,()=>t(o),Ae,(oe,h,Q)=>{const ee=N(()=>Q/t(o).length),L=N(()=>t(ee)*K);var le=se(),Me=p(le);{let ie=N(()=>[x*Math.sin(t(L)),0,x*Math.cos(t(L))]),he=N(()=>[0,Math.PI+t(L),0]);j(Me,()=>S.Mesh,(fe,ge)=>{ge(fe,{get scale(){return t(h).scale.current},get position(){return t(ie)},get rotation(){return t(he)},onpointerenter:Z=>{Z.stopPropagation(),t(h).radius.set(.25),t(h).scale.set(1.3),t(h).zoom.set(1.25)},onpointerleave:Z=>{Z.stopPropagation(),t(h).radius.set(.1),t(h).scale.set(1),t(h).zoom.set(1)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:10},children:(Z,ve)=>{var ue=Vt(),ce=p(ue);S(ce,{get is(){return zt},args:[.1,1,1,20,20],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:11}});var de=m(ce,2);Ct(de,{get radius(){return t(h).radius.current},get side(){return ut},transparent:!0,get url(){return t(h).url},get zoom(){return t(h).zoom.current},get alphaSmoothing(){return b()},get alphaThreshold(){return T()},get brightness(){return w()},get colorProcessingTexture(){return t(d)},get contrast(){return I()},get hue(){return q()},get lightness(){return y()},get monochromeColor(){return A()},get monochromeStrength(){return z()},get negative(){return J()},get saturation(){return X()}}),v(Z,ue)},$$slots:{default:!0}})})}v(oe,le)}),v(s,B)},$$slots:{default:!0}}),v(W,r),Pe(),k()}var qt=U("<!> <!> <!> <!> <!> <!> <!> <!>",1),Dt=U("<!> <!> <!>",1),Ft=U("<!> <!>",1),Ht=U("<!> <!>",1);function Qr(W,e){Ce(e,!0);let M=P(0),$=P(0),k=P(!1),b=P(0),T=P(0),w=P(0),I=P("#ed8922"),q=P(0),y=P(!1),A=P(.5),z=P(.15);l(()=>{u(b,0),u(T,0),u(w,0),t(y)&&(u(b,.2),u(T,-1),u(w,.15))});var J=Ht(),X=p(J);wt(X,{children:(E,D)=>{jt(E,{get alphaSmoothing(){return t(z)},get alphaThreshold(){return t(A)},get brightness(){return t(M)},get contrast(){return t($)},get hue(){return t(b)},get lightness(){return t(w)},get monochromeColor(){return t(I)},get monochromeStrength(){return t(q)},get negative(){return t(k)},get saturation(){return t(T)},get textureOverrideEnabled(){return t(y)}})},$$slots:{default:!0}});var O=m(X,2);_t(O,{title:"Image",position:"fixed",children:(E,D)=>{var _=Ft(),x=p(_);Ge(x,{title:"Color processing",children:(o,te)=>{var G=qt(),V=p(G);Y(V,{label:"brightness",min:-1,max:1,get value(){return t(M)},set value(a){u(M,a,!0)}});var F=m(V,2);Y(F,{label:"contrast",min:-1,max:1,get value(){return t($)},set value(a){u($,a,!0)}});var f=m(F,2);Y(f,{label:"hue",min:0,max:1,get value(){return t(b)},set value(a){u(b,a,!0)}});var d=m(f,2);Y(d,{label:"saturation",min:-1,max:1,get value(){return t(T)},set value(a){u(T,a,!0)}});var re=m(d,2);Y(re,{label:"lightness",min:-1,max:1,get value(){return t(w)},set value(a){u(w,a,!0)}});var r=m(re,2);Y(r,{label:"monochromeStrength",min:0,max:1,get value(){return t(q)},set value(a){u(q,a,!0)}});var H=m(r,2);St(H,{label:"monochromeColor",get value(){return t(I)},set value(a){u(I,a,!0)}});var c=m(H,2);Ee(c,{label:"negative",get value(){return t(k)},set value(a){u(k,a,!0)}}),v(o,G)},$$slots:{default:!0}});var K=m(x,2);Ge(K,{title:"Color processing with a texture",children:(o,te)=>{var G=Dt(),V=p(G);Ee(V,{label:"enabled",get value(){return t(y)},set value(d){u(y,d,!0)}});var F=m(V,2);Y(F,{label:"alphaThreshold",min:0,max:1,get value(){return t(A)},set value(d){u(A,d,!0)}});var f=m(F,2);Y(f,{label:"alphaSmoothing",min:0,max:1,get value(){return t(z)},set value(d){u(z,d,!0)}}),v(o,G)},$$slots:{default:!0}}),v(E,_)},$$slots:{default:!0}}),v(W,J),Pe()}export{Qr as default};
