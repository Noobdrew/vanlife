export default function VanElement({ img, name, price, type }) {
  return (
    <div className="van-element">
      <img src={img} alt="van" className="van-image" />
      <div className="first-row">
        <h3 className="van-name">{name}</h3>
        <p className="price">
          <strong>{price}$</strong>
          <small>/day</small>
        </p>
      </div>

      <div className={`van-type ${type}`}>
        {type[0].toUpperCase() + type.slice(1)}
      </div>
    </div>
  );
}
