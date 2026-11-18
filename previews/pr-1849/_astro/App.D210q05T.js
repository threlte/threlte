import"./disclose-version.DsnmJJEf.js";import{p as _e,L as i,b as c,d as z,g as t,f as p,n as He,a as Te,s as m,u as L,c as je,r as qe,t as Fe}from"./runtime.DLdkg5Kz.js";import{c as oe,a as g,f as I}from"./template.B2QqRX6L.js";import{s as Le}from"./render.jaBnYzsZ.js";import{e as Re,i as Ue}from"./each.B2A49HXT.js";import{c as B}from"./svelte-component.E5E5S4yf.js";import{s as Ne}from"./style.I25_llyR.js";import{p as s,s as Xe,r as We}from"./props.C0aiEMAr.js";import{T as Ye,u as Ze,U as u,_ as Ie,a0 as Je,i as Ke,a as T,V as Qe,t as U,as as $e,X as et,aH as tt,W as rt,a4 as ot,D as at}from"./observe.svelte.CmjctptC.js";import{f as xe}from"./index.IuXc8keW.js";import{T as be}from"./tweened.L7E2Iz8A.js";/* empty css                                                      */import{u as Oe}from"./useThrelte.BExRv3o8.js";import{u as Ee}from"./useTask.svelte.wM_--mkW.js";import{a as nt,u as st,h as lt}from"./raycast.BAM67R9A.js";import{u as it}from"./useViewport.svelte.BpJMaJN0.js";import{H as ut}from"./HTML.DMBMigw2.js";import{H as ct}from"./HUD.D4PWSC4W.js";import{s as mt}from"./snippet.CCzzTW4D.js";import{g as ht}from"./getImageSize.D3mESmNP.js";import{O as ft}from"./OrbitControls.DtYlyT3e.js";import"./index.illIopZv.js";import{S as gt}from"./Suspense.Ct79e77s.js";import{i as vt}from"./index.C6x4X-oU.js";import{C as dt}from"./Canvas.DAOEWUup.js";import"./legacy.Bo3sEplC.js";import{P as pt}from"./tweakpane-plugin-waveform.Cl3AHizr.js";/* empty css                                                           */import{C as ke}from"./Checkbox.Ct2XRrNg.js";import{C as xt}from"./Color.C0kJwqA6.js";import{S as Y}from"./Slider.CW5ujUsW.js";import{F as Ae}from"./Folder.CPlhsmd0.js";/* empty css                                                       *//* empty css                                                       */import"./events.BHDVKm3g.js";import"./create-subscriber.CY3q5QYX.js";import"./branches.2gxZijTC.js";import"./attributes.B79LgCJy.js";import"./store.BOc5wNBj.js";import"./index.DoIdvkJn.js";import"./if.CWhf68p6.js";import"./loop.BGGTUj09.js";import"./utils.vK_o3JBb.js";import"./index-client.Bk7KcdZe.js";import"./BufferGeometryUtils.DZHwJS_O.js";import"./transitions._xWTTcFI.js";import"./injectPlugin.BsikqEG8.js";import"./svelte-element.CFFYiwVE.js";import"./actions.BxTbXuJk.js";import"./attributes.C7Ridz34.js";import"./class.CI1Al7aT.js";import"./select.Dsc9dldY.js";import"./this.C9eRW5mT.js";import"./OrbitControls.DEbzxhIh.js";import"./useControlsContext.svelte.fzcq7XpI.js";import"./Context.DcsLklHM.js";import"./slot.Diimbhkj.js";import"./lifecycle.BWFflPdz.js";/* empty css                                                                     */import"./misc.DTcM20e1.js";import"./GenericInput.C1hB7tqA.js";import"./GenericBinding.BzOtqbJi.js";import"./index.DgAtSlAd.js";import"./GenericInputFolding.MzN1fFCh.js";import"./GenericSlider.C599PG0h.js";const bt=`
varying vec2 vUv;
varying vec2 vPos;
void main () {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vPos = position.xy;
}
`,wt=`
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
`;function St(Z,e){_e(e,!0);let D=s(e,"color",3,"white"),N=s(e,"zoom",3,1),k=s(e,"radius",3,0),w=s(e,"alphaThreshold",3,0),y=s(e,"alphaSmoothing",3,.1),x=s(e,"brightness",3,0),R=s(e,"contrast",3,0),A=s(e,"hue",3,0),P=s(e,"saturation",3,0),O=s(e,"lightness",3,0),S=s(e,"negative",3,!1),X=s(e,"opacity",3,1),J=s(e,"toneMapped",3,!0),E=s(e,"transparent",3,!1),C=s(e,"ref",15),H=We(e,["$$slots","$$events","$$legacy","color","zoom","radius","alphaThreshold","alphaSmoothing","brightness","contrast","hue","saturation","lightness","negative","opacity","toneMapped","transparent","texture","monochromeColor","monochromeStrength","colorProcessingTexture","side","url","ref","children"]);const{invalidate:a,renderer:_,size:j}=Oe(),G=nt(),te=st(Ye);let f=z(void 0),M=0;i(()=>{const l=e.url,b=e.texture,d=++M;if(!l){c(f,b,!0);return}const n=te.load(l,{transform:o=>(o.colorSpace=_.outputColorSpace,o.needsUpdate=!0,o)}).catch(o=>{if(d===M)throw o});G(n).then(o=>{d===M&&c(f,o,!0)},()=>{d===M&&c(f,void 0)})});const q=Ze(),r={color:new u(new Ie),scale:new u(new U),imageBounds:new u(new U(1,1)),resolution:new u(1024),map:new u(null),zoom:new u(1),radius:new u(0),alphaThreshold:new u(0),alphaSmoothing:new u(.1),brightness:new u(0),contrast:new u(0),monochromeColor:new u(new Ie),monochromeStrength:new u(0),negative:new u(0),opacity:new u(1),hsl:new u(new Qe),colorProccessingTexture:new u(null),colorProcessingTextureOverride:new u(0),colorProcessingEnabled:new u(1)},v=new Je({uniforms:r,vertexShader:bt,fragmentShader:wt});i(()=>{e.side&&(v.side=e.side,a())}),i(()=>{r.color.value.set(D()),a()}),i(()=>{const l=ht(t(f)?.image);r.imageBounds.value.set(l?.width??0,l?.height??0),a()}),i(()=>{r.resolution.value=Math.max(j.current.width,j.current.height),a()}),i(()=>{r.zoom.value=N(),a()}),i(()=>{r.radius.value=k(),a()}),i(()=>{r.opacity.value=X(),a()}),i(()=>{r.alphaThreshold.value=w(),a()}),i(()=>{r.alphaSmoothing.value=y(),a()}),i(()=>{r.brightness.value=x(),a()}),i(()=>{r.contrast.value=R(),a()}),i(()=>{r.hsl.value.x=A(),a()}),i(()=>{r.hsl.value.y=P(),a()}),i(()=>{r.hsl.value.z=O(),a()}),i(()=>{r.negative.value=S()?1:0,a()}),i(()=>{r.map.value=t(f)??null,a()}),i(()=>{r.colorProccessingTexture.value=e.colorProcessingTexture??null,a()}),i(()=>{r.colorProcessingTextureOverride.value=e.colorProcessingTexture?1:0,a()}),i(()=>{e.monochromeColor!==void 0?(r.monochromeColor.value.set(e.monochromeColor),r.monochromeStrength.value=e.monochromeStrength??1):r.monochromeStrength.value=0,a()}),i(()=>{let l=0;const b=(e.monochromeColor?1:0)*(e.monochromeStrength===void 0?1:e.monochromeStrength);for(const d of[x(),R(),A(),P(),O(),b,e.colorProcessingTexture?1:0])if(d!==0){l=1;break}r.colorProcessingEnabled.value=l,a()}),Ee(()=>{const l=q.current;if(!Ke(l,"Mesh"))return;r.scale.value.set(l.scale.x,l.scale.y);const b=l.geometry;if(b!==void 0&&"parameters"in b){const{width:d,height:n}=b.parameters;r.scale.value.set(r.scale.value.x*d,r.scale.value.y*n)}},{autoInvalidate:!1}),T(Z,Xe({get is(){return v},get toneMapped(){return J()},get transparent(){return E()}},()=>H,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ImageMaterial/ImageMaterial.svelte",index:0},get ref(){return C()},set ref(l){C(l)},children:(l,b)=>{var d=oe(),n=p(d);mt(n,()=>e.children??He,()=>({ref:v})),g(l,d)},$$slots:{default:!0}})),Te()}const _t=`varying vec2 vUv;
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
`,Tt=`varying vec2 vUv;
void main() {
	gl_Position = vec4(position, 1.0f);
	vUv = uv;
}
`;class yt extends $e{constructor(e,...D){super(...D);const k=this.parameters.width*.5,w=new U(-k,0),y=new U(0,e),x=new U(k,0),R=new U().subVectors(w,y),A=new U().subVectors(y,x),P=new U().subVectors(w,x),O=R.length()*A.length()*P.length()/(2*Math.abs(R.cross(P))),S=new U(0,e-O),E=(new U().subVectors(w,S).angle()-Math.PI*.5)*2,C=this.getAttribute("uv"),H=this.getAttribute("position"),a=new U;for(let _=0;_<C.count;_+=1){const j=1-C.getX(_),G=H.getY(_);a.copy(x).rotateAround(S,E*j),H.setXYZ(_,a.x,G,-a.y)}H.needsUpdate=!0}}const we=800;class Pt{radius=new be(.1,{duration:we,easing:xe});scale=new be(1,{duration:we,easing:xe});zoom=new be(1,{duration:we,easing:xe});url;constructor(e){this.url=e}}const Ct=["/textures/paintings/caravaggio.jpg","/textures/paintings/vangogh.jpg","/textures/paintings/klimt.jpg","/textures/paintings/seghers.jpg","/textures/paintings/vollon.jpg","/textures/paintings/swan.jpg"],Mt=5,Se=["Hue(R)","Saturation(G)","Lightness(B)","Alpha(A)"];var zt=I("<!> <!>",1),Rt=I("<!> <!>",1),Ut=I("<span> </span>"),It=I("<!> <!>",1),kt=I("<!> <!>",1),At=I("<!> <!>",1),Ot=I("<!> <!> <!> <!>",1);function Et(Z,e){_e(e,!0);let D=s(e,"alphaSmoothing",3,.15),N=s(e,"alphaThreshold",3,.5),k=s(e,"brightness",3,0),w=s(e,"contrast",3,0),y=s(e,"hue",3,0),x=s(e,"lightness",3,0),R=s(e,"monochromeColor",3,"#ed8922"),A=s(e,"monochromeStrength",3,0),P=s(e,"negative",3,!1),O=s(e,"saturation",3,0),S=s(e,"textureOverrideEnabled",3,!1);const X=it(),{autoRenderTask:J,renderer:E}=Oe();vt();const C=1.4,H=2*Math.PI,a=L(()=>Ct.map(n=>new Pt(n))),_=new u(0),j=new u(null);lt("/textures/alpha.jpg").then(n=>{j.value=n});const G=new et,te=new tt(-1,1,0,-1,1),f=new rt(256,256,{count:Mt}),M=L(()=>{if(S())return f.textures[0]});for(let n=0,o=Se.length;n<o;n+=1){const V=f.textures[n+1];V&&(V.name=Se[n]??"")}Ee(n=>{_.value+=n;const o=E.getRenderTarget();E.setRenderTarget(f),E.render(G,te),E.setRenderTarget(o)},{running:()=>S(),before:J});const q=new ot;var r=Ot(),v=p(r);T(v,{get is(){return q},makeDefault:!0,fov:20,position:[2,2,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:0},children:(n,o)=>{ft(n,{autoRotate:!0,enableDamping:!0,enableZoom:!1,enablePan:!1})},$$slots:{default:!0}});var l=m(v,2);B(l,()=>T.Mesh,(n,o)=>{o(n,{get attach(){return G},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:1},children:(V,re)=>{var $=zt(),h=p($);B(h,()=>T.PlaneGeometry,(Q,F)=>{F(Q,{args:[2,2],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:2}})});var K=m(h,2);B(K,()=>T.ShaderMaterial,(Q,F)=>{F(Q,{get fragmentShader(){return _t},get vertexShader(){return Tt},get"uniforms.uTime"(){return _},get"uniforms.uAlphaTexture"(){return j},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:3}})}),g(V,$)},$$slots:{default:!0}})});var b=m(l,2);ct(b,{children:(n,o)=>{var V=kt(),re=p(V);B(re,()=>T.OrthographicCamera,(h,K)=>{K(h,{makeDefault:!0,"position.z":10,zoom:100,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:4}})});var $=m(re,2);{let h=L(()=>-1*X.current.width+1),K=L(()=>1*.5*X.current.height+1);B($,()=>T.Group,(Q,F)=>{F(Q,{get"position.x"(){return t(h)},get"position.y"(){return t(K)},get visible(){return S()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:5},children:(ae,ye)=>{var ne=oe(),ue=p(ne);Re(ue,17,()=>Se,Ue,(ce,me,W)=>{var he=oe(),se=p(he);B(se,()=>T.Group,(le,fe)=>{fe(le,{"position.x":W,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:6},children:(Ge,Ht)=>{var Pe=It(),Ce=p(Pe);B(Ce,()=>T.Mesh,(ge,Me)=>{Me(ge,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:7},children:(ee,ve)=>{var ie=Rt(),ze=p(ie);{let de=L(()=>f.textures[W+1]??null);B(ze,()=>T.MeshBasicMaterial,(pe,De)=>{De(pe,{get map(){return t(de)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:8}})})}var Be=m(ze,2);B(Be,()=>T.PlaneGeometry,(de,pe)=>{pe(de,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:9}})}),g(ee,ie)},$$slots:{default:!0}})});var Ve=m(Ce,2);ut(Ve,{center:!0,children:(ge,Me)=>{var ee=Ut();let ve;var ie=je(ee,!0);qe(ee),Fe(()=>{ve=Ne(ee,"",ve,{color:"white",opacity:+S()}),Le(ie,t(me))}),g(ge,ee)},$$slots:{default:!0}}),g(Ge,Pe)},$$slots:{default:!0}})}),g(ce,he)}),g(ae,ne)},$$slots:{default:!0}})})}g(n,V)},$$slots:{default:!0}});var d=m(b,2);gt(d,{children:(n,o)=>{var V=oe(),re=p(V);Re(re,17,()=>t(a),Ue,($,h,K)=>{const Q=L(()=>K/t(a).length),F=L(()=>t(Q)*H);var ae=oe(),ye=p(ae);{let ne=L(()=>[C*Math.sin(t(F)),0,C*Math.cos(t(F))]),ue=L(()=>[0,Math.PI+t(F),0]);B(ye,()=>T.Mesh,(ce,me)=>{me(ce,{get scale(){return t(h).scale.current},get position(){return t(ne)},get rotation(){return t(ue)},onpointerenter:W=>{W.stopPropagation(),t(h).radius.set(.25),t(h).scale.set(1.3),t(h).zoom.set(1.25)},onpointerleave:W=>{W.stopPropagation(),t(h).radius.set(.1),t(h).scale.set(1),t(h).zoom.set(1)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:10},children:(W,he)=>{var se=At(),le=p(se);T(le,{get is(){return yt},args:[.1,1,1,20,20],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:11}});var fe=m(le,2);St(fe,{get radius(){return t(h).radius.current},get side(){return at},transparent:!0,get url(){return t(h).url},get zoom(){return t(h).zoom.current},get alphaSmoothing(){return D()},get alphaThreshold(){return N()},get brightness(){return k()},get colorProcessingTexture(){return t(M)},get contrast(){return w()},get hue(){return y()},get lightness(){return x()},get monochromeColor(){return R()},get monochromeStrength(){return A()},get negative(){return P()},get saturation(){return O()}}),g(W,se)},$$slots:{default:!0}})})}g($,ae)}),g(n,V)},$$slots:{default:!0}}),g(Z,r),Te()}var Gt=I("<!> <!> <!> <!> <!> <!> <!> <!>",1),Vt=I("<!> <!> <!>",1),Bt=I("<!> <!>",1),Dt=I("<!> <!>",1);function Qr(Z,e){_e(e,!0);let D=z(0),N=z(0),k=z(!1),w=z(0),y=z(0),x=z(0),R=z("#ed8922"),A=z(0),P=z(!1),O=z(.5),S=z(.15);i(()=>{c(w,0),c(y,0),c(x,0),t(P)&&(c(w,.2),c(y,-1),c(x,.15))});var X=Dt(),J=p(X);dt(J,{children:(C,H)=>{Et(C,{get alphaSmoothing(){return t(S)},get alphaThreshold(){return t(O)},get brightness(){return t(D)},get contrast(){return t(N)},get hue(){return t(w)},get lightness(){return t(x)},get monochromeColor(){return t(R)},get monochromeStrength(){return t(A)},get negative(){return t(k)},get saturation(){return t(y)},get textureOverrideEnabled(){return t(P)}})},$$slots:{default:!0}});var E=m(J,2);pt(E,{title:"Image",position:"fixed",children:(C,H)=>{var a=Bt(),_=p(a);Ae(_,{title:"Color processing",children:(G,te)=>{var f=Gt(),M=p(f);Y(M,{label:"brightness",min:-1,max:1,get value(){return t(D)},set value(o){c(D,o,!0)}});var q=m(M,2);Y(q,{label:"contrast",min:-1,max:1,get value(){return t(N)},set value(o){c(N,o,!0)}});var r=m(q,2);Y(r,{label:"hue",min:0,max:1,get value(){return t(w)},set value(o){c(w,o,!0)}});var v=m(r,2);Y(v,{label:"saturation",min:-1,max:1,get value(){return t(y)},set value(o){c(y,o,!0)}});var l=m(v,2);Y(l,{label:"lightness",min:-1,max:1,get value(){return t(x)},set value(o){c(x,o,!0)}});var b=m(l,2);Y(b,{label:"monochromeStrength",min:0,max:1,get value(){return t(A)},set value(o){c(A,o,!0)}});var d=m(b,2);xt(d,{label:"monochromeColor",get value(){return t(R)},set value(o){c(R,o,!0)}});var n=m(d,2);ke(n,{label:"negative",get value(){return t(k)},set value(o){c(k,o,!0)}}),g(G,f)},$$slots:{default:!0}});var j=m(_,2);Ae(j,{title:"Color processing with a texture",children:(G,te)=>{var f=Vt(),M=p(f);ke(M,{label:"enabled",get value(){return t(P)},set value(v){c(P,v,!0)}});var q=m(M,2);Y(q,{label:"alphaThreshold",min:0,max:1,get value(){return t(O)},set value(v){c(O,v,!0)}});var r=m(q,2);Y(r,{label:"alphaSmoothing",min:0,max:1,get value(){return t(S)},set value(v){c(S,v,!0)}}),g(G,f)},$$slots:{default:!0}}),g(C,a)},$$slots:{default:!0}}),g(Z,X),Te()}export{Qr as default};
