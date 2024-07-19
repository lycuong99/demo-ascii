/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { OrbitControls, PerspectiveCamera, useHelper } from "@react-three/drei";
import "./App.css";
import { PointLightHelper } from "three";
export function Environment() {
  const spotLightRef = useRef();
  const pointLightRef = useRef();
  const pointLightRef2 = useRef();
  useHelper(pointLightRef, PointLightHelper);
  useHelper(pointLightRef2, PointLightHelper);
  // useHelper(spotLightRef, SpotLightHelper);
  const camera = useRef();
  return (
    <>
      {/* <PerspectiveCamera ref={camera}  /> */}
      <OrbitControls
      //   camera={camera.current}
      />
      <color attach="background" args={["#000"]} />
      {/* <spotLight position={[20, 30, 50]} angle={0.55} intensity={3000} distance={800} penumbra={1} ref={spotLightRef} /> */}

      <pointLight color={"#ffffff"} intensity={1200} position={[40, 40, 40]} distance={800} ref={pointLightRef} />

      <pointLight
        color={"#00ffff"}
        intensity={4002}
        position={[-50, -50, 2]}
        distance={8000}
        decay={1}
        castShadow
        ref={pointLightRef2}
      />
      {/* <ambientLight intensity={2} /> */}
    </>
  );
}
