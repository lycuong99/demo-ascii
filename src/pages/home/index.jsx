import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import { Suspense, useRef } from "react";
import Scene from "./Scene";
import IntroMemo from "./Intro";

const Home = () => {
  const ref = useRef();

  return (
    <main id="main" ref={ref} className="overflow-hidden relative ">
      <Suspense fallback={null}>
        {/* <Stats /> */}
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
            position: "absolute",
            zIndex: -1,
          }}
          // className="fixed"
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
      </Suspense>
      <IntroMemo />
    </main> 
  );
};

export default Home;