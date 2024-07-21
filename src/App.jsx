/* eslint-disable react/no-unknown-property */
import { Canvas, extend } from "@react-three/fiber";
import "./App.css";
import { MatrixMaterial } from "./material/MatrixMaterial";
import Scene from "./Scene";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";
import { getProject } from "@theatre/core";
import { SheetProvider } from "@theatre/r3f";
import { Suspense } from "react";
import { Grid, Stats, StatsGl } from "@react-three/drei";
import { useControls } from "leva";

// studio.initialize();
// studio.extend(extension);
extend({ MatrixMaterial });

const demoSheet = getProject("Demo Project 1").sheet("Demo Sheet");

function App() {
  const { gridSize, ...gridConfig } = useControls({
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
    <main>
      {/* <Stats showPanel={0} className="stats" /> */}
      <Suspense fallback={null}>
        <Canvas
          className="canvas"
          gl={{
            shadowMap: {
              enabled: true,
            },
            antialias: true,
          }}
        >
          <StatsGl className="stats" />

          <SheetProvider sheet={demoSheet}>
            <Scene />
          </SheetProvider>
        </Canvas>
        <Canvas style={{ pointerEvents: "none", position: "absolute", top: 0, zIndex: -1 }}>
      <color attach="background" args={["#010327"]} />

          <Grid args={gridSize} position={[0, -1, 0]} {...gridConfig} />
        </Canvas>
      </Suspense>
    </main>
  );
}

export default App;
