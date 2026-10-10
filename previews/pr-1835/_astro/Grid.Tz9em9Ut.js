import"./disclose-version.DsnmJJEf.js";import{p as ae,L as l,f as x,s as le,g as ne,u as te,a as se}from"./runtime.DLdkg5Kz.js";import{f as de,a as k,c as D}from"./template.B2QqRX6L.js";import{s as ce}from"./snippet.CCzzTW4D.js";import{i as fe}from"./if.CWhf68p6.js";import{c as T}from"./svelte-component.E5E5S4yf.js";import{p as r,s as ue,r as ge}from"./props.BNYK5s9I.js";import{D as me,Y as ve,U as o,Z as C,V as u,i as he,P as we,a as p}from"./observe.svelte.Bodsz5r2.js";/* empty css                                                      */import{u as Pe}from"./useThrelte.Bfy33Awn.js";import{u as xe}from"./useTask.svelte.DloxDoJG.js";const ke=`
  varying vec3 localPosition;
  varying vec4 worldPosition;

  uniform vec3 worldCamProjPosition;
	uniform vec3 worldPlanePosition;
	uniform float fadeDistance;
	uniform bool infiniteGrid;
	uniform bool followCamera;

	uniform int coord0;
	uniform int coord1;
	uniform int coord2;

	void main() {
		localPosition = vec3(
		  position[coord0],
			position[coord1],
			position[coord2]
		);

		if (infiniteGrid) {
		  localPosition *= 1.0 + fadeDistance;
		}

		worldPosition = modelMatrix * vec4(localPosition, 1.0);
		if (followCamera) {
		  worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
      localPosition = (inverse(modelMatrix) * worldPosition).xyz;
		}

		gl_Position = projectionMatrix * viewMatrix * worldPosition;
	}
`,Ce=`
  #define PI 3.141592653589793

	varying vec3 localPosition;
	varying vec4 worldPosition;

	uniform vec3 worldCamProjPosition;
	uniform float cellSize;
	uniform float sectionSize;
	uniform vec3 cellColor;
	uniform vec3 sectionColor;
	uniform float fadeDistance;
	uniform float fadeStrength;
	uniform vec3 fadeOrigin;
	uniform float cellThickness;
	uniform float sectionThickness;
	uniform vec3 backgroundColor;
	uniform float backgroundOpacity;

	uniform bool infiniteGrid;

	uniform int coord0;
	uniform int coord1;
	uniform int coord2;

	// 0 - default; 1 - lines; 2 - circles; 3 - polar
	uniform int gridType;

  // lineGrid coord for lines
	uniform int lineGridCoord;

	// circlegrid max radius
	uniform float circleGridMaxRadius;

	// polar grid dividers
	uniform float polarCellDividers;
	uniform float polarSectionDividers;

	float getSquareGrid(float size, float thickness, vec3 localPos) {
		vec2 coord = localPos.xy / size;

		vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
		float line = min(grid.x, grid.y) + 1.0 - thickness;

		return 1.0 - min(line, 1.0);
	}

	float getLinesGrid(float size, float thickness, vec3 localPos) {
		float coord = localPos[lineGridCoord] / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		return 1.0 - min(line, 1.0);
	}

	float getRadiusMask(float radius) {
		if (infiniteGrid || circleGridMaxRadius <= 0.0) {
			return 1.0;
		}

		float width = max(fwidth(radius), 0.0001);
		return 1.0 - smoothstep(circleGridMaxRadius, circleGridMaxRadius + width, radius);
	}

	float getPolarDividerMask(float radius) {
		if (infiniteGrid || circleGridMaxRadius <= 0.0) {
			return 1.0;
		}

		float width = max(fwidth(radius), 0.0001);
		return 1.0 - smoothstep(circleGridMaxRadius - width, circleGridMaxRadius, radius);
	}

	float getCirclesGrid(float size, float thickness, float radius) {
		float coord = radius / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		return 1.0 - min(line, 1.0);
	}

	float getPolarGrid(float size, float thickness, float polarDividers, vec3 localPos, float radius) {
		if (polarDividers <= 0.0) {
			return getCirclesGrid(size, thickness, radius);
		}

		float rad = radius / size;
		vec2 coord = vec2(rad, atan(localPos.x, localPos.y) * polarDividers / PI) ;

		vec2 wrapped = vec2(coord.x, fract(coord.y / (2.0 * polarDividers)) * (2.0 * polarDividers));
		vec2 coordWidth = fwidth(coord);
		vec2 wrappedWidth = fwidth(wrapped);
		vec2 width = (coord.y < -polarDividers * 0.5 || coord.y > polarDividers * 0.5 ? wrappedWidth : coordWidth) * (1.+thickness*0.25);

		// Compute anti-aliased world-space grid lines
		vec2 grid = abs(fract(coord - 0.5) - 0.5) / width;
		float circle = 1.0 - min(grid.x, 1.0);
		float divider = 1.0 - min(grid.y, 1.0);

		return max(circle, divider * getPolarDividerMask(radius));
	}

	void main() {
		float g1 = 0.0;
		float g2 = 0.0;

		vec3 localPos = vec3(localPosition[coord0], localPosition[coord1], localPosition[coord2]);
		float radiusMask = 1.0;

		if (gridType == 0) {
			g1 = getSquareGrid(cellSize, cellThickness, localPos);
			g2 = getSquareGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 1) {
			g1 = getLinesGrid(cellSize, cellThickness, localPos);
			g2 = getLinesGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 2) {
			float radius = length(localPos.xy);
			g1 = getCirclesGrid(cellSize, cellThickness, radius);
			g2 = getCirclesGrid(sectionSize, sectionThickness, radius);
			radiusMask = getRadiusMask(radius);

		} else if (gridType == 3) {
			float radius = length(localPos.xy);
			g1 = getPolarGrid(cellSize, cellThickness, polarCellDividers, localPos, radius);
			g2 = getPolarGrid(sectionSize, sectionThickness, polarSectionDividers, localPos, radius);
			radiusMask = getRadiusMask(radius);
		}

		float dist = distance(fadeOrigin, worldPosition.xyz);
		float d = 1.0 - min(dist / fadeDistance, 1.0);
		float fadeFactor = pow(d, fadeStrength) * 0.95;

		vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

		if (backgroundOpacity > 0.0) {
			float linesAlpha = clamp((g1 + g2) * fadeFactor, 0.0,1.0);
			vec3 finalColor = mix(backgroundColor, color, linesAlpha);
			float blendedAlpha = max(linesAlpha, backgroundOpacity * fadeFactor);
			gl_FragColor = vec4(finalColor, blendedAlpha);

		} else {
			gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
			gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
		}

		gl_FragColor.a *= radiusMask;

		if (gl_FragColor.a <= 0.0) {
		  discard;
		}

		#include <tonemapping_fragment>
		#include <colorspace_fragment>
	}
`;var pe=de("<!> <!>",1);function Fe(b,e){ae(e,!0);let M=r(e,"cellSize",3,1),_=r(e,"sectionSize",3,10),O=r(e,"cellColor",3,"#000000"),R=r(e,"sectionColor",3,"#0000ee"),F=r(e,"backgroundColor",3,"#dadada"),A=r(e,"backgroundOpacity",3,0),j=r(e,"fadeDistance",3,100),I=r(e,"fadeStrength",3,1),W=r(e,"cellThickness",3,1),L=r(e,"sectionThickness",3,2),V=r(e,"plane",3,"xz"),h=r(e,"gridSize",19,()=>[20,20]),w=r(e,"followCamera",3,!1),q=r(e,"infiniteGrid",3,!1),N=r(e,"side",3,me),U=r(e,"type",3,"grid"),Y=r(e,"axis",3,"x"),Z=r(e,"maxRadius",3,0),B=r(e,"cellDividers",3,6),E=r(e,"sectionDividers",3,2),y=r(e,"ref",15),H=ge(e,["$$slots","$$events","$$legacy","cellSize","sectionSize","cellColor","sectionColor","backgroundColor","backgroundOpacity","fadeDistance","fadeStrength","cellThickness","sectionThickness","plane","gridSize","followCamera","infiniteGrid","fadeOrigin","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const g=new ve,{invalidate:a,camera:J}=Pe(),S=new we,G=new u(0,1,0),K=new u(0,0,0),Q=new u,m={x:0,y:1,z:2},X={xz:{axes:"xzy",normal:[0,1,0]},xy:{axes:"xyz",normal:[0,0,1]},zy:{axes:"zyx",normal:[1,0,0]}},z={grid:0,lines:1,circular:2,polar:3},i={cellSize:new o(1),sectionSize:new o(10),cellColor:new o(new C("#000000")),sectionColor:new o(new C("#0000ee")),backgroundColor:new o(new C("#dadada")),backgroundOpacity:new o(0),fadeDistance:new o(100),fadeStrength:new o(1),fadeOrigin:new o(new u),cellThickness:new o(1),sectionThickness:new o(2),infiniteGrid:new o(!1),followCamera:new o(!1),coord0:new o(0),coord1:new o(2),coord2:new o(1),gridType:new o(z.grid),lineGridCoord:new o(m.x),circleGridMaxRadius:new o(0),polarCellDividers:new o(6),polarSectionDividers:new o(2),worldCamProjPosition:new o(new u),worldPlanePosition:new o(new u)};l(()=>{const{axes:n,normal:d}=X[V()],c=n.charAt(0),f=n.charAt(1),v=n.charAt(2);i.coord0.value=m[c],i.coord1.value=m[f],i.coord2.value=m[v],G.set(d[0],d[1],d[2]),a()}),l(()=>{i.cellSize.value=M(),a()}),l(()=>{i.sectionSize.value=_(),a()}),l(()=>{i.cellColor.value.set(O()),a()}),l(()=>{i.sectionColor.value.set(R()),a()}),l(()=>{i.backgroundColor.value.set(F()),a()}),l(()=>{i.backgroundOpacity.value=A(),a()}),l(()=>{i.fadeDistance.value=j(),a()}),l(()=>{i.fadeStrength.value=I(),a()}),l(()=>{e.fadeOrigin&&(he(e.fadeOrigin,"Vector3")?i.fadeOrigin.value.copy(e.fadeOrigin):i.fadeOrigin.value.fromArray(e.fadeOrigin)),a()}),l(()=>{i.cellThickness.value=W(),a()}),l(()=>{i.sectionThickness.value=L(),a()}),l(()=>{i.followCamera.value=w(),a()}),l(()=>{i.infiniteGrid.value=q(),a()}),l(()=>{i.gridType.value=z[U()],i.lineGridCoord.value=m[Y()],i.circleGridMaxRadius.value=Z(),i.polarCellDividers.value=B(),i.polarSectionDividers.value=E(),a()}),xe(()=>{S.setFromNormalAndCoplanarPoint(G,K).applyMatrix4(g.matrixWorld);const n=g.material,d=n.uniforms.worldCamProjPosition,c=n.uniforms.worldPlanePosition,f=n.uniforms.fadeOrigin,v=S.projectPoint(J.current.getWorldPosition(Q),d.value);e.fadeOrigin||f.value.copy(v),w()&&c.value.set(0,0,0).applyMatrix4(g.matrixWorld)},{autoInvalidate:!1,running:()=>w()||!e.fadeOrigin}),p(b,ue({get is(){return g},frustumCulled:!1},()=>H,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:0},get ref(){return y()},set ref(n){y(n)},children:(n,d)=>{var c=pe(),f=x(c);T(f,()=>p.ShaderMaterial,(t,s)=>{s(t,{get fragmentShader(){return Ce},get vertexShader(){return ke},get uniforms(){return i},transparent:!0,get side(){return N()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:1}})});var v=le(f,2);{var $=t=>{var s=D(),P=x(s);ce(P,()=>e.children,()=>({ref:g})),k(t,s)},ee=t=>{var s=D(),P=x(s);{let ie=te(()=>typeof h()=="number"?[h(),h()]:h());T(P,()=>p.PlaneGeometry,(oe,re)=>{re(oe,{get args(){return ne(ie)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:2}})})}k(t,s)};fe(v,t=>{e.children?t($):t(ee,!1)})}k(n,c)},$$slots:{default:!0}})),se()}export{Fe as G};
