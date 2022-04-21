import Image from "next/image";
import React from "react";
import { Fade } from "react-reveal";

const LargeCard = ({ img, title, description, buttonTxt }) => {
  return (
    <Fade bottom>
      <section className="relative py-16 cursor-pointer">
        <div className="relative h-96 min-w-[300px]">
          <Image
            src={img}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="rounded-2xl"
          />
        </div>
        <div className="absolute top-32 left-12">
          <h3 className="text-4xl mb-3 w-64 dark:text-gray-800">{title}</h3>
          <p className="dark:text-gray-800">{description}</p>
          <button className="text-sm text-white bg-dark px-4 py-2 rounded-lg mt-5">
            {buttonTxt}
          </button>
        </div>
      </section>
    </Fade>
  );
};

export default LargeCard;
