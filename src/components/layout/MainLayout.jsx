import { Outlet } from "react-router-dom";
import { BackgroundGrid } from "../../3d-components/BackgroundGrid";
import { Header } from "./Header";
import { BigXIcon, Star } from "../icon";
import { Leva } from "leva";
import Social from "./Social";
import { DotPattern } from "../DotPattern";

const MainLayout = () => {
  return (
    <>
      <Header />
      <BackgroundGrid />
      <Outlet />
      <Leva hidden />
      <div className="h-screen w-screen fixed top-0 pb-2 lg:pb-4 pt-20 lg:pt-32 pointer-events-none">
        <div className="container h-full relative ">
          <span>
            <DotPattern />
          </span>
          <span
            className="right-0 absolute "
            style={{
              transform: "rotateY(3.142rad)",
            }}
          >
            <DotPattern />
          </span>
          <span className="aspect-square w-10 md:w-14 xl:w-16 flex absolute top-0 right-0">
            <BigXIcon />
          </span>
          <span className="aspect-square w-12 xl:w-14 flex absolute bottom-0 left-0">
            <Star />
          </span>
          <Social className="absolute bottom-2 lg:bottom-0 right-0 pointer-events-auto" />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
