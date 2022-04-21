import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { FaDollarSign, FaWifi } from "react-icons/fa";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { FiMonitor } from "react-icons/fi";
import { BiBath } from "react-icons/bi";
import { MdOutlineDining } from "react-icons/md";
import { RiParkingBoxLine } from "react-icons/ri";
import { GiWashingMachine } from "react-icons/gi";
import Map from "../../components/Map";
import StayDetails from "../../components/StayDetails";
import DatePicker from "react-datepicker";
import { useDataContext } from "../DataContext";
import BottomNav from "../../components/BottomNav";

const RoomDetails = ({ roomPics, roomDesc, hotelData, hotelMap }) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    noOfGuests,
    setNoOfGuests,
  } = useDataContext();
  const route = useRouter();
  const { id } = route.query;
  console.log(hotelMap);

  return (
    <div className="dark:bg-dark ">
      <BottomNav />
      <Header />
      <section className="flex-grow py-8 md:pt-14 px-6 max-w-7xl mx-auto">
        {/* {roomPics} */}
        <div className="mt-4">
          <Carousel showThumbs={false}>
            {roomPics.map((pic, i) => (
              <div className="relative h-[450px] sm:h-[500px] w-full" key={i}>
                <Image
                  src={pic}
                  alt="Room Pic"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg sm:rounded-2xl"
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div>
          {hotelData.map((hotel) => (
            <div key={hotel.hotel_id}>
              <div className="sm:flex sm:justify-between">
                <div className="mt-4">
                  <h2 className="text-3xl sm:text-4xl font-bold">
                    {hotel.hotel_name}
                  </h2>
                  <h4 className="font-medium text-gray-500">{hotel.address}</h4>
                </div>
                <div>
                  <p className="flex items-center font-bold text-xl sm:text-2xl text-gray-800 dark:text-gray-300 mt-3">
                    <FaDollarSign />
                    {Math.trunc(`${hotel.min_total_price}`)}/ night
                  </p>
                </div>
              </div>
              <div className="mt-10 space-y-2">
                <h2 className="text-3xl font-semibold mb-6">Description</h2>
                <p className="text-sm italic ">{roomDesc.description}</p>
                <p className="text-sm italic ">
                  {roomDesc.extra_lines?.imp_info}
                </p>
              </div>
              <div className="mt-6 space-y-2">
                <h2 className="text-3xl font-semibold mb-6">
                  What this place offers
                </h2>
                <div className="grid w-full sm:w-1/2 grid-cols-2 sm:grid-cols-3 place-content-center gap-y-4 text-gray-500">
                  <p className="flex items-center">
                    <FaWifi /> <span className="ml-2">Free Wifi</span>
                  </p>
                  <p className="flex items-center">
                    <FiMonitor /> <span className="ml-2">TV</span>
                  </p>
                  <p className="flex items-center">
                    <BiBath /> <span className="ml-2">Bathtub</span>
                  </p>
                  <p className="flex items-center">
                    <MdOutlineDining /> <span className="ml-2">Kitchen</span>
                  </p>
                  <p className="flex items-center">
                    <RiParkingBoxLine /> <span className="ml-2">Parking</span>
                  </p>
                  <p className="flex items-center">
                    <GiWashingMachine />{" "}
                    <span className="ml-2">Washing Machine</span>
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-semibold mb-6">Where you’ll be</h2>
                <div className="rounded-lg w-[400px] h-[300px] sm:w-[550px] sm:h-[400px] md:w-[700px] lg:w-[950px] lg:h-[500px] xl:w-[1200px] xl:h-[550px] overflow-hidden">
                  <Map hotelMap={hotelMap} hotelName={hotel.hotel_name} />
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl font-semibold mb-6">Book your stay</h2>
                <div className="shadow-sm p-4 space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold md:text-sm lg:text-base">
                          Check in
                        </span>
                      </label>
                      <span>
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={startDate}
                          minDate={new Date()}
                          onChange={(date) => setStartDate(date)}
                          className="input input-ghost md:text-xs lg:text-sm outline-none w-3/4 bg-white text-gray-500 dark:text-gray-50 dark:bg-dark"
                        />
                      </span>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-semibold md:text-sm lg:text-base">
                          Check out
                        </span>
                      </label>
                      <span>
                        {" "}
                        <DatePicker
                          dateFormat="dd/MM/yyyy"
                          selected={endDate}
                          minDate={startDate}
                          onChange={(date) => setEndDate(date)}
                          className="input input-ghost md:text-xs lg:text-sm outline-none w-3/4 bg-white text-gray-500 dark:text-gray-50 dark:bg-dark"
                        />
                      </span>
                    </div>
                    <div className="form-control px-2">
                      <label className="label ">
                        <span className="label-text block font-semibold md:text-sm lg:text-base">
                          Guests
                        </span>
                      </label>
                      <input
                        type="number"
                        value={noOfGuests}
                        onChange={(e) => setNoOfGuests(e.target.value)}
                        placeholder="Add guests"
                        className="input input-ghost w-full md:text-xs lg:text-sm bg-white outline-none dark:bg-dark"
                      />
                    </div>
                  </div>
                  <button className="filterBtn active:bg-red-500 bg-primary dark:active:bg-red-500 text-white rounded-sm font-semibold w-full sm:w-[75%] mx-auto">
                    Continue to Book
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const { city, roomDetails } = context.params;
  // console.log(context.params, city, roomDetails);
  // console.log("ID" + id);
  const optionsPics = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/photos",
    params: { locale: "en-gb", hotel_id: roomDetails },
    headers: {
      "x-rapidapi-host": "booking-com.p.rapidapi.com",
      "x-rapidapi-key": "6e1dacae20mshbb0cc7fd5a0c872p18d37ajsn95a40471a474",
    },
  };

  const roomData = await axios
    .request(optionsPics)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.error(error);
    });
  // console.log(roomData);
  const roomPics = roomData.map((data) => data.url_1440).slice(0, 6);
  // console.log(roomPics);

  const optionsDesc = {
    method: "GET",
    url: "https://booking-com.p.rapidapi.com/v1/hotels/description",
    params: { hotel_id: roomDetails, locale: "en-gb" },
    headers: {
      "x-rapidapi-host": "booking-com.p.rapidapi.com",
      "x-rapidapi-key": "6e1dacae20mshbb0cc7fd5a0c872p18d37ajsn95a40471a474",
    },
  };

  const roomDesc = await axios
    .request(optionsDesc)
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      // console.error(error);
    });

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

  // console.log(destId);

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
  const hotelData = hotelRes?.result.filter(
    (hotel) => hotel.hotel_id == roomDetails
  );

  const hotelMap = hotelRes?.map_bounding_box;
  // console.log(hotelMap);
  return {
    props: {
      roomPics,
      roomDesc,
      hotelData,
      hotelMap,
    },
  };
}

export default RoomDetails;
