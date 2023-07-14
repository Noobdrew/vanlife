export default function HostVanElement({ img, name, price, type }) {
  return (
    <>
      <img src={img} alt="van" />
      <div className="host-van-text">
        <h3 className="host-van-name">{name}</h3>
        <p className="host-van-price">${price}/day</p>
        <div className={`van-type ${type} host`}>
          {type[0].toUpperCase() + type.slice(1)}
        </div>
      </div>
    </>
  );
}
