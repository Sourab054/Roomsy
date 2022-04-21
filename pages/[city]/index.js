import { AdjustmentsIcon } from "@heroicons/react/solid";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import StayDetails from "../../components/StayDetails";
import { useDataContext } from "../DataContext";
import Fade from "react-reveal/Fade";
import BottomNav from "../../components/BottomNav";
import Link from "next/link";

const City = ({ hotelList, cityData }) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    noOfGuests,
    setNoOfGuests,
    range,
  } = useDataContext();
  const router = useRouter();
  const { city } = router.query;
  // console.log(router);
  // console.log(cityName);
  // console.log(hotelRes);

  if (router.isFallback) {
    return <div>loading...</div>;
  }

  return (
    <div className="dark:bg-dark">
      <BottomNav />
      <Header
        placeholder={`${city} | ${range} | ${
          noOfGuests > 1 ? noOfGuests + " Guests" : noOfGuests + " Guest"
        } `}
      />
      <div className="flex flex-col items-center bg-gray-200 dark:bg-dark lg:border-y-2 border-gray-300 dark:border-gray-800">
        <StayDetails color={"gray-200"} placeholder={city} />
      </div>

      <section className="flex-grow pt-8 md:pt-14 px-6 max-w-7xl mx-auto">
        <p className="text-xs font-semibold text-gray-400">
          {cityData.map((data) => data.hotels)[2]} stays &bull; {range} &bull;{" "}
          {noOfGuests > 1 ? noOfGuests + " Guests" : noOfGuests + " Guest"}
        </p>
        <h1 className="text-3xl mt-2 mb-6 font-bold">Stays in {city}</h1>
        <div className="hidden lg:inline-flex space-x-3 mb-5 text-gray-800 dark:text-white  whitespace-nowrap">
          <p className="filterBtn">Free Cancellation</p>
          <p className="filterBtn">WiFi</p>
          <p className="filterBtn">Free Parking</p>
          <p className="filterBtn">Gym</p>
          <p className="filterBtn">Air Conditioning</p>
          <p className="filterBtn flex items-center mr-1">
            <span>
              <AdjustmentsIcon className="h-5" />
            </span>
            Filters
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 pb-12 pt-4">
          {hotelList.map((hotel) => (
            <Fade bottom key={hotel.id}>
              <div
                key={hotel.id}
                onClick={() => router.push(`${city}/${hotel.hotel_id}`)}
                className="cursor-pointer font-pop hover:shadow-xl transition transform duration-300 border-2 border-gray-200 dark:border-dark dark:bg-dark-hover shadow-sm rounded-2xl p-4 ease-out"
              >
                <div className="relative h-56">
                  <Image
                    src={hotel.max_1440_photo_url || hotel.max_photo_url}
                    alt="title"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-xl hover:scale-110 transition transform duration-500 ease-in-out"
                  />
                </div>
                <span className="absolute flex items-center top-6 right-8 py-1 font-bold px-3 rounded-md text-sm bg-white text-gray-800">
                  <AiFillStar color="orangered" />{" "}
                  {hotel.review_score ? hotel.review_score : "7.0"}
                </span>
                <h3 className="text-xl font-semibold mt-3">
                  {hotel.hotel_name}
                </h3>
                <p className="text-black dark:text-gray-200 mt-1 text-sm flex items-center">
                  <span>
                    <FaMapMarkerAlt color="red" className="mr-1" />{" "}
                  </span>
                  {hotel.address}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 font-semibold mt-3">
                  Studio &bull; 1 Bed &bull; 1 Bath
                </p>
                <p className="flex items-center font-bold text-sm text-gray-800 dark:text-gray-400 mt-3">
                  <FaDollarSign />
                  {Math.trunc(`${hotel.min_total_price}`)}/ night
                </p>
              </div>
            </Fade>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const cityNames = await fetch("https://jsonkeeper.com/b/6GGE").then((res) =>
    res.json()
  );
  //   console.log("cityNames" + cityNames);

  return {
    fallback: true,
    paths: cityNames.map((city) => ({
      params: { city: city.location },
    })),
  };
}

export async function getStaticProps(context) {
  const city = context.params.city;
  // console.log(city);
  const optionsCity = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/locations",
    params: { name: city, locale: "en-gb" },
    headers: {
      "x-rapidapi-host": "booking-com.p.rapidapi.com",
      "x-rapidapi-key": "6e1dacae20mshbb0cc7fd5a0c872p18d37ajsn95a40471a474",
    },
  };

  const cityData = await axios
    .request(optionsCity)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.error(error);
    });

  const destId = cityData
    .map((data) => data.dest_id)
    .find((ele) => ele.length > 5);
  //-2602512

  console.log(destId + "city index");

  const optionsHotels = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/search",
    params: {
      room_number: "1",
      order_by: "popularity",
      filter_by_currency: "USD",
      checkout_date: "2022-07-02",
      checkin_date: "2022-07-01",
      units: "metric",
      adults_number: "2",
      dest_id: destId,
      dest_type: "city",
      locale: "en-gb",
    },
    headers: {
      "x-rapidapi-host": "booking-com.p.rapidapi.com",
      "x-rapidapi-key": "6e1dacae20mshbb0cc7fd5a0c872p18d37ajsn95a40471a474",
    },
  };

  const hotelRes = await axios
    .request(optionsHotels)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.error(error);
    });
  // console.log("list" + hotelList);
  const hotelList = hotelRes?.result.map((data) => data);
  // console.log(hotelList);

  return {
    props: {
      hotelList,
      cityData,
    },
  };
}
export default City;
