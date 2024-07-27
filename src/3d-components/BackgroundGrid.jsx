import { Grid } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useControls } from "leva";

export const BackgroundGrid = () => {
  const { gridSize, ...gridConfig } = useControls("Grid", {
    gridSize: [200.5, 200.5],
    cellSize: { value: 1, min: 0, max: 10, step: 0.1 },
    cellThickness: { value: 0.6, min: 0, max: 5, step: 0.1 },
    cellColor: "#626262",
    sectionSize: { value: 3.3, min: 0, max: 10, step: 0.1 },
    sectionThickness: { value: 0, min: 0, max: 5, step: 0.1 },
    sectionColor: "#626262",
    fadeDistance: { value: 55, min: 0, max: 100, step: 1 },
    fadeStrength: { value: 1, min: 0, max: 1, step: 0.1 },
    followCamera: false,
    infiniteGrid: true,
  });
  return (
    <>
      <Canvas style={{ pointerEvents: "none", position: "fixed", top: 0, zIndex: -2 }} className="h-screen w-screen">
        <color attach="background" args={["#010327"]} />

        <Grid args={gridSize} position={[0, -1, 0]} {...gridConfig} />
      </Canvas>
    </>
  );
};
