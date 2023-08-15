import { useContext, useEffect, useState } from "react";
import { VanApiContext } from "../../App";
import BarChart from "../../components/BarChart";
import RecentTransactions from "../../components/RecentTransactions";

export default function Income() {
  const { userData, currentUser } = useContext(VanApiContext);
  const [chartData, setChartData] = useState({
    labels: userData?.income?.map((data) => data.month),
    datasets: [
      {
        label: "Income this year",
        data: userData?.income?.map((data) => data.income),
        backgroundColor: ["#FF8C38"],
      },
    ],
  });

  useEffect(() => {
    const last12IncomeData = userData?.income?.slice(-12);

    setChartData({
      labels: last12IncomeData?.map(
        (data) => `${data?.month} ${data?.year.toString().slice(2)}`
      ),
      datasets: [
        {
          label: "Income per month",
          data: last12IncomeData?.map((data) => data?.income),
          backgroundColor: ["#FF8C38"],
        },
      ],
    });
  }, [currentUser]);

  const transElements = userData?.transactions.map((item) => {
    return (
      <RecentTransactions key={item.date} price={item.price} date={item.date} />
    );
  });

  return (
    <div className="income-container">
      <h1 className="host-title">Income</h1>
      <div className="income-inner">
        <div className="chart-container">
          {" "}
          <BarChart chartData={chartData} />
        </div>

        <div className="transaction-outer">
          {" "}
          <h2>Your transactions</h2> {transElements}
        </div>
      </div>
    </div>
  );
}
