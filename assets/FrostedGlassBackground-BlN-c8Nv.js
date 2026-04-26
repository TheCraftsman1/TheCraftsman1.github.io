import{j as t,r as s}from"./motion-vendor-DAnv4tlY.js";import{C as P,A as V,u as y,a as C,S as D,D as A,b as R,T as k,c as W,F as S,d as G,M as f}from"./three-vendor-CRzA50yC.js";import"./react-vendor-Bzgz95E1.js";const I=`
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;

  void main() {
    vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
    vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
    vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`,B=`
  uniform float uTime;
  uniform vec3 uColor;

  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;

  // IQ's cosine palette for iridescence
  vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
  }

  void main() {
    vec3 N = normalize(vNormal);
    vec3 V = normalize(vViewDir);
    float NdotV = dot(N, V);

    // ── Fresnel (glass edge detection) ──
    float fresnel = pow(1.0 - abs(NdotV), 2.2);

    // ── Fake refraction: simulate distorted content behind glass ──
    vec3 refracted = refract(-V, N, 1.0 / 1.45);
    float refractPattern =
      sin(refracted.x * 10.0 + uTime * 0.3) *
      cos(refracted.y * 8.0 - uTime * 0.2) * 0.5 + 0.5;

    // Background seen through glass (subtle color shift on white bg)
    vec3 bgColor = vec3(0.96, 0.97, 0.98);
    vec3 distortedBg = mix(
      bgColor,
      bgColor * vec3(0.92, 0.95, 1.0),
      refractPattern * 0.6
    );

    // ── Thin-film iridescence (rainbow interference) ──
    float iriAngle = acos(clamp(abs(NdotV), 0.0, 1.0)) / 3.14159;
    vec3 thinFilm = pal(
      iriAngle * 2.5 + uTime * 0.015,
      vec3(0.5, 0.5, 0.5),
      vec3(0.5, 0.5, 0.5),
      vec3(1.0, 1.0, 1.0),
      vec3(0.00, 0.10, 0.20)
    );

    // ── Environment reflection (multi-direction faked studio) ──
    vec3 refl = reflect(-V, N);
    float topLight = pow(max(refl.y, 0.0), 3.0) * 0.7;
    float bottomFill = pow(max(-refl.y, 0.0), 6.0) * 0.15;
    float sideCatch = pow(max(abs(refl.x), 0.0), 5.0) * 0.25;
    float rimGlow = pow(1.0 - abs(NdotV), 4.0) * 0.4;
    vec3 envReflection = vec3(topLight + bottomFill + sideCatch) + uColor * rimGlow * 0.6;

    // ── Dual specular highlights (key light + fill light) ──
    vec3 keyDir = normalize(vec3(0.5, 1.0, 0.4));
    float spec1 = pow(max(dot(N, normalize(V + keyDir)), 0.0), 180.0) * 0.9;

    vec3 fillDir = normalize(vec3(-0.4, 0.6, -0.5));
    float spec2 = pow(max(dot(N, normalize(V + fillDir)), 0.0), 80.0) * 0.45;

    vec3 rimDir = normalize(vec3(0.0, -0.3, 1.0));
    float spec3 = pow(max(dot(N, normalize(V + rimDir)), 0.0), 40.0) * 0.25;

    // ── Glass volume (edges = looking through more material) ──
    float thickness = mix(0.05, 1.0, fresnel);
    vec3 volumeTint = mix(vec3(1.0), uColor * 0.25 + vec3(0.75), thickness * 0.35);

    // ── Internal caustic shimmer ──
    float caustic = sin(vWorldPos.x * 18.0 + uTime * 0.6)
                  * sin(vWorldPos.y * 14.0 - uTime * 0.4)
                  * sin(vWorldPos.z * 10.0 + uTime * 0.3) * 0.04;

    // ── Compose final glass ──
    vec3 glass = distortedBg * (1.0 - fresnel * 0.5);
    glass = mix(glass, thinFilm * 0.45 + vec3(0.55), fresnel * 0.45);
    glass += envReflection * fresnel;
    glass += vec3(spec1 + spec2 + spec3);
    glass *= volumeTint;
    glass += uColor * fresnel * 0.2;
    glass += vec3(caustic) * fresnel;

    // ── Alpha (transparent center, opaque edges + highlights) ──
    float alpha = mix(0.12, 0.78, fresnel);
    alpha += (spec1 + spec2) * 0.4;
    alpha = clamp(alpha, 0.0, 0.92);

    gl_FragColor = vec4(glass, alpha);
  }
`,L=({count:r=40})=>{const o=s.useRef(null),{positions:d,sizes:g,speeds:p}=s.useMemo(()=>{const n=new Float32Array(r*3),l=new Float32Array(r),c=new Float32Array(r);for(let e=0;e<r;e++){const x=Math.random()>.5?1:-1;n[e*3]=x*(Math.random()*4+3.5),n[e*3+1]=(Math.random()-.5)*14,n[e*3+2]=(Math.random()-.5)*4,l[e]=Math.random()*3+1,c[e]=Math.random()*.5+.2}return{positions:n,sizes:l,speeds:c}},[r]);return y(n=>{if(!o.current)return;const l=n.clock.elapsedTime,c=o.current.geometry.attributes.position.array;for(let e=0;e<r;e++)c[e*3+1]+=Math.sin(l*p[e]+e)*.002,c[e*3]+=Math.cos(l*p[e]*.7+e)*.001;o.current.geometry.attributes.position.needsUpdate=!0}),t.jsxs("points",{ref:o,children:[t.jsx("bufferGeometry",{children:t.jsx("bufferAttribute",{attach:"attributes-position",count:r,array:d,itemSize:3})}),t.jsx("pointsMaterial",{size:.08,color:"#b0d4e8",transparent:!0,opacity:.35,sizeAttenuation:!0,depthWrite:!1,blending:C})]})},E=({startAnimation:r=!0})=>{const o=s.useRef(null),[d,g]=s.useState(null),p=s.useMemo(()=>Array.from({length:5}).map(()=>s.createRef()),[]),n=s.useMemo(()=>Array.from({length:5}).map(()=>s.createRef()),[]),l=3.6,c=.25,e=["#0ea5e9","#0284c7","#38bdf8","#10b981","#34d399"],x=s.useMemo(()=>e.map(u=>new D({uniforms:{uTime:{value:0},uColor:{value:new R(u)}},vertexShader:I,fragmentShader:B,transparent:!0,depthWrite:!1,side:A})),[]),b=s.useMemo(()=>new k(l,c,32,64),[]),w=s.useMemo(()=>new W(.08,12,12),[]);return s.useEffect(()=>{r&&d===null&&g(Date.now())},[r,d]),y(u=>{const a=u.clock.elapsedTime;x.forEach(i=>{i.uniforms.uTime.value=a});const j=window.scrollY,z=Math.min(j/800,1),v=Math.pow(z,2);for(let i=0;i<5;i++){const m=p[i].current,M=n[i].current;if(m){const h=a*.2,T=i*Math.PI/5,N=Math.PI/2,F=a*.5+i*.2;m.rotation.x=f.lerp(h,N,v),m.rotation.y=f.lerp(T,0,v),m.rotation.z=f.lerp(0,F,v),m.position.x=0,m.position.y=f.lerp(0,(2-i)*1.5,v)}if(M){const h=a*1.5+i*Math.PI/2;M.position.set(Math.cos(h)*l,Math.sin(h)*l,Math.sin(h*12)*(c*.5))}}o.current&&(o.current.rotation.y=a*.1,o.current.position.y=f.lerp(0,.5,v))}),t.jsx(S,{speed:1.5,rotationIntensity:.3,floatIntensity:.8,children:t.jsx("group",{ref:o,children:p.map((u,a)=>t.jsx("mesh",{ref:u,geometry:b,material:x[a],children:t.jsx("mesh",{ref:n[a],geometry:w,children:t.jsx("meshBasicMaterial",{color:e[a],toneMapped:!1})})},a))})})},Y=()=>{const{viewport:r,camera:o}=G();return y(()=>{const g=r.aspect<1?55:35;o.fov=f.lerp(o.fov,g,.1),o.updateProjectionMatrix()}),null},q=({startAnimation:r=!1})=>t.jsx("div",{className:"absolute inset-0 w-full h-full bg-[#fafafa] z-0 pointer-events-none overflow-hidden",children:t.jsxs(P,{onCreated:({gl:o})=>{o.debug.checkShaderErrors=!1},camera:{position:[0,0,12],fov:35},dpr:[1,1.5],gl:{antialias:!0,alpha:!0,powerPreference:"high-performance",preserveDrawingBuffer:!1},children:[t.jsx(V,{pixelated:!0}),t.jsx("ambientLight",{intensity:1.2}),t.jsx("directionalLight",{position:[8,12,5],intensity:2}),t.jsx("directionalLight",{position:[-5,-4,8],intensity:.8,color:"#c0e8ff"}),t.jsx("directionalLight",{position:[0,-8,-3],intensity:.4,color:"#ffe0d0"}),t.jsx(L,{count:35}),t.jsx(E,{startAnimation:r}),t.jsx(Y,{})]})});export{q as FrostedGlassBackground,q as default};
