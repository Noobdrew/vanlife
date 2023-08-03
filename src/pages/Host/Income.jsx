import { useContext, useState } from "react";
import { VanApiContext } from "../../App";
import BarChart from "../../components/BarChart";
import RecentTransactions from "../../components/RecentTransactions";

export default function Income() {
  const { userData } = useContext(VanApiContext);
  const [chartData, setChartData] = useState({
    labels: userData.income.map((data) => data.month),
    datasets: [
      {
        label: "Income this year",
        data: userData.income.map((data) => data.income),
        backgroundColor: ["#FF8C38"],
      },
    ],
  });

  const transElements = userData.transactions.map((item) => {
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
