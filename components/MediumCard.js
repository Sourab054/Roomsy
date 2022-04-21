import Image from "next/image";
import React from "react";
import { Fade } from "react-reveal";

const MediumCard = ({ img, title }) => {
  return (
    <Fade bottom delay={400}>
      <div className="cursor-pointer hover:scale-105 transition transform duration-300 ease-out">
        <div className="absolute top-0 w-full h-96 bg-black-rgba z-20 rounded-xl"></div>
        <div className="relative h-96 w-80">
          <Image
            src={img}
            alt="title"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
        <h3 className="text-xl absolute bottom-4 left-4 text-white z-50 font-semibold mt-3">
          {title}
        </h3>
      </div>
    </Fade>
  );
};

export default MediumCard;
