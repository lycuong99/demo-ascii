import { Link } from "react-router-dom";
import { LogoIcon } from "../icon";
import { APP_PATH } from "../../router";
import { cn } from "@/lib/utils";
import { useLayoutEffect, useRef } from "react";
import { createTextAnimation } from "@/animation";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0  w-screen h-14 lg:h-20 flex justify-center items-center z-50">
      <div className="flex items-center justify-between container">
        <LogoSection />
        <Nav />
      </div>
      <div className="container h-[1px] bg-white/20 absolute bottom-0"></div>
    </header>
  );
};

const Logo = () => {
  return (
    <span className="aspect-square h-6 lg:h-8 ">
      <LogoIcon />
    </span>
  );
};

const LogoSection = () => {
  return (
    <Link to={APP_PATH.HOME} className="flex uppercase items-center decoration-white">
      <Logo />
      <span className="font-neu font-light text-sm mb-1 ml-2 mr-0.5 text-[14px]">LOCKNESS</span>
      <sup className="font-neu text-[7px] mb-1">ltd.</sup>
    </Link>
  );
};

const Nav = () => {
  return (
    <nav>
      <ul className="uppercase flex gap-4 lg:gap-8 font-neu ">
        <li>
          <Link
            to="https://docs.lockness.xyz/"
            target="_blank"
            className=" h-full flex items-center text-white text-[12px] lg:text-[16px]  gap-1 leading-tight"
          >
            <DancingText>DOCS</DancingText>
            <span className="self-start hidden lg:inline-block ">
              <img className="h-4 w-4" src="/mdi-light_arrow-left.svg" />
            </span>
          </Link>
        </li>

        <li>
          <Link
            to={APP_PATH.EARLY_ACCESS}
            className="flex justify-center items-center text-[12px] lg:text-[16px] text-white gap-2"
          >
            <span className=" hidden lg:inline-block">
              <img src="/plus.svg" />
            </span>
            <DancingText> Get early access</DancingText>
            <span className=" hidden lg:inline-block">
              <img src="/plus.svg" />
            </span>
          </Link>
        </li>
        <li>
          <Link
            to={APP_PATH.DATASETS}
            className="flex justify-center items-center text-[12px] lg:text-[16px] text-white gap-2"
          >
            <span className=" hidden lg:inline-block">
              <img src="/plus.svg" />
            </span>
            <DancingText> Datasets</DancingText>
            <span className=" hidden lg:inline-block">
              <img src="/plus.svg" />
            </span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

const DancingText = ({ children, className }) => {
  const ref = useRef();
  useLayoutEffect(() => {
    const intro = ref.current;
    // intro.classList.add("opacity-0");

    const { animate, clear, reset } = createTextAnimation(intro, {
      interation: 20,
      // lineGapTime: 200
    });

    let timeout = setTimeout(() => {
      animate();
    }, 1000);
    ref.current.addEventListener("mouseenter", animate);
    // document.addEventListener("mouseenter", animate);
    return () => {
      clearTimeout(timeout);
      ref.current.removeEventListener("mouseenter", animate);

      reset();
    };
  }, []);
  return (
    <span className={cn(className)}>
      <pre ref={ref} className="tracking-wider">
        {children}
      </pre>
    </span>
  );
};
