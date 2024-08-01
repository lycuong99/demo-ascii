import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const FirstLoader = ({ setReady }) => {
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
      duration: 1,
      onComplete: () => {
        document.querySelector(".loading-text").textContent = "INITIALIZING ROADMAP...";
        gsap.to(".loader-wrapper", {
          opacity: 0,
          duration: 1,
          delay: 0.3,
          ease: "power1.inOut",
          onComplete: () => {
            gsap.set(".loader-wrapper", { display: "none", ease: "power1.inOut" });
            setReady(true);
          },
        });
      },
    });
    tlh.play();
  });
  return (
    <>
      {/* <Canvas style={{ width: "100vw", height: "100vh" }}>

        </Canvas> */}
      <div className="fixed top-0  bg-[#010327] h-screen w-screen z-[100] loader-wrapper" style={{}}>
        {/* <Loader /> */}
        <div
          className="h-full w-full flex justify-center items-center "
          style={{ background: "linear-gradient(90deg, #040513, #010326 )" }}
        >
          <div className="font-neu text-center uppercase">
            <p className="mb-4 processing">50%</p>
            <p className="tracking-[0.86ch] text-[14px] loading-text">on our road...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default FirstLoader;
