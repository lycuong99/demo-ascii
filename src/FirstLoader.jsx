import { Canvas } from "@react-three/fiber";
import { Loader } from "./load1";

const FirstLoader = () => {
  return (
    <>
      {/* <Canvas style={{ width: "100vw", height: "100vh" }}>

        </Canvas> */}
      <div className="fix top-0 bg-[#0103271C] h-screen w-screen">
        <Loader />
      </div>
    </>
  );
};

export default FirstLoader;
