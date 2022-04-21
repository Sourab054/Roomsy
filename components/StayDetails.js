import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FiSearch } from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import { useDataContext } from "../pages/DataContext";
import { useRouter } from "next/router";

const StayDetails = ({ color, placeholder }) => {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    noOfGuests,
    setNoOfGuests,
  } = useDataContext();
  const [searchInput, setSearchInput] = useState("");
  const router = useRouter();

  const searchHandler = () => {
    if (searchInput && startDate && endDate) {
      router.push(`/${searchInput}`);
    }
  };
  return (
    <div
      className={`hidden md:grid grid-cols-6 md:w-full lg:w-3/4 bg-${color} dark:bg-dark rounded-md px-4 py-2 place-content-center gap-4`}
    >
      {/* <p className="text-sm text-gray-100 font-semibold sm:text-3xl">
          Not sure where to go? Perfect.
        </p>
        <button className="text-red-400 bg-white px-10 py-4 shadow-md my-3 rounded-full font-bold hover:shadow-xl active:scale-90 transition duration-150">
          I&apos;m flexible
        </button> */}

      <div className="form-control col-span-2 px-2 ">
        <label className="label text-left">
          <span className="label-text font-semibold md:text-sm lg:text-base">
            Location
          </span>
        </label>
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder={placeholder || "Where are you going?"}
          className={`input input-ghost md:text-xs lg:text-sm bg-${color} w-full outline-none dark:bg-dark`}
        />
      </div>

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
            className={`input input-ghost md:text-xs lg:text-sm outline-none w-3/4 bg-${color} text-gray-500 dark:text-gray-50 dark:bg-dark`}
          />
        </span>
      </div>

      <div className="form-control">
        <label className="label">
          <span className="label-text font-semibold md:text-sm lg:text-base">
            Check out
          </span>
        </label>
        {/* <input
            type="date"
            placeholder="Add dates"
            className="input input-ghost text-sm outline-none w-full"
          /> */}
        <span>
          {" "}
          <DatePicker
            dateFormat="dd/MM/yyyy"
            selected={endDate}
            minDate={startDate}
            onChange={(date) => setEndDate(date)}
            className={`input input-ghost md:text-xs lg:text-sm outline-none w-3/4 bg-${color} text-gray-500 dark:text-gray-50 dark:bg-dark`}
          />
        </span>
      </div>
      <div className="form-control px-2">
        <label className="label">
          <span className="label-text font-semibold md:text-sm lg:text-base">
            Guests
          </span>
        </label>
        <input
          type="number"
          value={noOfGuests}
          onChange={(e) => setNoOfGuests(e.target.value)}
          placeholder="Add guests"
          className={`input input-ghost md:text-xs lg:text-sm bg-${color} outline-none dark:bg-dark`}
        />
      </div>
      <div className="place-self-center justify-self-end bg-gray-300 dark:bg-gray-800 rounded-md p-2">
        <FiSearch size={26} className="" onClick={searchHandler} />
      </div>
    </div>
  );
};

export default StayDetails;
