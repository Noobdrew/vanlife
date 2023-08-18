export default function RecentTransactions({ price, date, name }) {
  return (
    <div className="transaction-container">
      <h2 className="trans-price">${price}</h2>
      <p>{name}</p>
      <small>{date}</small>
    </div>
  );
}
