import"./disclose-version.DsnmJJEf.js";import{p as Pe,L as i,b as c,d as C,g as t,f as p,n as Ne,a as Ce,s as m,u as N,c as Xe,r as $e,t as We}from"./runtime.DLdkg5Kz.js";import{c as se,a as g,f as U}from"./template.B2QqRX6L.js";import{s as Ye}from"./render.jaBnYzsZ.js";import{e as ke,i as Ae}from"./each.B2A49HXT.js";import{c as D}from"./svelte-component.E5E5S4yf.js";import{s as Ze}from"./style.I25_llyR.js";import{p as n,s as Ke,r as Je}from"./props.BNYK5s9I.js";import{a as Ve,s as Be}from"./store.Dey8hlVV.js";import{T as Qe,u as et,U as u,_ as Oe,a0 as tt,i as rt,a as S,V as ot,t as R,au as at,X as nt,aK as st,W as lt,a4 as it,D as ut}from"./observe.svelte.xXCGa1SA.js";import{f as _e}from"./index.IuXc8keW.js";import{T as Se}from"./tweened.L7E2Iz8A.js";/* empty css                                                      */import{u as De}from"./useThrelte.NsLg1obU.js";import{u as je}from"./useTask.svelte.BpQGpyZM.js";import{a as ct,u as mt,h as ht}from"./raycast.BwWd2f2y.js";import{u as ft}from"./useViewport.svelte.B-GrEoUk.js";import{H as gt}from"./HTML.2MKuhB2M.js";import{H as vt}from"./HUD.BmFqXDTs.js";import{s as dt}from"./snippet.CCzzTW4D.js";import{g as pt}from"./getImageSize.D3mESmNP.js";import{O as xt}from"./OrbitControls.39C5oOO9.js";import"./index.Ci79Gal9.js";import{S as bt}from"./Suspense.D6UM4hAi.js";import{i as wt}from"./index.B8eLtdxL.js";import{C as _t}from"./Canvas.Cbgu49n1.js";import"./legacy.Bo3sEplC.js";import{P as St}from"./tweakpane-plugin-waveform.CYVc3Ujb.js";/* empty css                                                           */import{C as Ee}from"./Checkbox.hSYMlfmS.js";import{C as Tt}from"./Color.DskGREnK.js";import{S as Y}from"./Slider.E8E6DmV-.js";import{F as Ge}from"./Folder.oV7Nv40F.js";/* empty css                                                       *//* empty css                                                       */import"./events.BHDVKm3g.js";import"./create-subscriber.CY3q5QYX.js";import"./branches.2gxZijTC.js";import"./attributes.B79LgCJy.js";import"./index.DoIdvkJn.js";import"./if.CWhf68p6.js";import"./loop.BGGTUj09.js";import"./utils.vK_o3JBb.js";import"./index-client.Bk7KcdZe.js";import"./BufferGeometryUtils.06y3mp3Z.js";import"./transitions._xWTTcFI.js";import"./injectPlugin.C-NbQoGG.js";import"./svelte-element.CFFYiwVE.js";import"./actions.BxTbXuJk.js";import"./attributes.C7Ridz34.js";import"./class.CI1Al7aT.js";import"./select.Dsc9dldY.js";import"./this.C9eRW5mT.js";import"./OrbitControls.BKlrQ_ux.js";import"./useControlsContext.CKo7W_l3.js";import"./Context.BUeHEFoW.js";import"./slot.Diimbhkj.js";import"./lifecycle.BWFflPdz.js";/* empty css                                                                     */import"./misc.DTcM20e1.js";import"./GenericInput.BvzQnVd3.js";import"./GenericBinding.cu-hYCUL.js";import"./index.DgAtSlAd.js";import"./GenericInputFolding.ZinuTu6X.js";import"./GenericSlider.BZj-9GsD.js";const yt=`
varying vec2 vUv;
varying vec2 vPos;
void main () {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vPos = position.xy;
}
`,Pt=`
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
`;function Ct(Z,e){Pe(e,!0);const M=()=>Ve(G,"$size",X),[X,I]=Be();let b=n(e,"color",3,"white"),T=n(e,"zoom",3,1),w=n(e,"radius",3,0),k=n(e,"alphaThreshold",3,0),j=n(e,"alphaSmoothing",3,.1),y=n(e,"brightness",3,0),A=n(e,"contrast",3,0),z=n(e,"hue",3,0),K=n(e,"saturation",3,0),$=n(e,"lightness",3,0),O=n(e,"negative",3,!1),E=n(e,"opacity",3,1),q=n(e,"toneMapped",3,!0),_=n(e,"transparent",3,!1),x=n(e,"ref",15),J=Je(e,["$$slots","$$events","$$legacy","color","zoom","radius","alphaThreshold","alphaSmoothing","brightness","contrast","hue","saturation","lightness","negative","opacity","toneMapped","transparent","texture","monochromeColor","monochromeStrength","colorProcessingTexture","side","url","ref","children"]);const{invalidate:o,renderer:te,size:G}=De(),V=ct(),H=mt(Qe);let v=C(void 0),d=0;i(()=>{const l=e.url,a=e.texture,P=++d;if(!l){c(v,a,!0);return}const s=H.load(l,{transform:f=>(f.colorSpace=te.outputColorSpace,f.needsUpdate=!0,f)}).catch(f=>{if(P===d)throw f});V(s).then(f=>{P===d&&c(v,f,!0)},()=>{P===d&&c(v,void 0)})});const re=et(),r={color:new u(new Oe),scale:new u(new R),imageBounds:new u(new R(1,1)),resolution:new u(1024),map:new u(null),zoom:new u(1),radius:new u(0),alphaThreshold:new u(0),alphaSmoothing:new u(.1),brightness:new u(0),contrast:new u(0),monochromeColor:new u(new Oe),monochromeStrength:new u(0),negative:new u(0),opacity:new u(1),hsl:new u(new ot),colorProccessingTexture:new u(null),colorProcessingTextureOverride:new u(0),colorProcessingEnabled:new u(1)},F=new tt({uniforms:r,vertexShader:yt,fragmentShader:Pt});i(()=>{e.side&&(F.side=e.side,o())}),i(()=>{r.color.value.set(b()),o()}),i(()=>{const l=pt(t(v)?.image);r.imageBounds.value.set(l?.width??0,l?.height??0),o()}),i(()=>{r.resolution.value=Math.max(M().width,M().height),o()}),i(()=>{r.zoom.value=T(),o()}),i(()=>{r.radius.value=w(),o()}),i(()=>{r.opacity.value=E(),o()}),i(()=>{r.alphaThreshold.value=k(),o()}),i(()=>{r.alphaSmoothing.value=j(),o()}),i(()=>{r.brightness.value=y(),o()}),i(()=>{r.contrast.value=A(),o()}),i(()=>{r.hsl.value.x=z(),o()}),i(()=>{r.hsl.value.z=$(),o()}),i(()=>{r.negative.value=O()?1:0,o()}),i(()=>{r.map.value=t(v)??null,o()}),i(()=>{r.colorProccessingTexture.value=e.colorProcessingTexture??null,o()}),i(()=>{r.colorProcessingTextureOverride.value=e.colorProcessingTexture?1:0,o()}),i(()=>{e.monochromeColor!==void 0?(r.monochromeColor.value.set(e.monochromeColor),r.monochromeStrength.value=e.monochromeStrength??1):r.monochromeStrength.value=0,o()}),i(()=>{let l=0;const a=(e.monochromeColor?1:0)*(e.monochromeStrength===void 0?1:e.monochromeStrength);for(const P of[y(),A(),z(),K(),$(),a,e.colorProcessingTexture?1:0])if(P!==0){l=1;break}r.colorProcessingEnabled.value=l,o()}),je(()=>{const l=re.current;if(!rt(l,"Mesh"))return;r.scale.value.set(l.scale.x,l.scale.y);const a=l.geometry;if(a!==void 0&&"parameters"in a){const{width:P,height:s}=a.parameters;r.scale.value.set(r.scale.value.x*P,r.scale.value.y*s)}},{autoInvalidate:!1}),S(Z,Ke({get is(){return F},get toneMapped(){return q()},get transparent(){return _()}},()=>J,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ImageMaterial/ImageMaterial.svelte",index:0},get ref(){return x()},set ref(l){x(l)},children:(l,a)=>{var P=se(),s=p(P);dt(s,()=>e.children??Ne,()=>({ref:F})),g(l,P)},$$slots:{default:!0}})),Ce(),I()}const Mt=`varying vec2 vUv;
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
`,zt=`varying vec2 vUv;
void main() {
	gl_Position = vec4(position, 1.0f);
	vUv = uv;
}
`;class Rt extends at{constructor(e,...M){super(...M);const I=this.parameters.width*.5,b=new R(-I,0),T=new R(0,e),w=new R(I,0),k=new R().subVectors(b,T),j=new R().subVectors(T,w),y=new R().subVectors(b,w),A=k.length()*j.length()*y.length()/(2*Math.abs(k.cross(y))),z=new R(0,e-A),O=(new R().subVectors(b,z).angle()-Math.PI*.5)*2,E=this.getAttribute("uv"),q=this.getAttribute("position"),_=new R;for(let x=0;x<E.count;x+=1){const J=1-E.getX(x),o=q.getY(x);_.copy(w).rotateAround(z,O*J),q.setXYZ(x,_.x,o,-_.y)}q.needsUpdate=!0}}const Te=800;class Ut{radius=new Se(.1,{duration:Te,easing:_e});scale=new Se(1,{duration:Te,easing:_e});zoom=new Se(1,{duration:Te,easing:_e});url;constructor(e){this.url=e}}const It=["/textures/paintings/caravaggio.jpg","/textures/paintings/vangogh.jpg","/textures/paintings/klimt.jpg","/textures/paintings/seghers.jpg","/textures/paintings/vollon.jpg","/textures/paintings/swan.jpg"],kt=5,ye=["Hue(R)","Saturation(G)","Lightness(B)","Alpha(A)"];var At=U("<!> <!>",1),Ot=U("<!> <!>",1),Et=U("<span> </span>"),Gt=U("<!> <!>",1),Vt=U("<!> <!>",1),Bt=U("<!> <!>",1),Dt=U("<!> <!> <!> <!>",1);function jt(Z,e){Pe(e,!0);const M=()=>Ve(E,"$viewport",X),[X,I]=Be();let b=n(e,"alphaSmoothing",3,.15),T=n(e,"alphaThreshold",3,.5),w=n(e,"brightness",3,0),k=n(e,"contrast",3,0),j=n(e,"hue",3,0),y=n(e,"lightness",3,0),A=n(e,"monochromeColor",3,"#ed8922"),z=n(e,"monochromeStrength",3,0),K=n(e,"negative",3,!1),$=n(e,"saturation",3,0),O=n(e,"textureOverrideEnabled",3,!1);const E=ft(),{autoRenderTask:q,renderer:_}=De();wt();const x=1.4,J=2*Math.PI,o=N(()=>It.map(s=>new Ut(s))),te=new u(0),G=new u(null);ht("/textures/alpha.jpg").then(s=>{G.value=s});const V=new nt,H=new st(-1,1,0,-1,1),v=new lt(256,256,{count:kt}),d=N(()=>{if(O())return v.textures[0]});for(let s=0,f=ye.length;s<f;s+=1){const B=v.textures[s+1];B&&(B.name=ye[s]??"")}je(s=>{te.value+=s;const f=_.getRenderTarget();_.setRenderTarget(v),_.render(V,H),_.setRenderTarget(f)},{running:()=>O(),before:q});const re=new it;var r=Dt(),F=p(r);S(F,{get is(){return re},makeDefault:!0,fov:20,position:[2,2,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:0},children:(s,f)=>{xt(s,{autoRotate:!0,enableDamping:!0,enableZoom:!1,enablePan:!1})},$$slots:{default:!0}});var l=m(F,2);D(l,()=>S.Mesh,(s,f)=>{f(s,{get attach(){return V},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:1},children:(B,ne)=>{var oe=At(),h=p(oe);D(h,()=>S.PlaneGeometry,(ee,L)=>{L(ee,{args:[2,2],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:2}})});var Q=m(h,2);D(Q,()=>S.ShaderMaterial,(ee,L)=>{L(ee,{get fragmentShader(){return Mt},get vertexShader(){return zt},get"uniforms.uTime"(){return te},get"uniforms.uAlphaTexture"(){return G},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:3}})}),g(B,oe)},$$slots:{default:!0}})});var a=m(l,2);vt(a,{children:(s,f)=>{var B=Vt(),ne=p(B);D(ne,()=>S.OrthographicCamera,(h,Q)=>{Q(h,{makeDefault:!0,"position.z":10,zoom:100,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:4}})});var oe=m(ne,2);{let h=N(()=>-1*M().width+1),Q=N(()=>1*.5*M().height+1);D(oe,()=>S.Group,(ee,L)=>{L(ee,{get"position.x"(){return t(h)},get"position.y"(){return t(Q)},get visible(){return O()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:5},children:(le,Me)=>{var ie=se(),he=p(ie);ke(he,17,()=>ye,Ae,(fe,ge,W)=>{var ve=se(),ue=p(ve);D(ue,()=>S.Group,(ce,de)=>{de(ce,{"position.x":W,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:6},children:(qe,Nt)=>{var ze=Gt(),Re=p(ze);D(Re,()=>S.Mesh,(pe,Ue)=>{Ue(pe,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:7},children:(ae,xe)=>{var me=Ot(),Ie=p(me);{let be=N(()=>v.textures[W+1]??null);D(Ie,()=>S.MeshBasicMaterial,(we,Le)=>{Le(we,{get map(){return t(be)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:8}})})}var Fe=m(Ie,2);D(Fe,()=>S.PlaneGeometry,(be,we)=>{we(be,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:9}})}),g(ae,me)},$$slots:{default:!0}})});var He=m(Re,2);gt(He,{center:!0,children:(pe,Ue)=>{var ae=Et();let xe;var me=Xe(ae,!0);$e(ae),We(()=>{xe=Ze(ae,"",xe,{color:"white",opacity:+O()}),Ye(me,t(ge))}),g(pe,ae)},$$slots:{default:!0}}),g(qe,ze)},$$slots:{default:!0}})}),g(fe,ve)}),g(le,ie)},$$slots:{default:!0}})})}g(s,B)},$$slots:{default:!0}});var P=m(a,2);bt(P,{children:(s,f)=>{var B=se(),ne=p(B);ke(ne,17,()=>t(o),Ae,(oe,h,Q)=>{const ee=N(()=>Q/t(o).length),L=N(()=>t(ee)*J);var le=se(),Me=p(le);{let ie=N(()=>[x*Math.sin(t(L)),0,x*Math.cos(t(L))]),he=N(()=>[0,Math.PI+t(L),0]);D(Me,()=>S.Mesh,(fe,ge)=>{ge(fe,{get scale(){return t(h).scale.current},get position(){return t(ie)},get rotation(){return t(he)},onpointerenter:W=>{W.stopPropagation(),t(h).radius.set(.25),t(h).scale.set(1.3),t(h).zoom.set(1.25)},onpointerleave:W=>{W.stopPropagation(),t(h).radius.set(.1),t(h).scale.set(1),t(h).zoom.set(1)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:10},children:(W,ve)=>{var ue=Bt(),ce=p(ue);S(ce,{get is(){return Rt},args:[.1,1,1,20,20],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:11}});var de=m(ce,2);Ct(de,{get radius(){return t(h).radius.current},get side(){return ut},transparent:!0,get url(){return t(h).url},get zoom(){return t(h).zoom.current},get alphaSmoothing(){return b()},get alphaThreshold(){return T()},get brightness(){return w()},get colorProcessingTexture(){return t(d)},get contrast(){return k()},get hue(){return j()},get lightness(){return y()},get monochromeColor(){return A()},get monochromeStrength(){return z()},get negative(){return K()},get saturation(){return $()}}),g(W,ue)},$$slots:{default:!0}})})}g(oe,le)}),g(s,B)},$$slots:{default:!0}}),g(Z,r),Ce(),I()}var qt=U("<!> <!> <!> <!> <!> <!> <!> <!>",1),Ht=U("<!> <!> <!>",1),Ft=U("<!> <!>",1),Lt=U("<!> <!>",1);function oo(Z,e){Pe(e,!0);let M=C(0),X=C(0),I=C(!1),b=C(0),T=C(0),w=C(0),k=C("#ed8922"),j=C(0),y=C(!1),A=C(.5),z=C(.15);i(()=>{c(b,0),c(T,0),c(w,0),t(y)&&(c(b,.2),c(T,-1),c(w,.15))});var K=Lt(),$=p(K);_t($,{children:(E,q)=>{jt(E,{get alphaSmoothing(){return t(z)},get alphaThreshold(){return t(A)},get brightness(){return t(M)},get contrast(){return t(X)},get hue(){return t(b)},get lightness(){return t(w)},get monochromeColor(){return t(k)},get monochromeStrength(){return t(j)},get negative(){return t(I)},get saturation(){return t(T)},get textureOverrideEnabled(){return t(y)}})},$$slots:{default:!0}});var O=m($,2);St(O,{title:"Image",position:"fixed",children:(E,q)=>{var _=Ft(),x=p(_);Ge(x,{title:"Color processing",children:(o,te)=>{var G=qt(),V=p(G);Y(V,{label:"brightness",min:-1,max:1,get value(){return t(M)},set value(a){c(M,a,!0)}});var H=m(V,2);Y(H,{label:"contrast",min:-1,max:1,get value(){return t(X)},set value(a){c(X,a,!0)}});var v=m(H,2);Y(v,{label:"hue",min:0,max:1,get value(){return t(b)},set value(a){c(b,a,!0)}});var d=m(v,2);Y(d,{label:"saturation",min:-1,max:1,get value(){return t(T)},set value(a){c(T,a,!0)}});var re=m(d,2);Y(re,{label:"lightness",min:-1,max:1,get value(){return t(w)},set value(a){c(w,a,!0)}});var r=m(re,2);Y(r,{label:"monochromeStrength",min:0,max:1,get value(){return t(j)},set value(a){c(j,a,!0)}});var F=m(r,2);Tt(F,{label:"monochromeColor",get value(){return t(k)},set value(a){c(k,a,!0)}});var l=m(F,2);Ee(l,{label:"negative",get value(){return t(I)},set value(a){c(I,a,!0)}}),g(o,G)},$$slots:{default:!0}});var J=m(x,2);Ge(J,{title:"Color processing with a texture",children:(o,te)=>{var G=Ht(),V=p(G);Ee(V,{label:"enabled",get value(){return t(y)},set value(d){c(y,d,!0)}});var H=m(V,2);Y(H,{label:"alphaThreshold",min:0,max:1,get value(){return t(A)},set value(d){c(A,d,!0)}});var v=m(H,2);Y(v,{label:"alphaSmoothing",min:0,max:1,get value(){return t(z)},set value(d){c(z,d,!0)}}),g(o,G)},$$slots:{default:!0}}),g(E,_)},$$slots:{default:!0}}),g(Z,K),Ce()}export{oo as default};
