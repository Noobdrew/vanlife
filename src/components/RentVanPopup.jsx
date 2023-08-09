import { addDays, subDays } from "date-fns";
import { useContext, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { flushSync } from "react-dom";
import { getExcludedDates, rentVan } from "../api";
import { VanApiContext } from "../App";

export default function RentVanPopup({
  currentVan,
  setRentVanOpen,
  excludedDates,
}) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [validDate, setValidDate] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalDays, setTotalDays] = useState();
  const { setPopupOpen, setPopupText } = useContext(VanApiContext);
  useEffect(() => {}, []);
  const allDates = getDatesInRange(startDate, endDate);

  function getDatesInRange(startDate, endDate) {
    const dates = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  const areDatesEqual = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const isAnyDateExcluded = (dates) =>
    dates.some((date) =>
      excludedDates.some((excludedDate) => areDatesEqual(date, excludedDate))
    );

  useEffect(() => {
    setTotalCost(currentVan.price * allDates.length);
  }, [allDates]);

  function confirmRentVan() {
    if (!validDate) return;
    console.log(allDates);
    rentVan(currentVan.id, allDates);
    setRentVanOpen(false);
    setPopupText(`${currentVan.name} rented successfully!`);
    setPopupOpen(true);
  }

  return (
    <div className="popup-overlay">
      <div className="rent-van-inner">
        <img src={currentVan.imageUrl} alt="van img" className="rent-van-img" />
        <h3>
          Van Name: <small> {currentVan.name}</small>
        </h3>
        <div>
          <h3>Rent Period:</h3>

          <DatePicker
            selectsRange={true}
            startDate={dateRange[0]}
            endDate={dateRange[1]}
            onChange={(update) => {
              const [newStartDate, newEndDate] = update;

              // Check if the new date range includes excluded dates
              if (
                !isAnyDateExcluded(getDatesInRange(newStartDate, newEndDate))
              ) {
                setDateRange(update);
                setValidDate(true);
              } else {
                console.log("select valid date");
                setValidDate(false);
                setDateRange([null, null]);
              }
            }}
            excludeDates={excludedDates} // Pass the array of excluded dates
          />
          {!validDate && <p className="danger">Enter a valid date</p>}
        </div>
        <h3>
          Number of days: <small>{allDates.length}</small>
        </h3>
        <h3>
          Total cost:
          <small> ${totalCost}</small>
        </h3>

        <button className="rent-van-submit" onClick={confirmRentVan}>
          Submit
        </button>
        <button
          className="rent-van-cancel"
          onClick={(e) => setRentVanOpen(false)}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
