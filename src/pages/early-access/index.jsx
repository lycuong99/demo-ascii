import { createTextAnimation } from "@/animation";
import { ArrowLeftIcon } from "@/components/icon";
import SimpleStar from "@/components/SimpleStar";
import { H1 } from "@/components/typography";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { forwardRef, useLayoutEffect, useRef } from "react";

const EarlyAccess = () => {
  const introRef = useRef(null);
  const h1Ref = useRef(null);
  const starRef = useRef(null);
  const emailRef = useRef(null);

  useGSAP(() => {
    // gsap code here...

    gsap.from(emailRef.current, {
      opacity: 0,
        scale: 0.7,
      perspective: 1000,
      duration: 0.6,
      z: 1000,
      //   y: 100,
      ease: "power1.inOut",
    });
  });

  useLayoutEffect(() => {
    const intro = introRef.current;
    const h1 = h1Ref.current;
    // intro.classList.add("opacity-0");

    const { animate, clear, reset } = createTextAnimation(intro, {
      interation: 40,
      // lineGapTime: 200
    });
    const { animate: animate1, reset: reset1 } = createTextAnimation(h1);

    let timeout = setTimeout(() => {
      animate();
    }, 500);
    let timeout1 = setTimeout(() => {
      animate1();
    }, 300);

    gsap.fromTo(
      starRef.current,
      {
        scale: 0,
        opacity: 0,
        duration: 1,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
      }
    );
    gsap.to(starRef.current, {
      duration: 2,
      y: -10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout1);
      // intro.classList.add("opacity-0");
      reset();
      reset1();
    };
  }, []);
  return (
    <main>
      <div className="container h-full flex flex-col items-center justify-evenly">
        <div className="flex flex-col justify-center items-center">
          <div ref={starRef}>
            <SimpleStar />
          </div>
          <H1 ref={h1Ref} className="mt-8 mb-6">
            <pre> WE’RE Lauching soon </pre>
          </H1>
          <pre ref={introRef} className="anim text-[20px] text-[#B1B1B1] uppercase  text-center">
            <div>Get the Early Access Pass to be the first to try Beta.</div>
            <div> We'll notify you when we launch!</div>
          </pre>
        </div>
        <EmailSection ref={emailRef} />
      </div>
    </main>
  );
};

const EmailSection = forwardRef(({}, ref) => {
  return (
    <div className="flex gap-2 pointer-events-auto" ref={ref}>
      <input
        className="w-[360px] h-[42px] pl-3 font-neu uppercase py-2 border bg-bg border-white text-white placeholder:text-[#8A8B9B]"
        placeholder="Enter your email"
      />
      <button className="pointer-events-auto h-[42px] shadow-solid hover:bg-white hover:text-blueBlack w-[180px] px-3 font-bold bg-bg border border-white hover:border-blueBlack flex gap-2 items-center justify-center transition-colors">
        <span className="transition-colors">GET NOTIFIED</span>
        <span>
          <ArrowLeftIcon />
        </span>
      </button>
    </div>
  );
});
export default EarlyAccess;
