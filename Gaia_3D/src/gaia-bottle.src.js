
import * as THREE from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import P from './profile.json';
import LABEL from './label.jpg';

export function mount(container, options = {}){
  if(typeof container==='string') container=document.querySelector(container);
  if(!container) throw new Error('GaiaBottle: élément introuvable');
  const opt = Object.assign({mode:'turn', interactive:true, upright:true, spin:true, shadow:true, zoom:1, rest:0, onReady:null}, options);
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(getComputedStyle(container).position==='static') container.style.position='relative';
  if(opt.interactive){ container.style.touchAction='pan-y'; container.style.cursor='grab'; }

  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.toneMapping = THREE.NeutralToneMapping; renderer.toneMappingExposure = 0.92;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText='display:block;position:absolute;pointer-events:none';
  container.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(),0.04).texture; scene.environmentIntensity=0.6;
  const key = new THREE.DirectionalLight(0xfff1e6,1.1); key.position.set(0.4,0.6,0.8); scene.add(key);
  const camera = new THREE.PerspectiveCamera(30,1,0.01,10);

  const H=P.height, glassPts=P.glass;
  function rAt(y){ for(let i=1;i<glassPts.length;i++){ if(glassPts[i][1]>=y){ const [r0,y0]=glassPts[i-1],[r1,y1]=glassPts[i]; return r0+(r1-r0)*(y-y0)/((y1-y0)||1);} } return glassPts.at(-1)[0]; }
  const SEG=128, V=(r,y)=>new THREE.Vector2(Math.max(r,0),y);
  const glassGeo=new THREE.LatheGeometry([V(0,0.0005),V(glassPts[0][0]*0.86,0.0002),...glassPts.map(([r,y])=>V(r,Math.max(y,0.001)))],SEG);
  const BASE=0.0045, WALL=0.0016, TOPY=P.capBottomY;
  const inner=[V(0,BASE)]; for(let i=0;i<=90;i++){ const y=BASE+(TOPY-BASE)*i/90; inner.push(V(rAt(y)-WALL,y)); } inner.push(V(0,TOPY));
  const liquidGeo=new THREE.LatheGeometry(inner,SEG);
  const [LY0,LY1]=P.label, lPts=[]; for(let i=0;i<=24;i++){ const y=LY0+(LY1-LY0)*i/24; lPts.push(V(rAt(y)+0.00045,y)); }
  const labelGeo=new THREE.LatheGeometry(lPts,256,-Math.PI/2,Math.PI*2);
  const capGeo=new THREE.LatheGeometry([V(P.cap[0][0]*0.97,P.cap[0][1]-0.0005),...P.cap.map(([r,y])=>V(r,y)),V(P.cap.at(-1)[0]*0.92,H),V(0,H)],240);
  { const pos=capGeo.attributes.position, y0=P.cap[0][1]; for(let i=0;i<pos.count;i++){ const x=pos.getX(i),y=pos.getY(i),z=pos.getZ(i),t=(y-y0)/(H-y0); if(t>0.42&&t<0.93){ const k=1+0.018*Math.max(0,Math.sin(Math.atan2(x,z)*80)); pos.setX(i,x*k); pos.setZ(i,z*k);} } capGeo.computeVertexNormals(); }

  const glassMat=new THREE.MeshPhysicalMaterial({color:0xdfeee6,roughness:0.05,ior:1.5,clearcoat:1,clearcoatRoughness:0.04,envMapIntensity:2.2,transparent:true,opacity:0.14,depthWrite:false});
  const capMat=new THREE.MeshStandardMaterial({color:0xd9dde2,metalness:1,roughness:0.32});
  const labelMat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:0.48});
  const liquidMat=new THREE.MeshPhysicalMaterial({color:0xf09400,roughness:0.12,clearcoat:0.5,side:THREE.DoubleSide});
  const U={uN:{value:new THREE.Vector3(0,1,0)},uD:{value:0},uAmp:{value:0},uDir:{value:new THREE.Vector3(1,0,0)},uTime:{value:0},uTop:{value:new THREE.Color(0xffb51e)}};
  liquidMat.onBeforeCompile=sh=>{
    Object.assign(sh.uniforms,U);
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;').replace('#include <worldpos_vertex>','#include <worldpos_vertex>\nvWP=(modelMatrix*vec4(transformed,1.0)).xyz;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vWP;uniform vec3 uN;uniform float uD;uniform float uAmp;uniform vec3 uDir;uniform float uTime;uniform vec3 uTop;')
      .replace('void main() {','void main() {\n vec3 d2=normalize(cross(uN,uDir));\n float wave=uAmp*sin(dot(vWP,uDir)*140.0+uTime*9.0)+uAmp*0.45*sin(dot(vWP,d2)*190.0-uTime*7.0);\n if(dot(vWP,uN)>uD+wave) discard;')
      .replace('#include <color_fragment>','#include <color_fragment>\n if(!gl_FrontFacing) diffuseColor.rgb=uTop;')
      .replace('#include <normal_fragment_maps>','#include <normal_fragment_maps>\n if(!gl_FrontFacing) normal=normalize((viewMatrix*vec4(uN,0.0)).xyz);');
  };
  liquidMat.customProgramCacheKey=()=>'gaia-liquid';

  const root=new THREE.Group(), tilt=new THREE.Group(), restPose=new THREE.Group(), spinner=new THREE.Group(), body=new THREE.Group();
  restPose.rotation.z=opt.rest;
  root.add(tilt); tilt.add(restPose); restPose.add(spinner); spinner.add(body); body.position.y=-H*0.5; scene.add(root);
  const liquid=new THREE.Mesh(liquidGeo,liquidMat), glass=new THREE.Mesh(glassGeo,glassMat), label=new THREE.Mesh(labelGeo,labelMat), cap=new THREE.Mesh(capGeo,capMat);
  glass.renderOrder=2; body.add(liquid,label,glass,cap);

  const shc=document.createElement('canvas'); shc.width=shc.height=128; { const g=shc.getContext('2d'), gr=g.createRadialGradient(64,64,0,64,64,64); gr.addColorStop(0,'rgba(60,20,8,.45)'); gr.addColorStop(1,'rgba(60,20,8,0)'); g.fillStyle=gr; g.fillRect(0,0,128,128); }
  const shadow=new THREE.Mesh(new THREE.PlaneGeometry(0.16,0.16),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(shc),transparent:true,depthWrite:false}));
  shadow.rotation.x=-Math.PI/2; shadow.position.y=-0.0005; shadow.visible=opt.shadow; scene.add(shadow);

  let ready=false;
  new THREE.TextureLoader().load(LABEL,t=>{ t.colorSpace=THREE.SRGBColorSpace; t.anisotropy=renderer.capabilities.getMaxAnisotropy(); labelMat.map=t; labelMat.needsUpdate=true; ready=true; opt.onReady&&opt.onReady(); });

  const NS=2400, samples=new Float32Array(NS*3), proj=new Float32Array(NS), tmp=new THREE.Vector3();
  { let n=0; const rMax=Math.max(...glassPts.map(p=>p[0])); while(n<NS){ const y=BASE+Math.random()*(TOPY-BASE), ri=rAt(y)-WALL, x=(Math.random()*2-1)*rMax, z=(Math.random()*2-1)*rMax; if(x*x+z*z<ri*ri){ samples.set([x,y,z],n*3); n++; } } }

  let mode=opt.mode, dragging=false, last=null, uprightOn=opt.upright, spinOn=opt.spin&&!reduceMotion, shakeT=-1, turnVel=0, swing=0;
  const omega=new THREE.Vector3(), pos=new THREE.Vector3(0,H*0.5,0), vel=new THREE.Vector3(), target=new THREE.Vector3(0,H*0.5,0), grab=new THREE.Vector3();
  const ray=new THREE.Raycaster(), plane=new THREE.Plane(new THREE.Vector3(0,0,1),0), ndc=new THREE.Vector2();
  function pointerWorld(e){ const r=renderer.domElement.getBoundingClientRect(); ndc.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1); ray.setFromCamera(ndc,camera); const p=new THREE.Vector3(); ray.ray.intersectPlane(plane,p); return p; }
  const onDown=e=>{ dragging=true; container.style.cursor='grabbing'; container.setPointerCapture(e.pointerId); last={x:e.clientX,y:e.clientY,t:performance.now()}; if(mode==='move') grab.copy(pos).sub(pointerWorld(e)); };
  const onMove=e=>{ if(!dragging) return; const now=performance.now(), dt=Math.max((now-last.t)/1000,1/240), dx=e.clientX-last.x, dy=e.clientY-last.y;
    // Glissement horizontal : la bouteille tourne sur elle-même, un demi-tour pour 60 % de la largeur de la zone
    if(mode==='turn'){ const k=Math.PI/THREE.MathUtils.clamp(container.clientWidth*0.6,140,260); spinner.rotation.y+=dx*k; turnVel=dx*k/dt*0.6; }
    else if(mode==='tilt'){ const k=Math.PI/THREE.MathUtils.clamp(container.clientWidth*0.6,140,260); tilt.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),-dx*k)); omega.set(0,0,-dx*k/dt).multiplyScalar(0.6); }
    else { const p=pointerWorld(e).add(grab); target.set(THREE.MathUtils.clamp(p.x,-0.09,0.09),THREE.MathUtils.clamp(p.y,H*0.5,H*0.5+0.07),0); }
    last={x:e.clientX,y:e.clientY,t:now}; };
  const onUp=()=>{ dragging=false; container.style.cursor='grab'; target.set(0,H*0.5,0); };
  if(opt.interactive){ container.addEventListener('pointerdown',onDown); container.addEventListener('pointermove',onMove);
    container.addEventListener('pointerup',onUp); container.addEventListener('pointercancel',onUp); }

  const n=new THREE.Vector3(0,1,0), nVel=new THREE.Vector3(), aS=new THREE.Vector3(), cLocal=new THREE.Vector3(0,(BASE+P.liquidY)*0.5,0), cPrev=new THREE.Vector3(), vPrev=new THREE.Vector3(), qPrev=new THREE.Quaternion(), G=new THREE.Vector3(0,9.81,0);
  let first=true;
  // Le canvas déborde de la zone pour que la bouteille penchée ne soit jamais coupée ;
  // setViewOffset garde la bouteille à la taille et à la place prévues par la zone.
  function resize(){ const r=container.getBoundingClientRect(); if(!r.width||!r.height) return; camera.aspect=r.width/r.height;
    const fit=(r.width/r.height<0.8?0.46*(0.8/(r.width/r.height)):0.46)/opt.zoom;
    const length=H/(2*fit*Math.tan(THREE.MathUtils.degToRad(camera.fov/2)))*r.height*1.35;
    const w=Math.ceil(Math.max(r.width,length)), h=Math.ceil(Math.max(r.height,length));
    renderer.setSize(w,h,false); Object.assign(renderer.domElement.style,{width:w+'px',height:h+'px',left:(r.width-w)/2+'px',top:(r.height-h)/2+'px'});
    camera.position.set(0,H*0.62,fit); camera.lookAt(0,H*0.5,0); camera.setViewOffset(r.width,r.height,(r.width-w)/2,(r.height-h)/2,w,h); camera.updateProjectionMatrix(); }
  const ro=new ResizeObserver(resize); ro.observe(container); resize();

  let raf=0, tPrev=performance.now(), paused=false;
  function frame(now){
    const dt=Math.max(Math.min((now-tPrev)/1000,1/30),1/240); tPrev=now; U.uTime.value=now/1000;
    if(!dragging){
      if(omega.lengthSq()>1e-10) tilt.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(omega.clone().normalize(),omega.length()*dt)).normalize();
      omega.multiplyScalar(Math.exp(-5*dt));
      if(uprightOn){ const inv=tilt.quaternion.clone().invert(), ax=new THREE.Vector3(inv.x,inv.y,inv.z).multiplyScalar(2*(Math.sign(inv.w)||1)); omega.addScaledVector(ax,28*dt).multiplyScalar(Math.exp(-3.2*dt)); }
    }
    let sx=0, sz=0;
    if(shakeT>=0){ shakeT+=dt; const env=Math.sin(Math.min(shakeT/1.3,1)*Math.PI); sx=0.028*env*Math.sin(shakeT*2*Math.PI*4.2); sz=0.25*env*Math.sin(shakeT*2*Math.PI*4.2+0.6); if(shakeT>1.3) shakeT=-1; }
    const mv=dragging&&mode==='move', kP=mv?260:90, cP=mv?26:11;
    vel.addScaledVector(target.clone().sub(pos),kP*dt).multiplyScalar(Math.exp(-cP*dt)); pos.addScaledVector(vel,dt);
    root.position.set(pos.x+sx,pos.y,pos.z);
    // La rotation à la main balance légèrement la bouteille pour faire bouger le jus (jamais plus de 15°)
    swing+=(THREE.MathUtils.clamp(-turnVel*0.05,-0.26,0.26)-swing)*Math.min(1,dt*10);
    root.quaternion.setFromAxisAngle(new THREE.Vector3(0,0,1),THREE.MathUtils.clamp(-vel.x*2.2,-0.6,0.6)+sz+swing);
    if(spinOn&&!dragging) spinner.rotation.y+=dt*0.45;
    if(!dragging) spinner.rotation.y+=turnVel*dt;
    turnVel*=Math.exp((dragging?-10:-3)*dt);
    root.updateMatrixWorld(true);
    const c=liquid.localToWorld(cLocal.clone()), qNow=liquid.getWorldQuaternion(new THREE.Quaternion());
    if(first){ cPrev.copy(c); qPrev.copy(qNow); first=false; }
    const v=c.clone().sub(cPrev).divideScalar(dt), a=v.clone().sub(vPrev).divideScalar(dt); cPrev.copy(c); vPrev.copy(v);
    a.clampLength(0,45); aS.lerp(a,1-Math.exp(-dt*25));
    const dq=qNow.clone().multiply(qPrev.clone().invert()); qPrev.copy(qNow); if(dq.w<0){dq.x*=-1;dq.y*=-1;dq.z*=-1;}
    const w=new THREE.Vector3(dq.x,0,dq.z).multiplyScalar(2/dt), tgt=G.clone().add(aS).normalize();
    n.addScaledVector(new THREE.Vector3().crossVectors(w,n),dt*0.4);
    nVel.addScaledVector(tgt.clone().sub(n),140*dt).multiplyScalar(Math.exp(-2.6*dt));
    n.addScaledVector(nVel,dt).normalize(); nVel.addScaledVector(n,-nVel.dot(n));
    const ang=n.angleTo(tgt); if(ang>0.65) n.lerp(tgt,(ang-0.65)/ang).normalize();
    const m=liquid.matrixWorld; for(let i=0;i<NS;i++){ tmp.fromArray(samples,i*3).applyMatrix4(m); proj[i]=tmp.dot(n); }
    proj.sort(); U.uD.value=proj[Math.floor(P.fill*NS)]; U.uN.value.copy(n);
    const amp=Math.min(nVel.length()*0.0016+aS.length()*0.00003,0.0022); U.uAmp.value+=(amp-U.uAmp.value)*Math.min(1,dt*6);
    const hd=new THREE.Vector3(nVel.x,0,nVel.z); if(hd.lengthSq()>1e-6) U.uDir.value.lerp(hd.normalize(),0.1).normalize();
    shadow.position.x=root.position.x; const lift=pos.y-H*0.5; shadow.material.opacity=Math.max(0.15,1-lift*9); shadow.scale.setScalar(1+lift*4);
    if(ready) renderer.render(scene,camera);
    if(!paused) raf=requestAnimationFrame(frame);
  }
  raf=requestAnimationFrame(frame);

  return {
    pause(){ paused=true; cancelAnimationFrame(raf); },
    resume(){ if(paused){ paused=false; tPrev=performance.now(); raf=requestAnimationFrame(frame); } },
    shake(){ shakeT=0; },
    reset(){ tilt.quaternion.identity(); omega.set(0,0,0); },
    setMode(m){ if(m==='turn'||m==='tilt'||m==='move') mode=m; },
    setUpright(b){ uprightOn=!!b; },
    setSpin(b){ spinOn=!!b; },
    tilt(dx,dy){ tilt.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0,0,1),-dx)).premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1,0,0),dy)); },
    destroy(){ cancelAnimationFrame(raf); ro.disconnect();
      container.removeEventListener('pointerdown',onDown); container.removeEventListener('pointermove',onMove); container.removeEventListener('pointerup',onUp); container.removeEventListener('pointercancel',onUp);
      scene.traverse(o=>{ o.geometry&&o.geometry.dispose(); if(o.material){ o.material.map&&o.material.map.dispose(); o.material.dispose(); } });
      pmrem.dispose(); renderer.dispose(); renderer.domElement.remove(); }
  };
}
