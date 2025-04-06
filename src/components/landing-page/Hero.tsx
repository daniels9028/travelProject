import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Hero = ({
  title,
  subtitle,
  description,
  buttonTitle,
  buttonDescription,
  backgroundText,
  buttonIcon,
  link,
}: {
  title: string;
  subtitle: string;
  description: string;
  buttonTitle: string;
  buttonDescription: string;
  backgroundText: string;
  buttonIcon: any;
  link: string;
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 500);
  }, []);

  return (
    <div className="container mx-auto flex py-24 px-6">
      <div className="flex flex-col text-white lg:w-1/2 w-full gap-4">
        <h1 className="lg:text-[40px] text-[30px] mt-8 font-waterBrush tracking-wider">
          {title}
        </h1>

        <h2 className="lg:text-[50px] text-[40px] font-bold font-workSans">
          {subtitle}
        </h2>

        <p className="font-workSans lg:text-xl text-base mb-10 text-wrap">
          {description}
        </p>

        <div className="flex items-center justify-between gap-8 px-6 py-8 rounded-lg bg-white/10 backdrop-blur-sm lg:w-fit">
          <div className="absolute lg:text-7xl text-6xl font-extrabold text-white opacity-10 top-1/2 transform -translate-y-1/2">
            {backgroundText}
          </div>

          {/* Button Glow Effect */}
          <div
            className={`absolute w-40 h-14 bg-red-500 blur-3xl opacity-50 rounded-full transition-all duration-700 
                      ${visible ? "opacity-50" : "opacity-0"} `}
          ></div>

          {/* CTA Button */}
          <Link
            to={link}
            className={`px-6 py-3 lg:text-lg text-base font-semibold bg-red-500 rounded-lg flex items-center gap-2
                   transition-transform hover:bg-red-600 hover:scale-105 shadow-lg relative z-10 text-nowrap 
                   ${
                     visible
                       ? "opacity-100 translate-y-0"
                       : "opacity-0 translate-y-4"
                   } transition-all duration-700`}
          >
            {buttonIcon} {buttonTitle}
          </Link>

          {/* Small subtext */}
          <p className="font-workSans text-ellipsis overflow-hidden lg:text-lg text-base font-medium relative z-10">
            {buttonDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
