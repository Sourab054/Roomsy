import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AdjustmentsIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import InfoCard from "../components/InfoCard";
import Map from "../components/Map";
import useDataContext from "../Context/DataContext";

const Search = ({ searchResults }) => {
  const router = useRouter();
  const { location, startDate, endDate, noOfGuests } = router.query;

  const { range } = useDataContext();
  return (
    <div>
      <Header
        placeholder={`${location} | ${range} | ${
          noOfGuests > 1 ? noOfGuests + " guests" : noOfGuests + " guest"
        } `}
      />
      <main className="flex">
        <section className="flex-grow pt-14 px-6">
          <p className="text-xs">
            300+ stays &bull; {range} &bull;{" "}
            {noOfGuests > 1 ? noOfGuests + " guests" : noOfGuests + " guest"}
          </p>
          <h1 className="text-3xl mt-2 mb-6 font-semibold">
            Stays in {location}
          </h1>
          <div className="hidden lg:inline-flex space-x-3 mb-5 text-gray-800 dark:text-white whitespace-nowrap">
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

          {searchResults &&
            searchResults.map((item) => (
              <InfoCard
                img={item.img}
                key={item.img}
                description={item.description}
                location={item.location}
                title={item.title}
                star={item.star}
                price={item.price}
                total={item.total}
              />
            ))}
        </section>
        <section className="hidden pt-14 xl:inline-flex xl:min-w-[600px]">
          <Map searchResults={searchResults} />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Search;

export async function getServerSideProps() {
  const searchResults = await fetch("https://links.papareact.com/isz").then(
    (res) => res.json()
  );

  return {
    props: {
      searchResults,
    },
  };
}
