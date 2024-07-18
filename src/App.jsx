/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { AsciiRenderer, OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import "./App.css";
import { PointLightHelper, SpotLightHelper } from "three";
import { MatrixMaterial } from "./material/MatrixMaterial";
import * as THREE from "three";
import { FadeShader } from "./material/testShader";
import { Bloom, DepthOfField, EffectComposer, Glitch, Noise, Vignette } from "@react-three/postprocessing";
import { GlitchMode } from "postprocessing";
import { DataStream } from "./material/testShader2";
extend({ MatrixMaterial });
function App() {
  return (
    <main>
      <Canvas className="canvas">
        <Scene />
      </Canvas>
    </main>
  );
}

export default App;

function Torusknot(props) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state, delta) => {
    // ref.current.rotation.x = ref.current.rotation.y += delta / 2;
    // console.log(state);
    ref.current.material.uniforms.u_time.value = state.clock.elapsedTime;
    ref.current.material.uniforms.u_resolution.value = new THREE.Vector2(viewport.width, viewport.height);
  });

  return (
    <mesh scale={Math.min(viewport.width, viewport.height) / 5} {...props} ref={ref}>
      <boxGeometry args={[2, 2, 2, 100, 100, 100]} />
      {/* <planeGeometry args={[2, 2, 100, 100]} /> */}
      <shaderMaterial
        attach="material"
        args={[DataStream]}
        uniforms-u_resolution-value={new THREE.Vector2(viewport.width, viewport.height)}
      />
    </mesh>
  );
}
function PlaneIkea(props) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    // ref.current.rotation.x = ref.current.rotation.y += delta / 2;
    // console.log(ref.current.material.uniforms.time.value);
    ref.current.material.uniforms.u_time.value = state.clock.elapsedTime * 1;
    // ref.current.material.uniforms.u_resolution.value = new THREE.Vector2(viewport.width, viewport.height);
  });

  return (
    <mesh scale={Math.min(viewport.width, viewport.height) / 5} {...props} ref={ref}>
      <planeGeometry args={[2, 2, 100, 100]} />
      <matrixMaterial side={THREE.DoubleSide} />
    </mesh>
  );
}

function Scene() {
  const spotLightRef = useRef();
  const pointLightRef = useRef();
  // useHelper(pointLightRef, PointLightHelper);
  // useHelper(spotLightRef, SpotLightHelper);
  return (
    <>
      <OrbitControls />
      <color attach="background" args={["#000"]} />
      <spotLight position={[2, 3, 5]} angle={0.55} intensity={30} penumbra={1} ref={spotLightRef} />

      {/* <pointLight intensity={12} position={[-5, 5, -5]} ref={pointLightRef} /> */}
      {/* <pointLight intensity={12} position={[10, 10, 10]} /> */}
      {/* <ambientLight intensity={1} /> */}
      <Torusknot />
      {/* <PlaneIkea /> */}

      {/* <AsciiRenderer fgColor="white" bgColor="black" characters=" 01" /> */}

      <EffectComposer>
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
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
      </EffectComposer>
    </>
  );
}
