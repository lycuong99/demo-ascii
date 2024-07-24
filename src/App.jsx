/* eslint-disable react/no-unknown-property */
import { Canvas, extend } from "@react-three/fiber";
import "./App.css";
import { MatrixMaterial } from "./material/MatrixMaterial";
import Scene from "./Scene";

import { getProject } from "@theatre/core";
import { SheetProvider } from "@theatre/r3f";
import { Suspense } from "react";
import { BackgroundGrid } from "./3d-components/BackgroundGrid";
import MainLayout from "./components/layout/MainLayout";

extend({ MatrixMaterial });

const demoSheet = getProject("Demo Project 1").sheet("Demo Sheet");

function App() {
  return (
    <MainLayout>
      <main>
        <Suspense fallback={null}>
          <Canvas
            id="hgell"
            style={{
              position: "fixed",
            }}
            className="fixed"
            gl={{
              shadowMap: {
                enabled: true,
              },
              antialias: true,
            }}
          >
            <SheetProvider sheet={demoSheet}>
              <Scene />
            </SheetProvider>
          </Canvas>
          <BackgroundGrid />
        </Suspense>
        <div className="container flex flex-col items-start justify-center">
          <h1 className="font-neu font-normal text-[70px] ">
            <span>The Biggest</span> Decentralized Data<span></span> <span>Warehouse.</span>
          </h1>
          <p>Lorem ipsum dolor sit amet consectetur. </p>
        </div>
        <button className="bg-transparent">GET ACCESS</button>
      </main>
    </MainLayout>
  );
}

export default App;
