import { cn } from "../lib/util";

const TopRightCorner = () => {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H6.66122H7.45031H7.66122L7.66121 7.66127L6.66121 7.66127L6.66122 1H0V0Z"
        fill="#FECE00"
      />
    </svg>
  );
};

const TopLeftCorner = () => {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.49994 0H0V0.5V1V6.5H1L1 1H6.49994H6.99994V0H6.49994Z"
        fill="#FECE00"
      />
    </svg>
  );
};

const BottomRightCorner = () => {
  return (
    <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.74212 0.661255L5.74213 6.16125H0.242188V7.16125L5.74213 7.16125H6.48434H6.74213L6.74212 0.661255H5.74212Z"
        fill="#FECE00"
      />
    </svg>
  );
};

const BottomLeftCorner = () => {
  return (
    <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.00001 0.5L1 5.99998L6.49994 5.99998V6.99998L1 6.99998H0.257789H0L5.25381e-06 0.5H1.00001Z"
        fill="#FECE00"
      />
    </svg>
  );
};
const Button = ({ children, className, ...props }) => {
  return (
    <button className={cn("bg-transparent block outline-none", className)} {...props}>
      <div className="relative w-full h-full py-3 px-8 flex justify-center items-center -translate-x-1/2 -translate-y-1/2">
        <span className="absolute top-0 right-0">
          <TopRightCorner />
        </span>
        <span className="absolute top-0 left-0">
          <TopLeftCorner />
        </span>
        <span className="absolute bottom-0 right-0">
          <BottomRightCorner />
        </span>
        <span className="absolute bottom-0 left-0">
          <BottomLeftCorner />
        </span>
        {children}
      </div>
    </button>
  );
};

export default Button;
