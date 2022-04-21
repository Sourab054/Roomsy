import { createContext, useContext, useState } from "react";
import { format } from "date-fns";
const DataContext = createContext();

export function DataProvider({ children }) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().valueOf() + 1000 * 3600 * 24)
  );
  const [noOfGuests, setNoOfGuests] = useState(1);

  const formattedStartDate = format(new Date(startDate), "dd MMMM");
  const formattedEndDate = format(new Date(endDate), "dd MMMM");
  const range = `${
    formattedStartDate.split(" ")[0] +
    " " +
    formattedStartDate.split(" ")[1].slice(0, 3)
  } - ${
    formattedEndDate.split(" ")[0] +
    " " +
    formattedEndDate.split(" ")[1].slice(0, 3)
  }`;

  const value = {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    noOfGuests,
    setNoOfGuests,
    range,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useDataContext() {
  return useContext(DataContext);
}
