import { useContext, useEffect, useState } from "react";
import { Link, Outlet, useOutletContext } from "react-router-dom";
import { VanApiContext } from "../../App";
import HostVans from "./HostVans";

export default function Dashboard() {
  const [dayFilter, setDayFilter] = useState("30-days");
  const [totalIncome, setTotalIncome] = useState(0);
  const { userData, currentUser } = useContext(VanApiContext);

  const handleFilterChange = (event) => {
    setDayFilter(event.target.value);
  };

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const filteredTransactions = userData?.transactions.filter((item) => {
    const itemDate = item.timestamp.toDate();

    if (dayFilter === "30-days") {
      return itemDate >= thirtyDaysAgo;
    } else if (dayFilter === "year") {
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      return itemDate >= oneYearAgo;
    }

    return true;
  });

  function sumAllIncome() {
    let sum = 0;
    filteredTransactions.forEach((item) => {
      sum += item.price;
    });
    return sum;
  }

  useEffect(() => {
    setTotalIncome(sumAllIncome());
  }, [dayFilter]);

  return (
    <div className="dashboard-outer">
      <div className="dashboard-income-container">
        <div className="dashboard-income">
          <h1 className="dashboard-title">Welcome!</h1>
          <div className="dashboard-income-filter">
            <p>Income in tha last</p>{" "}
            <select
              name="income-days-filer"
              id="income-filter"
              value={dayFilter}
              onChange={handleFilterChange}
            >
              <option value="30-days">30 days</option>
              <option value="year">Year</option>
            </select>
          </div>

          <Link to="/host/income" className="dashboard-link">
            Details
          </Link>
          <h3 className="dashboard-total-income">${totalIncome}</h3>
        </div>
      </div>
      <HostVans />
    </div>
  );
}
