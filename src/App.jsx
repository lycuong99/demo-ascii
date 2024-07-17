/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { AsciiRenderer, OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import "./App.css";
import { PointLightHelper, SpotLightHelper } from "three";
import { MatrixMaterial } from "./material/MatrixMaterial";
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
    ref.current.rotation.x = ref.current.rotation.y += delta / 2;
    console.log(state);
    ref.current.material.uniforms.time.value = state.clock.elapsedTime;
  });

  return (
    <mesh scale={Math.min(viewport.width, viewport.height) / 5} {...props} ref={ref}>
      <boxGeometry args={[2, 2, 2, 100, 100, 100]} />
      <matrixMaterial color="#ffff12" flatShading />
    </mesh>
  );
}
function PlaneIkea(props) {
  const ref = useRef();
  const viewport = useThree((state) => state.viewport);

  useFrame((state, delta) => {
    ref.current.rotation.x = ref.current.rotation.y += delta / 2;
    // console.log(ref.current.material.uniforms.time.value);
    ref.current.material.uniforms.time.value = state.clock.elapsedTime * 1;
  });

  return (
    <mesh scale={Math.min(viewport.width, viewport.height) / 5} {...props} ref={ref}>
      <planeGeometry args={[2, 2, 100, 100]} />
      <matrixMaterial />
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
      <ambientLight intensity={1} />
      {/* <Torusknot /> */}
      <PlaneIkea />

      {/* <AsciiRenderer fgColor="black" bgColor="transparent" characters=".:+=#%@" /> */}
    </>
  );
}
