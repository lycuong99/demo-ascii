import { Canvas } from "@react-three/fiber";
import { Loader } from "./load1";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FirstLoader = () => {
  useGSAP(() => {
    function changeIt() {
      let newPercent = (this.progress() * 100).toFixed();
      document.querySelector(".processing").textContent = newPercent + "%";
    }
    const tlh = gsap.timeline({
      yoyo: false,
      //   repeat: -1,
      repeatDelay: 0.8,
      onUpdate: changeIt,
    });
    tlh.to(".processing", {
      duration: 2,
      onComplete: () => {
        gsap.to(".loader-wrapper", { opacity: 0, duration: 1, ease: "power1.inOut" });
      },
    });
    tlh.play();

    // gsap code here...
  });
  return (
    <>
      {/* <Canvas style={{ width: "100vw", height: "100vh" }}>

        </Canvas> */}
      <div className="fixed top-0  bg-[#010327] h-screen w-screen z-[100] loader-wrapper" style={{}}>
        {/* <Loader /> */}
        <div
          className="h-full w-full flex justify-center items-center bg-[#0103271C]"
          style={{ background: "linear-gradient(90deg, #15151D 25.85%, rgba(110, 110, 110, 0) 101.54%)" }}
        >
          <div className="font-neu text-center uppercase">
            <p className="mb-4 processing">50%</p>
            <p className="tracking-[0.86ch]">on our road...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstLoader;
