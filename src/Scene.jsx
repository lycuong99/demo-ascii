/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import "./App.css";
import { EffectComposer } from "@react-three/postprocessing";
import { AsciiEffectCustom } from "./effects/asciiEffect";
import { Environment } from "./Environment";

function Torusknot(props) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    // ref.current.rotation.x = ref.current.rotation.y += delta / 2;
    // console.log(state);
    // ref.current.material.uniforms.u_time.value = state.clock.elapsedTime;
    // ref.current.material.uniforms.u_resolution.value = new THREE.Vector2(viewport.width, viewport.height);
  });

  return (
    <mesh
      position={[0, 0, 0]}
      scale={Math.min(viewport.width, viewport.height) / 5}
      {...props}
      ref={ref}
      receiveShadow
      castShadow
    >
      <boxGeometry args={[10, 10, 10, 1, 1, 1]} />
      {/* <planeGeometry args={[2, 2, 100, 100]} /> */}
      {/* <shaderMaterial
          attach="material"
          args={[DataStream]}
          uniforms-u_resolution-value={new THREE.Vector2(viewport.width, viewport.height)}
        /> */}
      <meshPhongMaterial attach="material" color="#ff1000" flatShading />
    </mesh>
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
    <mesh scale={Math.min(viewport.width, viewport.height) / 5} {...props} ref={ref}>
      <planeGeometry args={[2, 2, 100, 100]} />
      <meshBasicMaterial attach="material" color="#ff0" />
    </mesh>
  );
}

function Scene() {
  // useHelper(pointLightRef, PointLightHelper);
  // useHelper(spotLightRef, SpotLightHelper);
  const composer = useRef();
  return (
    <>
      <Environment />
      <Torusknot />
      {/* <PlaneIkea /> */}

      <EffectComposer ref={composer}>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}
        {/* <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} /> */}
        {/* <Noise opacity={0.01} /> */}
        {/* <Vignette eskil={false} offset={0.1} darkness={1.1} /> */}
        {/* <Glitch
            delay={[1.5, 3.5]} // min and max glitch delay
            duration={[0.6, 1.0]} // min and max glitch duration
            strength={[0.3, 1.0]} // min and max glitch strength
            mode={GlitchMode.SPORADIC} // glitch mode
            active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
            ratio={0.15} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
          /> */}
        {/* <FadeShader  /> */}
        {/* <AsciiEffectCustom /> */}
      </EffectComposer>
    </>
  );
}

export default Scene;
