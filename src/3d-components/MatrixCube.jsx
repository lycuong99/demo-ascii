import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { DataStream } from "../material/testShader2";

function MatrixCube(props) {
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
export default MatrixCube;
