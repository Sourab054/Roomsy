import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  MenuIcon,
  SearchIcon,
  UserCircleIcon,
  SunIcon,
  MoonIcon,
  UsersIcon,
} from "@heroicons/react/solid";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";
import { Fade } from "react-reveal";
import { useDataContext } from "../Context/DataContext";

const Header = ({ placeholder }) => {
  const {
    startDate,
    setStartDate,
    endDate,
    noOfGuests,
    setNoOfGuests,
    setEndDate,
    range,
  } = useDataContext();
  const [searchInput, setSearchInput] = useState("");
  const [mounted, setMounted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const { systemTheme, theme, setTheme } = useTheme();

  useEffect(() => {
    window.onscroll = () => {
      if (window.pageYOffset > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      return () => (window.onscroll = null);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const router = useRouter();

  const renderThemeChanger = () => {
    if (!mounted) return null;
    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return (
        <span className="p-2 text-dark-hover sm:text-gray-200 sm:dark:bg-dark dark:bg-gray-200 rounded-full right-6 fixed bottom-28 sm:static">
          <SunIcon className="w-7 h-7 " onClick={() => setTheme("light")} />
        </span>
      );
    } else {
      return (
        <span className="p-2 bg-dark-hover text-white dark:bg-dark-hover rounded-full right-6 fixed bottom-28 sm:static sm:bg-white sm:text-gray-700 dark:text-gray-100">
          <MoonIcon className="w-7 h-7" onClick={() => setTheme("dark")} />
        </span>
      );
    }
  };

  const searchHandler = () => {
    searchInput = searchInput.charAt(0).toUpperCase() + searchInput.slice(1);
    if (searchInput && startDate && endDate) {
      router.push({
        pathname: `/${searchInput}`,
        query: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          noOfGuests,
        },
      });
    }
  };

  const selectionRange = {
    startDate,
    endDate,
    key: "selection",
  };

  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-gray-900 shadow-sm grid grid-cols-4 gap-x-2 sm:gap-x-0 p-3 md:px-10 dark:bg-dark">
      <div
        onClick={() => router.push("/")}
        className="relative flex items-center h-12 sm:h-14 my-auto cursor-pointer "
      >
        <Image
          src="/logo1.png"
          alt="logo"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>
      {isScrolled ? (
        <Fade top duration={400}>
          <div
            className={` ${
              isScrolled
                ? "col-span-3 text-center sm:flex sm:col-start-2 sm:col-end-4 items-center border dark:border-dark-hover rounded-full py-2 md:border-2 md:shadow-sm md:hover:shadow-lg"
                : "invisible"
            } `}
          >
            <input
              className="text-sm md:text-base flex-grow text-gray-600 dark:text-white placeholder-gray-900 dark:placeholder-gray-100 outline-none md:pl-5 bg-transparent"
              type="text"
              placeholder={placeholder || "Search for places"}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <SearchIcon className="hidden md:inline-flex h-8 mx-2 bg-primary rounded-full text-white p-2 cursor-pointer" />
          </div>
        </Fade>
      ) : (
        <div
          className={` ${
            isScrolled
              ? "col-span-3 sm:col-start-2 sm:col-end-4 lg:col-span-1 text-center sm:flex items-center border dark:border-dark-hover rounded-full py-2 md:border-2 md:shadow-sm md:hover:shadow-lg"
              : "invisible"
          } `}
        >
          <input
            className="text-sm md:text-base flex-grow text-gray-600 dark:text-white placeholder-gray-900 dark:placeholder-gray-100 outline-none md:pl-5 bg-transparent"
            type="text"
            placeholder={placeholder || "Search for places"}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchIcon className="hidden md:inline-flex h-8 mx-2 bg-primary rounded-full text-white p-2 cursor-pointer" />
        </div>
      )}

      <div className="sm:flex lmd:col-start-3 md:col-end-5 items-center justify-end space-x-4 dark:text-gray-100">
        <p className="hidden lg:inline p-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-dark-hover hover:rounded-full transition duration-500 ease-out ">
          Become a host
        </p>
        {renderThemeChanger()}
        <div className="hidden sm:flex border-2 items-center hover:shadow-md rounded-full space-x-2 p-2 cursor-pointer md:hover:shadow-lg">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-7" />
        </div>
      </div>
      {searchInput && (
        <div className="flex flex-col col-span-4 mx-auto mt-2 shadow-sm p-2 rounded-lg dark:bg-white">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#FF002E"]}
            onChange={handleSelect}
          />
          <div className="flex items-center mb-4 border-b">
            <h2 className="flex-grow font-medium text-2xl pl-1 ">
              Number of Guests
            </h2>
            <UsersIcon className="h-5" />
            <input
              type="number"
              value={noOfGuests}
              onChange={(e) => setNoOfGuests(e.target.value)}
              className="w-12 pl-2 text-lg outline-none text-primary dark:bg-white"
            />
          </div>
          <div className="flex">
            <button
              className="flex-grow text-gray-500"
              onClick={() => setSearchInput("")}
            >
              Cancel
            </button>
            <button onClick={searchHandler} className="flex-grow text-primary">
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
