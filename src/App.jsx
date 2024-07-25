/* eslint-disable react/no-unknown-property */
import { Canvas, extend } from "@react-three/fiber";
import "./App.css";
import { MatrixMaterial } from "./material/MatrixMaterial";
import Scene from "./Scene";

import { Suspense, useRef } from "react";
import { BackgroundGrid } from "./3d-components/BackgroundGrid";
import MainLayout from "./components/layout/MainLayout";
import "splitting/dist/splitting.css";
import "splitting/dist/splitting-cells.css";
import Intro from "./Intro";
import { Stats } from "@react-three/drei";
import { Leva } from "leva";

extend({ MatrixMaterial });

function App() {
  const ref = useRef();
  return (
    <MainLayout>
      <main ref={ref} className="overflow-hidden">
        <Suspense fallback={null}>
          <Stats />
          <Leva
            hidden // default = false, when true the GUI is hidden
          />
          <Canvas
            onCreated={(state) => {
              // fix curson not work when canvas is overlaied
              state.events.connect(ref.current);
            }}
            id="hgell"
            style={{
              position: "fixed",
              zIndex: -1,
            }}
            className="fixed"
            gl={
              {
                // shadowMap: {
                //   enabled: true,
                // },
                // antialias: true,
              }
            }
          >
            <Scene />
          </Canvas>
          <BackgroundGrid />
        </Suspense>
        <Intro />
      </main>
    </MainLayout>
  );
}

export default App;
