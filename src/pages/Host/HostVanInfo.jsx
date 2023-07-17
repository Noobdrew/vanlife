import { useOutletContext } from "react-router-dom";

export default function HostVanInfo() {
  const [vanDetail, setVanDetail] = useOutletContext();
  console.log(vanDetail);
  return (
    <div className="host-van-details-content">
      <p>
        <strong>Name: </strong>
        {vanDetail.name}
      </p>
      <p>
        <strong>Type: </strong>
        {vanDetail.type[0].toUpperCase() + vanDetail.type.slice(1)}
      </p>
      <p>
        <strong>Description: </strong>
        {vanDetail.description}
      </p>
      <p>
        <strong>Visibility: </strong> Public
      </p>
    </div>
  );
}
