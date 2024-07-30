/* eslint-disable react/no-unknown-property */
import { forwardRef, useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import { AsciiEffectCustom } from "../../effects/asciiEffect";
import { Environment } from "../../Environment";
import { useGLTF, useTexture, PresentationControls } from "@react-three/drei";
import { easeOutQuad } from "../../utils";
import { firstStateDur, secondStateDur } from "../../constants";
import { useControls } from "leva";

const SPRITE_SCALE = 20;
const isMobile = window.innerWidth <= 1000;

// function Cube(props) {
//   const ref = useRef();
//   const viewport = useThree((state) => state.viewport);
//   useFrame((state, delta) => {
//     ref.current.rotation.x = ref.current.rotation.y += delta / 2;
//     // console.log(state);
//     // ref.current.material.uniforms.u_time.value = state.clock.elapsedTime;
//     // ref.current.material.uniforms.u_resolution.value = new THREE.Vector2(viewport.width, viewport.height);
//   });

//   return (
//     <mesh
//       theatreKey="cube"
//       position={[0, 0, 0]}
//       // scale={5}
//       {...props}
//       ref={ref}
//       receiveShadow
//       castShadow
//     >
//       <boxGeometry args={[100, 100, 100, 1, 1, 1]} />
//       {/* <shaderMaterial
//           attach="material"
//           args={[DataStream]}
//           uniforms-u_resolution-value={new THREE.Vector2(viewport.width, viewport.height)}
//         /> */}
//       <meshPhongMaterial attach="material" color="#fff" flatShading />
//     </mesh>
//   );
// }
// function PlaneIkea(props) {
//   const ref = useRef();
//   const viewport = useThree((state) => state.viewport);

//   useFrame((state, delta) => {
//     // ref.current.rotation.x = ref.current.rotation.y += delta / 2;
//     // console.log(ref.current.material.uniforms.time.value);
//     // ref.current.material.uniforms.u_time.value = state.clock.elapsedTime * 1;
//     // ref.current.material.uniforms.u_resolution.value = new THREE.Vector2(viewport.width, viewport.height);
//   });

//   return (
//     <mesh {...props} ref={ref}>
//       <planeGeometry args={[2, 2, 100, 100]} />
//       <meshBasicMaterial attach="material" color="#ff0" />
//     </mesh>
//   );
// }

const FadeSprite = forwardRef(function FadeSprite(props, ref) {
  const texture = useTexture("fadeSpriteLess.png");

  // const ref = useRef();

  return (
    <sprite
      theatreKey="sprite"
      ref={ref}
      position={[9999, 9999, 35]}
      // scale={[SPRITE_SCALE, SPRITE_SCALE, SPRITE_SCALE]}
    >
      <spriteMaterial attach="material" map={texture} depthTest={false} premultipliedAlpha={false} opacity={1} />
    </sprite>
  );
});

function Scene() {
  const composer = useRef();
  const spriteRef = useRef();
  const pointLightRef2 = useRef();
  const colorVar = useRef(0);
  const modelRef = useRef();
  const prevPointer = useRef({ x: 0, y: 0 });
  const isMousePressRef = useRef(false);

  // useHelper(pointLightRef2, THREE.PointLightHelper);

  const { rotateZ, ascii, charsize, brightness, rotate, rotateSpeed, charsizeRatio } = useControls("Scene", {
    rotateZ: { value: 0.25, min: 0.1, max: 0.7, step: 0.0001 },
    ascii: {
      value: true,
    },
    rotate: {
      value: true,
    },
    rotateSpeed: {
      value: 5,
      min: 0,
      max: 10,
      step: 0.01,
    },
    charsize: {
      value: 4,
      min: 1,
      max: 10,
      step: 1,
    },
    charsizeRatio: {
      value: 2.9,
      min: 1,
      max: 5,
      step: 0.1,
    },
    brightness: {
      value: 0.3,
      min: 0.1,
      max: 4,
      step: 0.01,
    },
  });

  const { pointer } = useThree();

  useFrame((state, delta) => {
    //  console.log(pointer.x)
    let rotateVal = (delta * (Math.PI * 0.5)) / 5;
    const model = modelRef.current;
    // modelRef.current.rotation.y += rotateVal;
    // modelRef.current.rotation.z += rotateVal * 2;

    const timer = state.clock.getElapsedTime() * 1000;
    const progressFade = easeOutQuad(Math.min(firstStateDur, timer) / firstStateDur);
    const progressSpin = easeOutQuad(Math.min(secondStateDur, timer) / secondStateDur);

    if (progressFade < 1.0) {
      modelRef.current.position.z = (1 - progressFade) * -1000 + 10;

      let rotVal = -(Math.PI * 0.5) * (1 - progressSpin);

      // model.rotation.x = Math.PI * 0.5 * progressFade;
    } else if (rotate) {
      // model.rotateX(-Math.PI * 0.5);
      model.rotateZ(rotateZ);

      let rotateSpeedA = Math.PI * 0.001;
      if (!isMobile) {
        rotateSpeedA += 0.005 * rotateSpeed * pointer.x * delta * 190;
      }
      if (isMousePressRef.current) {
        rotateSpeedA *= 0.2;
      }

      model.rotateY(rotateSpeedA);
      // model.rotateX(Math.PI * 0.003 * -pointer.y);
      model.rotateZ(-rotateZ);
      // model.rotateX(Math.PI * 0.5);F
    }

    if (spriteRef.current) {
      var spriteScale = SPRITE_SCALE + Math.sin(timer * 0.001) * SPRITE_SCALE * 0.25;
      spriteRef.current.scale.set(spriteScale, spriteScale, spriteScale);
    }

    prevPointer.current = pointer;
  });

  const handlePointerMove = (e) => {
    if (!spriteRef.current) return;
    // console.log(e.intersections);
    const intersects = e.intersections;
    let point = intersects[0].point;
    //  console.log(e);

    const wrongNumber = 0;
    spriteRef.current.position.set(point.x + wrongNumber, point.y, 35);
    pointLightRef2.current.position.set(point.x, point.y, pointLightRef2.current.position.z);
  };

  const { nodes } = useGLTF("logo.glb");
  // console.log(nodes);

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

      <mesh
        onPointerMove={handlePointerMove}
        onPointerDown={() => {
          // isMousePressRef.current = true;
          console.log("TRUE");
        }}
        onPointerUp={() => {
          // isMousePressRef.current = false;
          console.log("FALSE");
        }}
      >
        <planeGeometry args={[1000, 1000]} />
        <meshBasicMaterial color={"#ffff00"} visible={false} />
      </mesh>
      <PresentationControls
        snap
        // global
        zoom={0.8}
        rotation={[0, 0, 0]}
        polar={[0, Math.PI / 4]}
        azimuth={[-Math.PI / 4, Math.PI / 4]}
      >
        <group dispose={null}>
          <mesh scale={2} geometry={nodes.logo.geometry} position={[0, 20, 0]} ref={modelRef} castShadow>
            <meshPhongMaterial flatShading />
          </mesh>
        </group>
      </PresentationControls>

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
      <directionalLight position={[300, 200, 100]} intensity={2} />
      {/* <pointLight position={[-80, 40, 100]} intensity={1002} distance={8100} /> */}
      <Environment />
      {/* <Cube onPointerMove={handlePointerMove} /> */}
      {/* <PlaneIkea /> */}

      <EffectComposer ref={composer}>
        {/* <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} /> */}

        {/* <FadeShader  /> */}
        {/* <Bloom /> */}
        {ascii && <AsciiEffectCustom charsize={charsize} brightness={brightness} charsizeRatio={charsizeRatio} />}
        {/* <Noise opacity={0.1} /> */}
      </EffectComposer>
    </>
  );
}
useTexture.preload("fadeSpriteLess.png")
export default Scene;
