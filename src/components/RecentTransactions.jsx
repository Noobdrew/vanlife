export default function RecentTransactions({ price, date }) {
  return (
    <div className="transaction-container">
      <h2 className="trans-price">${price}</h2>
      <small>{date}</small>
    </div>
  );
}
