/* eslint-disable react/no-unknown-property */
import { forwardRef, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { AsciiEffectCustom } from "./effects/asciiEffect";
import { Environment } from "./Environment";
import { Gltf, Grid, Merged, useGLTF, useHelper, useTexture, Environment as EnvironmentR3f } from "@react-three/drei";
// import { editable as e } from "@theatre/r3f";
import * as THREE from "three";
import { easeOutQuad } from "./utils";
import { firstStateDur, secondStateDur } from "./constants";
import { useControls } from "leva";

const SPRITE_SCALE = 10;
function Cube(props) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    ref.current.rotation.x = ref.current.rotation.y += delta / 2;
    // console.log(state);
    // ref.current.material.uniforms.u_time.value = state.clock.elapsedTime;
    // ref.current.material.uniforms.u_resolution.value = new THREE.Vector2(viewport.width, viewport.height);
  });

  return (
    <e.mesh
      theatreKey="cube"
      position={[0, 0, 0]}
      // scale={5}
      {...props}
      ref={ref}
      receiveShadow
      castShadow
    >
      <boxGeometry args={[100, 100, 100, 1, 1, 1]} />
      {/* <shaderMaterial
          attach="material"
          args={[DataStream]}
          uniforms-u_resolution-value={new THREE.Vector2(viewport.width, viewport.height)}
        /> */}
      <meshPhongMaterial attach="material" color="#fff" flatShading />
    </e.mesh>
  );
}
function PlaneIkea(props) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    // ref.current.rotation.x = ref.current.rotation.y += delta / 2;
    // console.log(ref.current.material.uniforms.time.value);
    // ref.current.material.uniforms.u_time.value = state.clock.elapsedTime * 1;
    // ref.current.material.uniforms.u_resolution.value = new THREE.Vector2(viewport.width, viewport.height);
  });

  return (
    <mesh {...props} ref={ref}>
      <planeGeometry args={[2, 2, 100, 100]} />
      <meshBasicMaterial attach="material" color="#ff0" />
    </mesh>
  );
}

const FadeSprite = forwardRef(function FadeSprite(props, ref) {
  const texture = useTexture("fadeSpriteLess.png");

  // const ref = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    // ref.current.rotation.x = ref.current.rotation.y += delta / 2;
    // console.log(ref.current.material.uniforms.time.value);
    // ref.current.material.uniforms.u_time.value = state.clock.elapsedTime * 1;
    // ref.current.material.uniforms.u_resolution.value = new THREE.Vector2(viewport.width, viewport.height);
  });
  return (
    <sprite
      sca
      theatreKey="sprite"
      ref={ref}
      position={[9999, 9999, 35]}
      scale={[SPRITE_SCALE, SPRITE_SCALE, SPRITE_SCALE]}
    >
      <spriteMaterial attach="material" map={texture} depthTest={false} premultipliedAlpha={false} opacity={0.6} />
    </sprite>
  );
});

function Scene() {
  const composer = useRef();
  const spriteRef = useRef();
  const pointLightRef2 = useRef();
  const colorVar = useRef(0);
  const modelRef = useRef();

  // useHelper(pointLightRef2, THREE.PointLightHelper);


  useFrame((state, delta) => {
    let rotateVal =  (delta * (Math.PI * 0.5)) / 5;
   modelRef.current.rotation.y += rotateVal;
   modelRef.current.rotation.z +=  rotateVal * 2;

    const timer = state.clock.getElapsedTime() * 1000;
    const progressFade = easeOutQuad(Math.min(firstStateDur, timer) / firstStateDur);
    const progressSpin = easeOutQuad(Math.min(secondStateDur, timer) / secondStateDur);

    if (progressFade <= 1.0) {
      modelRef.current.position.z = (1 - progressFade) * -800 + 10;

      let rotVal = -(Math.PI * 0.5) * (1 - progressSpin);
      // modelRef.current.rotation.x = rotVal - 0.4;
    }

    if (spriteRef.current) {
      var spriteScale = SPRITE_SCALE + Math.sin(timer * 0.001) * SPRITE_SCALE * 0.25;
      spriteRef.current.scale.set(spriteScale, spriteScale, spriteScale);
    }

    // colorVar.current += 0.000001;
    // pointLightRef2.current.color = pointLightRef2.current.color.offsetHSL(Math.sin(colorVar.current), 1.0, 0.0);
  });

  const handlePointerMove = (e) => {
    if (!spriteRef.current) return;
    // console.log(e.intersections);
    const intersects = e.intersections;
    let point = intersects[0].point;
    spriteRef.current.position.set(point.x, point.y, 20);
    pointLightRef2.current.position.set(point.x, point.y, pointLightRef2.current.position.z);

    // console.log(pointLightRef2.current.position);

    // colorVar.current += 0.000001;
    // pointLightRef2.current.color = pointLightRef2.current.color.offsetHSL(Math.sin(colorVar.current), 1.0, 0.0);
  };

  const { nodes } = useGLTF("logo.glb");
  console.log(nodes);
  useEffect(() => {
    const mousemove = (e) => {
      colorVar.current += 0.000001;
      pointLightRef2.current.color = pointLightRef2.current.color.offsetHSL(Math.sin(colorVar.current), 1.0, 0.0);
    };
    window.addEventListener("mousemove", mousemove);  
    return () => {
      window.removeEventListener("mousemove", mousemove);
    };
  }, []);

 
  return (
    <>
    {/* <EnvironmentR3f preset="night" /> */}
   
      <mesh onPointerMove={handlePointerMove}>
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial color={"#ffff00"} visible={false} />
      </mesh>
      {/* <axesHelper scale={100} /> */}
      <mesh
        scale={2}
        geometry={nodes.logo.geometry}
        position={[0, 0, 0]}
        ref={modelRef}
        castShadow
      >
        <meshPhongMaterial  flatShading />
      </mesh>
      <FadeSprite ref={spriteRef} />

      <pointLight
        // theatreKey="pointLight2"
        color={"#00ffff"}
        intensity={3000}
        position={[-500, -500, 80]}
        distance={800}
        decay={1.8}
        castShadow
        ref={pointLightRef2}
      />
      <directionalLight position={[300, 200, 100]} intensity={2.}/>
      <pointLight position={[-80, 40, 100]} intensity={1002} distance={8100}/>
      <Environment />
      {/* <Cube onPointerMove={handlePointerMove} /> */}
      {/* <PlaneIkea /> */}
      
      <EffectComposer ref={composer}>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <FadeShader  /> */}
        <AsciiEffectCustom />
        {/* <Noise opacity={0.1} /> */}
      </EffectComposer>

      
    </>
  );
}

export default Scene;
