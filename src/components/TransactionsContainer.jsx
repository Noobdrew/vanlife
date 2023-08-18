import React, { useState } from "react";
import RecentTransactions from "./RecentTransactions";

export default function TransactionsContainer({ userData }) {
  const [dayFilter, setDayFilter] = useState("30-days");

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
  const reversedFilteredTransactions = [...filteredTransactions].reverse();

  return (
    <div>
      <select
        value={dayFilter}
        onChange={handleFilterChange}
        id="income-filter"
      >
        <option value="30-days">Last 30 Days</option>
        <option value="year">Last Year</option>
      </select>
      <div className="transaction-inner">
        {reversedFilteredTransactions.map((item, index) => (
          <RecentTransactions
            key={index}
            price={item.price}
            date={item.date}
            name={item.vanName}
          />
        ))}
      </div>
    </div>
  );
}
