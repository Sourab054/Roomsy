import Image from "next/image";
import React, { useState } from "react";
import StayDetails from "./StayDetails";

const Banner = () => {
  return (
    <div className="sm:max-w-2xl lg:max-w-4xl xl:max-w-7xl mx-auto sm:mt-4 relative h-[300px] sm:h-[400px] lg:h-[550px] ">
      <Image
        // src="https://links.papareact.com/0fm"
        src="/banner2.jpg"
        alt="Banner"
        priority="true"
        layout="fill"
        objectFit="cover"
        className="sm:rounded-2xl"
      ></Image>
      <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-[300px] sm:h-[400px] lg:h-[550px] bg-black-rgba rounded-2xl "></div>
      <div className="absolute top-10 lg:left-72 md:left-8 md:right-8">
        <StayDetails color={"white"} />
      </div>
    </div>
  );
};

export default Banner;
