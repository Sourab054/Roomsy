import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { Fade } from "react-reveal";
import useDataContext from "../pages/DataContext";

const SmallCard = ({ img, location, distance }) => {
  const { startDate, endDate, noOfGuests } = useDataContext();
  const router = useRouter();
  const searchHandler = () => {
    router.push({
      pathname: location,
      query: {
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        noOfGuests,
      },
    });
  };
  return (
    <Fade bottom delay={400}>
      <div
        onClick={searchHandler}
        className="flex items-center space-x-4 m-2 mt-5 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out dark:hover:bg-dark-hover"
      >
        <div className="relative h-16 w-16">
          <Image
            src={img}
            alt={location}
            layout="fill"
            className="rounded-lg"
          />
        </div>
        <div>
          <h2 className="font-bold">{location}</h2>
          <h3>{distance}</h3>
        </div>
      </div>
    </Fade>
  );
};

export default SmallCard;
