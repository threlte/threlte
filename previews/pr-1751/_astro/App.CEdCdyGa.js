import"./disclose-version.DsnmJJEf.js";import{p as Te,_ as a,f as h,n as Ne,a as Ce,g as t,$ as E,s as n,c as Ke,r as Xe,t as Je,N as We,e as u,h as R}from"./runtime.XdAhm9hg.js";import{c as ae,a as c,f as I}from"./template.D6i0fWOI.js";import{s as Ye}from"./render.DIB6WIKL.js";import{e as Re,i as Ae}from"./each.DO3-B4kf.js";import{c as V}from"./svelte-component.C2lNx87h.js";import{s as Ze}from"./style.0m3dKDtE.js";import{p as o,s as Qe,r as $e}from"./props.29maieIx.js";import{a as we,s as Oe}from"./store.PBLySVcD.js";import{aH as et,c as Be,u as tt,h as rt,C as Ie,j as A,a as De,i as ot,T as _,bX as at,au as Ue,aE as nt,a7 as st,av as lt,a5 as it,D as ut}from"./T.CIQBugds.js";import{T as xe}from"./tweened.Dju6vxGl.js";/* empty css                                                      */import{u as mt,a as Ve,c as ct,k as ht}from"./raycast.CrDucA7w.js";import{H as gt}from"./HTML.CD59OPz2.js";import{H as vt}from"./HUD.CxtAKuaQ.js";import{s as ft}from"./snippet.zb5DD4fg.js";import{O as dt}from"./OrbitControls.vf8AzM1K.js";import{S as pt}from"./Suspense.DmjgoWj_.js";import{i as _t}from"./index.BDSAYTGn.js";import{C as xt}from"./Canvas.DB8wxWRj.js";import"./legacy.eoQ0iq9U.js";import{P as bt}from"./tweakpane-plugin-waveform.CWC_zEm0.js";/* empty css                                                           */import{C as Ge}from"./Checkbox.CMYxDX-G.js";import{C as St}from"./Color.Bat0js2E.js";import{S as Y}from"./Slider.D1cwP11P.js";import{F as je}from"./Folder.SL1kmNDO.js";/* empty css                                                       *//* empty css                                                       */import"./events.B3d_pF6g.js";import"./utils.NcpWCyqV.js";import"./create-subscriber.DeG5rlNu.js";import"./branches.6GqzXayE.js";import"./attributes.B79LgCJy.js";import"./index.DNbPeuyJ.js";import"./index-client.C7k-19DO.js";import"./loop.BGGTUj09.js";import"./index.CfqHv38K.js";import"./utils.vK_o3JBb.js";import"./if.B_4c_Y5G.js";import"./useStage.CgYX7zAO.js";import"./injectPlugin.BUbDuExm.js";import"./transitions.DqydtAYe.js";import"./actions.lYTlyX53.js";import"./attributes.DUhBKk-Q.js";import"./class.CG1nLoVQ.js";import"./select.jQrQ6hRI.js";import"./OrbitControls.CBw4V2Xa.js";import"./useControlsContext.CGlm_l3U.js";import"./useThrelteUserContext.CL4gDbvX.js";import"./slot.B-cj_ODJ.js";import"./lifecycle.xbdt471Q.js";/* empty css                                                                     */import"./misc.Dr3470pI.js";import"./GenericInput.D388kHco.js";import"./GenericBinding.gFehh-Dl.js";import"./index.DgAtSlAd.js";import"./GenericSlider.DJmY2XWm.js";const wt=`
varying vec2 vUv;
varying vec2 vPos;
void main () {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
  vUv = uv;
  vPos = position.xy;
}
`,Tt=`
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
`;function Ct(Z,e){Te(e,!0);const x=()=>we(t(B),"$textureStore",C),H=()=>we(q,"$size",C),[C,v]=Oe();let f=o(e,"color",3,"white"),g=o(e,"zoom",3,1),y=o(e,"radius",3,0),U=o(e,"alphaThreshold",3,0),b=o(e,"alphaSmoothing",3,.1),P=o(e,"brightness",3,0),S=o(e,"contrast",3,0),L=o(e,"hue",3,0),Q=o(e,"saturation",3,0),M=o(e,"lightness",3,0),k=o(e,"negative",3,!1),G=o(e,"opacity",3,1),d=o(e,"toneMapped",3,!0),p=o(e,"transparent",3,!1),N=o(e,"ref",15),j=$e(e,["$$slots","$$events","$$legacy","color","zoom","radius","alphaThreshold","alphaSmoothing","brightness","contrast","hue","saturation","lightness","negative","opacity","toneMapped","transparent","texture","monochromeColor","monochromeStrength","colorProcessingTexture","side","url","ref","children"]);const K=new et;a(()=>{e.side&&(K.side=e.side)});const O=mt(),B=E(()=>O(e.url?Ve(e.url):ct(Promise.resolve(e.texture))));let{size:q}=Be();const z=tt(),r={color:{value:new Ie(f())},scale:{value:new A},imageBounds:{value:new A(1,1)},resolution:{value:1024},map:{value:null},zoom:{value:g()},radius:{value:y()},alphaThreshold:{value:U()},alphaSmoothing:{value:b()},brightness:{value:P()},contrast:{value:S()},monochromeColor:{value:new Ie(e.monochromeColor)},monochromeStrength:{value:e.monochromeStrength??0},negative:{value:k()?1:0},opacity:{value:G()},hsl:{value:new rt(0,0,0)},colorProccessingTexture:{value:null},colorProcessingTextureOverride:{value:0},colorProcessingEnabled:{value:1}};a(()=>{r.color.value.set(f())}),a(()=>{r.imageBounds.value.set(x()?.image.width??0,x()?.image.height??0)}),a(()=>{r.resolution.value=Math.max(H().width,H().height)}),a(()=>{r.zoom.value=g()}),a(()=>{r.radius.value=y()}),a(()=>{r.opacity.value=G()}),a(()=>{r.alphaThreshold.value=U()}),a(()=>{r.alphaSmoothing.value=b()}),a(()=>{r.brightness.value=P()}),a(()=>{r.contrast.value=S()}),a(()=>{r.hsl.value.x=L()}),a(()=>{r.hsl.value.z=M()}),a(()=>{r.negative.value=k()?1:0}),a(()=>{r.map.value=x()??null}),a(()=>{r.colorProccessingTexture.value=e.colorProcessingTexture??null}),a(()=>{r.colorProcessingTextureOverride.value=e.colorProcessingTexture?1:0}),a(()=>{e.monochromeColor!==void 0?(r.monochromeColor.value.set(e.monochromeColor),r.monochromeStrength.value=e.monochromeStrength??1):r.monochromeStrength.value=0}),a(()=>{let m=0;const w=(e.monochromeColor?1:0)*(e.monochromeStrength===void 0?1:e.monochromeStrength);for(const T of[P(),S(),L(),Q(),M(),w,e.colorProcessingTexture?1:0])if(T!==0){m=1;break}r.colorProcessingEnabled.value=m}),De(()=>{const m=z.current;if(!ot(m,"Mesh"))return;r.scale.value.set(m.scale.x,m.scale.y);const w=m.geometry;if(w!==void 0&&"parameters"in w){const{width:T,height:X}=w.parameters;r.scale.value.set(r.scale.value.x*T,r.scale.value.y*X)}}),_(Z,Qe({get is(){return K},get uniforms(){return r},get toneMapped(){return d()},get transparent(){return p()},get vertexShader(){return wt},get fragmentShader(){return Tt}},()=>j,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ImageMaterial/ImageMaterial.svelte",index:0},get ref(){return N()},set ref(m){N(m)},children:(m,w)=>{var T=ae(),X=h(T);ft(X,()=>e.children??Ne,()=>({ref:K})),c(m,T)},$$slots:{default:!0}})),Ce(),v()}const yt=`varying vec2 vUv;
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
`,Pt=`varying vec2 vUv;
void main() {
	gl_Position = vec4(position, 1.0f);
	vUv = uv;
}
`;class Mt extends at{constructor(e,...x){super(...x);const C=this.parameters.width*.5,v=new A(-C,0),f=new A(0,e),g=new A(C,0),y=new A().subVectors(v,f),U=new A().subVectors(f,g),b=new A().subVectors(v,g),P=y.length()*U.length()*b.length()/(2*Math.abs(y.cross(b))),S=new A(0,e-P),M=(new A().subVectors(v,S).angle()-Math.PI*.5)*2,k=this.getAttribute("uv"),G=this.getAttribute("position"),d=new A;for(let p=0;p<k.count;p+=1){const N=1-k.getX(p),j=G.getY(p);d.copy(g).rotateAround(S,M*N),G.setXYZ(p,d.x,j,-d.y)}G.needsUpdate=!0}}const be=100;class kt{radius=new xe(.1,{duration:be});scale=new xe(1,{duration:be});zoom=new xe(1,{duration:be});url;constructor(e){this.url=e}}const zt=["https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Caravaggio_-_Boy_Bitten_by_a_Lizard.jpg/762px-Caravaggio_-_Boy_Bitten_by_a_Lizard.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/The_Large_Plane_Trees_%28Road_Menders_at_Saint-R%C3%A9my%29%2C_by_Vincent_van_Gogh%2C_Cleveland_Museum_of_Art%2C_1947.209.jpg/963px-The_Large_Plane_Trees_%28Road_Menders_at_Saint-R%C3%A9my%29%2C_by_Vincent_van_Gogh%2C_Cleveland_Museum_of_Art%2C_1947.209.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/KlimtDieJungfrau.jpg/803px-KlimtDieJungfrau.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/The_Denial_of_St._Peter_-_Gerard_Seghers_-_Google_Cultural_Institute.jpg/1024px-The_Denial_of_St._Peter_-_Gerard_Seghers_-_Google_Cultural_Institute.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Antoine_Vollon_-_Mound_of_Butter_-_National_Gallery_of_Art.jpg/935px-Antoine_Vollon_-_Mound_of_Butter_-_National_Gallery_of_Art.jpg","https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/De_bedreigde_zwaan_Rijksmuseum_SK-A-4.jpeg/911px-De_bedreigde_zwaan_Rijksmuseum_SK-A-4.jpeg"],Rt=5,Se=["Hue(R)","Saturation(G)","Lightness(B)","Alpha(A)"];var At=I("<!> <!>",1),It=I("<!> <!>",1),Ut=I("<span> </span>"),Gt=I("<!> <!>",1),jt=I("<!> <!>",1),Ot=I("<!> <!>",1),Bt=I("<!> <!> <!> <!>",1);function Dt(Z,e){Te(e,!0);const x=()=>we(k,"$viewport",H),[H,C]=Oe();let v=o(e,"alphaSmoothing",3,.15),f=o(e,"alphaThreshold",3,.5),g=o(e,"brightness",3,0),y=o(e,"contrast",3,0),U=o(e,"hue",3,0),b=o(e,"lightness",3,0),P=o(e,"monochromeColor",3,"#ed8922"),S=o(e,"monochromeStrength",3,0),L=o(e,"negative",3,!1),Q=o(e,"saturation",3,0),M=o(e,"textureOverrideEnabled",3,!1);const k=ht(),{autoRenderTask:G,renderer:d}=Be();_t();const p=1.4,N=2*Math.PI,j=E(()=>zt.map(l=>new kt(l))),K=new Ue(0),O=new Ue(null);Ve("/textures/alpha.jpg").then(l=>{O.value=l});const B=new nt,q=new st(-1,1,0,-1,1),z=new lt(256,256,{count:Rt}),r=E(()=>{if(M())return z.textures[0]});for(let l=0,J=Se.length;l<J;l+=1){const D=z.textures[l+1];D&&(D.name=Se[l]??"")}De(l=>{K.value+=l;const J=d.getRenderTarget();d.setRenderTarget(z),d.render(B,q),d.setRenderTarget(J)},{running:()=>M(),before:G});const m=new it;var w=Bt(),T=h(w);_(T,{get is(){return m},makeDefault:!0,fov:20,position:[2,2,10],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:0},children:(l,J)=>{dt(l,{autoRotate:!0,enableDamping:!0,enableZoom:!1})},$$slots:{default:!0}});var X=n(T,2);V(X,()=>_.Mesh,(l,J)=>{J(l,{get attach(){return B},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:1},children:(D,oe)=>{var te=At(),i=h(te);V(i,()=>_.PlaneGeometry,(ee,F)=>{F(ee,{args:[2,2],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:2}})});var $=n(i,2);V($,()=>_.ShaderMaterial,(ee,F)=>{F(ee,{get fragmentShader(){return yt},get vertexShader(){return Pt},get"uniforms.uTime"(){return K},get"uniforms.uAlphaTexture"(){return O},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:3}})}),c(D,te)},$$slots:{default:!0}})});var s=n(X,2);vt(s,{children:(l,J)=>{var D=jt(),oe=h(D);V(oe,()=>_.OrthographicCamera,(i,$)=>{$(i,{makeDefault:!0,"position.z":5,zoom:120,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:4}})});var te=n(oe,2);{let i=E(()=>-1*x().width+1),$=E(()=>1*.5*x().height+1);V(te,()=>_.Group,(ee,F)=>{F(ee,{get"position.x"(){return t(i)},get"position.y"(){return t($)},get visible(){return M()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:5},children:(ne,ye)=>{var se=ae(),me=h(se);Re(me,17,()=>Se,Ae,(ce,he,W)=>{var ge=ae(),le=h(ge);V(le,()=>_.Group,(ie,ve)=>{ve(ie,{"position.x":W,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:6},children:(He,Ft)=>{var Pe=Gt(),Me=h(Pe);V(Me,()=>_.Mesh,(fe,ke)=>{ke(fe,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:7},children:(re,de)=>{var ue=It(),ze=h(ue);{let pe=E(()=>z.textures[W+1]??null);V(ze,()=>_.MeshBasicMaterial,(_e,Le)=>{Le(_e,{get map(){return t(pe)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:8}})})}var Fe=n(ze,2);V(Fe,()=>_.PlaneGeometry,(pe,_e)=>{_e(pe,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:9}})}),c(re,ue)},$$slots:{default:!0}})});var qe=n(Me,2);gt(qe,{center:!0,children:(fe,ke)=>{var re=Ut();let de;var ue=Ke(re,!0);Xe(re),Je(()=>{de=Ze(re,"",de,{color:"white",opacity:+M()}),Ye(ue,t(he))}),c(fe,re)},$$slots:{default:!0}}),c(He,Pe)},$$slots:{default:!0}})}),c(ce,ge)}),c(ne,se)},$$slots:{default:!0}})})}c(l,D)},$$slots:{default:!0}});var Ee=n(s,2);pt(Ee,{children:(l,J)=>{var D=ae(),oe=h(D);Re(oe,17,()=>t(j),Ae,(te,i,$)=>{const ee=E(()=>$/t(j).length),F=E(()=>t(ee)*N);var ne=ae(),ye=h(ne);{let se=E(()=>[p*Math.sin(t(F)),0,p*Math.cos(t(F))]),me=E(()=>[0,Math.PI+t(F),0]);V(ye,()=>_.Mesh,(ce,he)=>{he(ce,{get scale(){return t(i).scale.current},get position(){return t(se)},get rotation(){return t(me)},onpointerenter:W=>{W.stopPropagation(),t(i).radius.set(.25),t(i).scale.set(1.3),t(i).zoom.set(1.25)},onpointerleave:W=>{W.stopPropagation(),t(i).radius.set(.1),t(i).scale.set(1),t(i).zoom.set(1)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:10},children:(W,ge)=>{var le=Ot(),ie=h(le);_(ie,{get is(){return Mt},args:[.1,1,1,20,20],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/image-material/Scene.svelte",index:11}});var ve=n(ie,2);Ct(ve,{get radius(){return t(i).radius.current},get side(){return ut},transparent:!0,get url(){return t(i).url},get zoom(){return t(i).zoom.current},get alphaSmoothing(){return v()},get alphaThreshold(){return f()},get brightness(){return g()},get colorProcessingTexture(){return t(r)},get contrast(){return y()},get hue(){return U()},get lightness(){return b()},get monochromeColor(){return P()},get monochromeStrength(){return S()},get negative(){return L()},get saturation(){return Q()}}),c(W,le)},$$slots:{default:!0}})})}c(te,ne)}),c(l,D)},$$slots:{default:!0}}),c(Z,w),Ce(),C()}var Vt=I("<!> <!> <!> <!> <!> <!> <!> <!>",1),Et=I("<!> <!> <!>",1),Ht=I("<!> <!>",1),qt=I("<!> <!>",1);function Jr(Z,e){Te(e,!0);let x=R(0),H=R(0),C=R(!1),v=R(0),f=R(0),g=R(0),y=R("#ed8922"),U=R(0),b=R(!1),P=R(.5),S=R(.15);We(()=>{u(v,0),u(f,0),u(g,0),t(b)&&(u(v,.2),u(f,-1),u(g,.15))});var L=qt(),Q=h(L);xt(Q,{children:(k,G)=>{Dt(k,{get alphaSmoothing(){return t(S)},get alphaThreshold(){return t(P)},get brightness(){return t(x)},get contrast(){return t(H)},get hue(){return t(v)},get lightness(){return t(g)},get monochromeColor(){return t(y)},get monochromeStrength(){return t(U)},get negative(){return t(C)},get saturation(){return t(f)},get textureOverrideEnabled(){return t(b)}})},$$slots:{default:!0}});var M=n(Q,2);bt(M,{title:"Image",position:"fixed",children:(k,G)=>{var d=Ht(),p=h(d);je(p,{title:"Color processing",children:(j,K)=>{var O=Vt(),B=h(O);Y(B,{label:"brightness",min:-1,max:1,get value(){return t(x)},set value(s){u(x,s,!0)}});var q=n(B,2);Y(q,{label:"contrast",min:-1,max:1,get value(){return t(H)},set value(s){u(H,s,!0)}});var z=n(q,2);Y(z,{label:"hue",min:0,max:1,get value(){return t(v)},set value(s){u(v,s,!0)}});var r=n(z,2);Y(r,{label:"saturation",min:-1,max:1,get value(){return t(f)},set value(s){u(f,s,!0)}});var m=n(r,2);Y(m,{label:"lightness",min:-1,max:1,get value(){return t(g)},set value(s){u(g,s,!0)}});var w=n(m,2);Y(w,{label:"monochromeStrength",min:0,max:1,get value(){return t(U)},set value(s){u(U,s,!0)}});var T=n(w,2);St(T,{label:"monochromeColor",get value(){return t(y)},set value(s){u(y,s,!0)}});var X=n(T,2);Ge(X,{label:"negative",get value(){return t(C)},set value(s){u(C,s,!0)}}),c(j,O)},$$slots:{default:!0}});var N=n(p,2);je(N,{title:"Color processing with a texture",children:(j,K)=>{var O=Et(),B=h(O);Ge(B,{label:"enabled",get value(){return t(b)},set value(r){u(b,r,!0)}});var q=n(B,2);Y(q,{label:"alphaThreshold",min:0,max:1,get value(){return t(P)},set value(r){u(P,r,!0)}});var z=n(q,2);Y(z,{label:"alphaSmoothing",min:0,max:1,get value(){return t(S)},set value(r){u(S,r,!0)}}),c(j,O)},$$slots:{default:!0}}),c(k,d)},$$slots:{default:!0}}),c(Z,L),Ce()}export{Jr as default};
