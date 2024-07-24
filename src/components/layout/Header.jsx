import { LogoIcon } from "../icon";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0  w-screen h-20 flex justify-center items-center z-50">
      <div className="flex items-center justify-between container">
        <LogoSection />

        <Nav />
      </div>
    </header>
  );
};

const Logo = () => {
  return (
    <span className="h-8 w-8">
      <LogoIcon />
    </span>
  );
};

const LogoSection = () => {
  return (
    <did className="flex uppercase items-center">
      <Logo />
      <span className="font-neu font-light text-sm mb-1 mr-0.5">LOCKNESS</span>
      <sup className="font-neu text-[7px] mb-1">ltd.</sup>
    </did>
  );
};

const Nav = () => {
  return (
    <nav>
      <ul className="uppercase flex gap-8 font-neu">
        <li>
          <a href="" className="flex content-baseline text-white gap-1">
            <span>DOCS</span>
            <span className="h-4 w-4">
              <img className="h-full w-full" src="/mdi-light_arrow-left.svg" />
            </span>
          </a>
        </li>

        <li>
          <a href="" className="flex justify-center items-center text-white gap-2">
            <span>
              <img src="/plus.svg" />
            </span>
            <span> Get early access</span>
            <span>
              <img src="/plus.svg" />
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

const NavItem = ({ children, className }) => {
  return <li className="uppercase">{children}</li>;
};
