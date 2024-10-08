/* eslint-disable react/no-unknown-property */
import { useRef } from "react";
import { PerspectiveCamera } from "@react-three/drei";


export function Environment() {
  const pointLightRef = useRef();
  // useHelper(pointLightRef, PointLightHelper);
  // useHelper(pointLightRef2, PointLightHelper);
  // useHelper(spotLightRef, SpotLightHelper);
  const camera = useRef();

  // useFrame((state, delta) => {

  //   // pointLightRef.current.intensity = progressFade * progressFade * 2000;
  //   // console.log(progressFade * progressFade);
  //   // state.events.update();
  //   // easing.damp3(state.camera.position, [-state.pointer.x * 100, state.pointer.y + 200.5, 500], 0.3, delta) // Move camera
  //   // state.camera.lookAt(0, 0, 0) // Look at center
  // });
  const isMobile = window.innerWidth < 1000;
  const zCamera = isMobile ? 700 : 500;

  return (
    <>
      <PerspectiveCamera
        theatreKey="camera"
        ref={camera}
        fov={22}
        near={1}
        far={1000}
        makeDefault
        position={[0, 0, zCamera]}
        // lookAt={[0, 0, 0]}
        // zoom={3}
      />
      {/* <OrbitControls camera={camera.current} makeDefault /> */}
      {/* <color attach="background" args={["#010327"]} /> */}
      {/* <axesHelper scale={100} /> */}
      <pointLight
        // theatreKey="pointLight1"
        color={"#fff"}
        intensity={2000}
        position={[400, 400, 400]}
        distance={8000}
        ref={pointLightRef}
        // castShadow
      />

      {/* <e.pointLight
        theatreKey="pointLight2"
        color={"#00ffff"}
        intensity={8002}
        position={[-500, -500, 20]}
        distance={800}
        decay={1.9}
        castShadow
        ref={pointLightRef2}
      /> */}

      <ambientLight intensity={0.5} />
    </>
  );
}
