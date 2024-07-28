import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Loader = () => {
  useGSAP(() => {
    const top = document.querySelector(".top-0");
    const right = document.querySelector(".right-0");
    const svg = document.querySelector(".anim-svg");

    gsap.fromTo(top, { opacity: 0 , filter: "blur(4px)"}, { opacity: 1, duration: 2, filter: "blur(20px)", ease: "power1.inOut" });
    // gsap.t(svg, { opacity: 0 }, { opacity: 1, duration: 2, filter: "blur(4px)", ease: "power1.inOut" });
    // gsap.fromTo(right, { opacity: 0 }, { opacity: 1, duration: 1 });
  });
  return (
    <svg
      className="anim-svg"
      width="1440"
      height="1031"
      viewBox="0 0 1440 1031"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_81_209)">
        <rect width="1440" height="1031" fill="#010327" fillOpacity="0.11" />
        <mask
          id="mask0_81_209"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x="-589"
          y="-332"
          width="2358"
          height="2052"
        >
          <path
            d="M469.987 545.126C574.116 649.255 589.681 802.515 504.754 887.442C419.826 972.37 -476.01 1137.77 -580.138 1033.64C-684.267 929.512 221.479 310.47 306.407 225.542C391.334 140.615 365.859 440.998 469.987 545.126Z"
            fill="url(#paint0_linear_81_209)"
          />
          <path
            d="M975.916 931.602C1080.04 1035.73 1095.61 1188.99 1010.68 1273.92C925.755 1358.85 428.365 1807.69 324.236 1703.56C220.108 1599.44 8.4237 1317.81 93.3512 1232.88C178.279 1147.95 871.788 827.473 975.916 931.602Z"
            fill="url(#paint1_radial_81_209)"
          />
          <path
            className="top-0"
            d="M704.439 311.246C1140.55 289.059 930.69 290.905 1122.27 88.8462C1159.09 63.9182 1211.79 11.7855 1128 2.67879C1023.25 -8.7046 997.286 -64.7599 875.687 -69.6826C754.089 -74.6053 654.289 -103.349 465.601 -115.889C276.912 -128.429 353.076 -38.7143 245.921 52.7156C138.767 144.145 196.54 111.344 205.529 394.329C214.518 677.314 268.328 333.433 704.439 311.246Z"
            fill="#D9D9D9"
          />
          <path
            className="right-0"
            d="M813.642 853.122C543.087 1195.88 679.924 1036.76 705.776 1314C700.279 1358.13 704.796 1432.12 766.84 1375.06C844.396 1303.75 903.678 1321.13 987.474 1232.88C1071.27 1144.62 1158.63 1088.46 1292.35 954.746C1426.07 821.029 1308.39 819.246 1310.18 678.398C1311.96 537.549 1298.59 602.625 1079.74 422.998C860.888 243.371 1084.2 510.36 813.642 853.122Z"
            fill="#D9D9D9"
          />
        </mask>
        <g mask="url(#mask0_81_209)">
          <g opacity="0.7">
            <rect x="451.109" y="716.345" width="80.2262" height="80.2262" fill="#010327" fillOpacity="0.25" />
            <rect x="370.883" y="716.345" width="80.2262" height="80.2262" fill="#010327" fillOpacity="0.25" />
            <rect x="370.883" y="796.571" width="80.2262" height="81.3723" fill="#010327" fillOpacity="0.25" />
            <rect x="209.283" y="636.119" width="80.2262" height="80.2262" fill="#010327" fillOpacity="0.25" />
            <g filter="url(#filter0_f_81_209)">
              <ellipse cx="720.5" cy="517" rx="259.5" ry="261" fill="#1B9D95" />
            </g>
          </g>
        </g>
      </g>
      <defs>
        <filter
          id="filter0_f_81_209"
          x="413.1"
          y="208.1"
          width="614.8"
          height="617.8"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="23.95" result="effect1_foregroundBlur_81_209" />
        </filter>
        <linearGradient
          id="paint0_linear_81_209"
          x1="-160.712"
          y1="718.513"
          x2="331.813"
          y2="568.304"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_81_209"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(494.057 1422.31) rotate(-74.3932) scale(777.019 1335.47)"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <clipPath id="clip0_81_209">
          <rect width="1440" height="1031" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
