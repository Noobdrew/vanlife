import { useOutletContext } from "react-router-dom";

export default function HostVanPricing() {
  const { vanDetail } = useOutletContext();
  return (
    <div className="host-van-details-content">
      <h2>${vanDetail.price}.00/day</h2>
    </div>
  );
}
